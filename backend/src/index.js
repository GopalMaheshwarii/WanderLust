require('dotenv').config()
let express=require("express");
let cors = require('cors');
const cookieParser = require('cookie-parser')
let main=require("./config/db")
let redisClient=require("./config/reddis");
const authRouter = require('./routes/userAuth');
const listRouter = require('./routes/listingcreating');
const reviewRouter = require('./routes/reviewcreating');
const { insertMany } = require('./models/user');
const Listing = require('./models/listing');
const sampleListings = require('./init/data');


let app=express();
app.use(express.json());
app.use(cookieParser());

var corsOptions = {
  origin: 'http://localhost:5173',
  credentials:true
}
app.use(cors(corsOptions))

app.use("/user",authRouter);
app.use("/listing",listRouter);
app.use("/review",reviewRouter);



const initializeConnection=async()=>{
    try{
       await Promise.all([main(),redisClient.connect()]);
       console.log("database connected us succesfully");

       app.listen(process.env.PORT,()=>{
         console.log(`i am listioning at port ${process.env.PORT}`);
       })
    }
    catch(err){
        console.log("error= "+err);
    }
}
initializeConnection();


