const { signupSchema } = require("../middlewares/validator");
const Users = require("../models/usersModel");
const { doHash } = require("../utils/hashing");

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

}