const cloudinary = require("../config/cloudinary");
const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");

let getAllCards=async(req,res)=>{
  try{
     let  data=await Listing.find({});
     res.json(data);
  }
  catch(err){
     res.status(500).send("error occurs = "+err.message);
  }
}

let getCardById=async(req,res)=>{
    try{
      //get id from param 
      //fetch the card from database 
      let {id}=req.params;
      if(!id)
         throw new Error("id is not present ");
      
    let card = await Listing.findById(id)
      .populate({
        path: "user",
        select: "firstName lastName"
      })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "firstName lastName"
        }
      });
      res.json({
         card,
         msg:"card fetched successfully"
      })

  }
  catch(err){
     res.status(500).send("error occurs = ",err.message);
  }
}



const getYourCards = async (req, res) => {
  try {
    const userId = req.result._id;

    if (!userId) {
      return res.status(400).json({ error: "User ID not found in request." });
    }

    // Fetch listings directly created by this user
    const listings = await Listing.find({ user: userId });

    res.status(200).json(listings);
  } catch (err) {
    res.status(500).send("error occurs = " + err.message);
  }
};

let createCard=async(req,res)=>{
    try{
       //fetch data 
       //create card 
       //send the card 
       let data=req.body;
       if(!data) 
        throw new Error("data is not there ");
       
       data.user=req.result._id;
       let user=await User.findById(req.result._id);
       let card=await Listing.create(data);
       user.listings.push(card._id);
       await user.save();
       res.status(200).json(card);

  }
  catch(err){
     res.status(500).send("error occurs = "+err.message);
  }
}


let updateCard=async(req,res)=>{
    try{
       let data = req.body;
      if (!data) throw new Error("data is not there");

      let { id } = req.params;

      const updatedCard = await Listing.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updatedCard) throw new Error("Card not found");

      res.status(200).json(updatedCard);
      

  }
  catch(err){
     res.status(500).send("error occurs = "+err.message);
  }
}


let deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Start delete");

    const listing = await Listing.findById(id)
      .populate({ path: "reviews", strictPopulate: false })
      .populate({ path: "user", strictPopulate: false });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const reviewIds = listing.reviews.map((review) => review._id);
    const userId = listing.user?._id;

    // ✅ Delete associated Cloudinary image if hosted there
    const imageUrl = listing.image;
    const isCloudinary = imageUrl.includes("res.cloudinary.com");

    if (isCloudinary) {
      // Extract the public ID from the Cloudinary URL
      // Example URL: https://res.cloudinary.com/demo/image/upload/v1687351831/wanderLust/images/sample.jpg
      const parts = imageUrl.split("/");
      const publicIdWithExt = parts.slice(-2).join("/"); // wanderLust/images/sample.jpg
      const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // remove file extension (.jpg, .png)

      console.log("Deleting Cloudinary image:", publicId);
      await cloudinary.uploader.destroy(publicId);
    }
    await Review.deleteMany({ _id: { $in: reviewIds } });


    await User.updateMany(
      { reviews: { $in: reviewIds } },
      { $pull: { reviews: { $in: reviewIds } } }
    );
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $pull: { listings: id },
      });
    }
    await Listing.findByIdAndDelete(id);

    return res.status(200).json({ message: "Listing and associated reviews deleted successfully." });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Error occurred = " + err.message);
  }
};


module.exports={getAllCards,getYourCards,createCard,deleteCard,updateCard,getCardById};
