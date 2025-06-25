const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");

let getYourReviews=async(req,res)=>{
    try{

  }
  catch(err){
     res.status(500).send("error occurs = ",err.message);
  }
}



const createReview = async (req, res) => {
  try {
    let { cardId } = req.params;
    let userId = req.result._id;
    let data = req.body;

    if (!cardId || !userId || !data) {
      throw new Error("Missing required fields.");
    }

    data.user = userId;
    data.listing = cardId;

    const user = await User.findById(userId);
    const card = await Listing.findById(cardId);

    if (!user || !card) {
      throw new Error("User or Card not found.");
    }

    // Create the review
    const newReview = await Review.create(data);
    // Push into user and card
    user.reviews.push(newReview._id);
    card.reviews.push(newReview._id);

    await user.save();
    await card.save();

    res.status(201).json(newReview);
  } catch (err) {
    console.error("Review creation failed:", err.message);
    res.status(500).send("Error occurs: " + err.message);
  }
};



let updateReview=async(req,res)=>{
    try{

  }
  catch(err){
     res.status(500).send("error occurs = ",err.message);
  }
}


let  deleteReview=async(req,res)=>{
    try{
        const { id } = req.params; // review ID

    // 1. Find the review
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const userId = review.user;
    const listingId = review.listing;

    // 2. Delete the review
    await Review.findByIdAndDelete(id);

    // 3. Remove the review from the user's reviews array
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $pull: { reviews: id }
      });
    }

    // 4. Remove the review from the listing's reviews array
    if (listingId) {
      await Listing.findByIdAndUpdate(listingId, {
        $pull: { reviews: id }
      });
    }

    res.status(200).json({ message: "Review deleted successfully." });
  }
  catch(err){
     res.status(500).send("error occurs = ",err.message);
  }
}

module.exports={getYourReviews,createReview,deleteReview,updateReview};
