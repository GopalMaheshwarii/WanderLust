const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    comment:{
        type:String,
        required:true,
        minLength:3,
        maxLength:800
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default:1,
        requrired:false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    listing:{
         type: Schema.Types.ObjectId,
         ref:"Listing",
    }
});
let Review= mongoose.model("Review", reviewSchema);
module.exports=Review;