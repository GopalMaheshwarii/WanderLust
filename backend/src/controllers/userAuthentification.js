const bcrypt = require('bcrypt');
let User=require("../models/user")
var jwt = require('jsonwebtoken');
let redisClient=require("../config/reddis");
let validate=require("../utils/validator")


const userRegister = async (req, res) => {
    try {
        // Signup logic here
        //fetch details 
        //validate to hogaya hoga 
        //password bycrypt karunga 
        //then i save it here 
        //generate jwt tokem and store it in cookie 
        //send 
        //validate the details
        console.log("start")
         validate(req.body);
         let data=req.body;
         //bycrpt the password
         data.password= await bcrypt.hash(data.password,10);
         //add  user in user collection 
         let user=await User.create(data);

         let payload={
            _id:user._id,
            emailId:user.emailId
        }
        let token = await jwt.sign(payload,process.env.JWT_KEY,{expiresIn:60*60*24});
        //send the token through cookies of the user 
        res.cookie("token",token,{maxAge:60*60*1000*24});
        
        let reply={
             firstName:user.firstName,
             emailId:user.emailId,
             _id:user._id
         }

         res.status(200).json({
            user:reply,
            msg:"user Registered successfully"
         });

    } catch (err) {
        res.status(500).send("error occurs = " , err.message);
    }
};

const userLogin = async (req, res) => {
    try {
        // Login logic here
        let {emailId,password}=req.body;
        //find the user in the user collection through his emailid
        if(!emailId || !password)
            throw new Error("some field is missing");
        
        const user=await User.findOne({emailId});
        //if user not found then it through error which catched
        //but check its password too before giving him a token
        let match=await bcrypt.compare(password,user.password);
        if(!match)
            throw new Error("your password is wrong for this emailId")

        //make token for it so that  it do need to login again and again
        let payload={
            _id:user._id,
            emailId:user.emailId,
        }
        let token = await jwt.sign(payload,process.env.JWT_KEY,{expiresIn:60*60*24});

        //send the token through cookies of the user 
         res.cookie("token",token,{maxAge:60*60*24*1000});//60 minute 1000 due to it in ms
         
         let reply={
             firstName:user.firstName,
             emailId:user.emailId,
             _id:user._id
         }

         res.status(200).json({
            user:reply,
            msg:"log in successfully"
         });

    } catch (err) {
        res.status(500).send("error occurs = " , err.message);
    }
};

const userLogout = async (req, res) => {
    try {
        // Logout logic here
        let {token}=req.cookies;
        //decode the token here for getting its id throgh payload 
        let data=req.result;
        let payload=jwt.decode(token);
        //send this token to to redisclient for blocked it 
        await redisClient.set(`token:${token}`,"Blocked");
        await redisClient.expireAt(`token:${token}`,payload.exp)
        // then clear the cookie of user too 
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("logged out successfully");
    } catch (err) {
        res.status(500).send("error occurs = " , err.message);
    }
};
let checkcookie=async(req,res)=>{
    let user=req.result;
     let reply={
             firstName:user.firstName,
             emailId:user.emailId,
             _id:user._id,
             role:user.role
         }

     res.status(200).json({
            user:reply,
            msg:"log in successfully"
    });
    //if token is not present then it handle automatically 
    
}

module.exports = { userRegister, userLogin, userLogout,checkcookie };
