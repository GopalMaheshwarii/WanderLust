let mongoose=require("mongoose")
let {Schema}=require("mongoose");

let userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        imutable:true,
    },
    age:{
        type:Number,
        min:6,
        max:80,
    },
    password:{
        type:String,
        required:true,
    },
    listings:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'Listing',
        }],
    },
    reviews:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
        ]
    }

},{timestamps:true});

const User=mongoose.model("User",userSchema);

module.exports=User;
