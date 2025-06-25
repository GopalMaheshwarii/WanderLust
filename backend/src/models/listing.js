const mongoose=require("mongoose");
const {Schema}=mongoose;
const listingSchema = new mongoose.Schema(
  {
    title: {
         type: String,
          required: true
         },
    description: { 
        type: String,
         required: true
         },
    image: {
      type: String,
      required: true,
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157"
          : v,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157"
    },
    price: {
         type: Number,
          required: true 
        },
    location: { 
        type: String, 
        required: true
     },
    country: { 
        type: String,
         required: true
     },
     
    interest:{
        type:String,
        default:"unknown",
        enum:["cities","mountains","pools","camping","farm place"]
    },
    user:{
          type:Schema.Types.ObjectId,
          ref:"User",
          default: "6859b0ae9246f91738efe22f", 
    },
    reviews:{
            type:[{
                type:Schema.Types.ObjectId,
                ref:"Review",
            }
            ]
    }

  },
  { timestamps: true }
);

const Listing=mongoose.model("Listing",listingSchema);

module.exports = Listing;