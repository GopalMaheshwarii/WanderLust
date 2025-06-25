let express= require("express");
const userMiddleware = require("../middleware/userMiddleware");
const { getYourReviews, createReview, updateReview, deleteReview } = require("../controllers/userReview");
let reviewRouter=express.Router();

//all listing 
//your all listings
//create listing
//update listing
//delte listing

reviewRouter.get("/getYourReviews",userMiddleware,getYourReviews);
reviewRouter.post("/createReview/:cardId",userMiddleware,createReview);
reviewRouter.put("/updateReview/:reviewId",userMiddleware,updateReview);
reviewRouter.delete("/deleteReview/:id",userMiddleware,deleteReview);



module.exports=reviewRouter;