const { signupSchema, signinSchema } = require("../middlewares/validator");
const Users = require("../models/usersModel");
const { doHash, doHashValidation } = require("../utils/hashing");
const jwt = require ("jsonwebtoken");

exports.signup = async (req, resp) => {
    resp.json({message: 'signup succces'});
    const {email, password} = req.body;
    try{
        const {error, value} = signupSchema.validate({email,password})

        if(error){
            return resp.status(401).json({success:false, message: error.details[0].message});
        }

        const existingUser = await Users.findOne({email});

        if(existingUser){
            return resp.status(401).json({success:false, message: 'User Already exists'})
        }
    

        const hashedPassword = await doHash(password, 12)
        const newUser = new Users({
            email,
            password:hashedPassword
        });

        const result = await newUser.save(); // this will save it in mongoDB
        result.password = undefined; // after it is saved, we cannot send it in the json, so it should be undefined to hide it
        resp.status(201).json({
            success:true,
            message: 'your account has been created',
            result
        });

    }catch(error){
        console.log(error);
    }
};

    exports.signin = async (req, res) => {
        const { email, password } = req.body;
        try {
            const { error, value } = signinSchema.validate({ email, password });
            if (error) {
                return res
                    .status(401)
                    .json({ success: false, message: error.details[0].message });
            }
    
            const existingUser = await User.findOne({ email }).select('+password');
            if (!existingUser) {
                return res
                    .status(401)
                    .json({ success: false, message: 'User does not exists!' });
            }
            const result = await doHashValidation(password, existingUser.password);
            if (!result) {
                return res
                    .status(401)
                    .json({ success: false, message: 'Invalid credentials!' });
            }
            const token = jwt.sign(
                {
                    userId: existingUser._id,
                    email: existingUser.email,
                    verified: existingUser.verified,
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '8h',
                }
            );
    
            res
                .cookie('Authorization', 'Bearer ' + token, {
                    expires: new Date(Date.now() + 8 * 3600000),
                    httpOnly: process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production',
                })
                .json({
                    success: true,
                    token,
                    message: 'logged in successfully',
                });
        } catch (error) {
            console.log(error);
        }
    };
            
