const express = require('express');
var jwt = require('jsonwebtoken');

const {User, Balance} = require('../db');
const {signupSchema,loginSchema} = require('../Schemas');
const authMiddle = require('../authMiddle');

const userRouter = express.Router();

userRouter.post('/signup',async (req,res)=>{
    const body = req.body;

    const result = signupSchema.safeParse(body);

    if(!result.success){
        return res.status(411).json({error:"Incorrect Inputs"});
    }

    const cuser = await User.findOne({username:body.username});

    if(cuser){
        return res.status(411).json({error:"UserName Already exists"});
    }

    const nuser = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    await nuser.save();

    const nbalance = new Balance({
        userId: nuser._id,
        balance: 1000
    });
    await nbalance.save();


    var token = jwt.sign({ userId: nuser._id }, process.env.JWT_SECRET);
    res.json({"message":"User Created Successfully","token":token});
});

userRouter.post('/login',async (req,res)=>{
    const body = req.body;
    
    const result = loginSchema.safeParse(body);
    if(!result.success){
        return res.status(411).json({error:"Incorrect Inputs"});
    }

    const cuser = await User.findOne({username:body.username,password:body.password});

    if(!cuser){
        return res.status(411).json({error:"Incorrect UserName or Password"});
    }

    var token = jwt.sign({ userId: cuser._id }, process.env.JWT_SECRET);
    res.json({"message":"Logged in Successfully","token":token});
});

userRouter.get('/find',authMiddle,async (req,res)=>{
    let name = req.query.name;
    name = name.toLowerCase();

    let users = await User.find({
        $or:[
            {firstName:{$regex:name, $options: 'i'}},
            {lastName:{$regex:name, $options: 'i'}}
        ]
    }).limit(10);

    users = users.map(user=>{
        return {
            firstName:user.firstName,
            lastName:user.lastName,
            username:user.username,
            userId:user._id.toString()
        }
    });

    users = users.filter(user=>{
        return user.userId !== req.userId;
    });

    res.json({users});

});


module.exports = userRouter;