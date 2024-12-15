
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require ('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require ('./routers/authRouter')
const app =express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//moongose code is a promese so, needs the command "then"
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database connected");
}).catch(error => {
    console.log(error);
});

app.use('/api/auth',authRouter); //api/auth is what we are going to add in postman and then we can add what is in router /signup
app.get('/',(req,res) => {
    res.json({message:"Hello from the server"})
});
app.listen(process.env.PORT,()=>{
    console.log("listening....");
});