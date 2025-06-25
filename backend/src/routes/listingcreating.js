let express= require("express");
const { getAllCards, getYourCards, createCard, updateCard, deleteCard, getCardById } = require("../controllers/userListing");
const userMiddleware = require("../middleware/userMiddleware");
let listRouter=express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary  = require("../config/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });

//all listing 
//your all listings
//create listing
//update listing
//delte listing

listRouter.get("/getAllCards",getAllCards);
listRouter.get("/getCard/:id",getCardById);
listRouter.get("/getYourCards",userMiddleware,getYourCards);
listRouter.post("/createCard",userMiddleware,createCard);
listRouter.put("/updateCard/:id",userMiddleware,updateCard);
listRouter.delete("/deleteCard/:id",userMiddleware,deleteCard);

listRouter.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ error: "No file received" });
    }
    console.log("backend video")
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "wanderLust/images",
        public_id: req.body.filename || undefined,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ url: result.secure_url });
      }
    );

    // Stream the file to Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    console.error("Server Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});




module.exports=listRouter;