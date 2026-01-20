const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title:{
    type:String,
    required:true,
    maxlength:40,
  },
image :{
  url:{
  type:String,
  default:"https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hJTIwdG91cnxlbnwwfHwwfHx8MA%3D%3D",
  },
  filename:{
    type:String,
    default:"defaultImage",
  },
},
  description:{
    type:String,
  },
  price:{
    type:Number,
  },
  location:{
    type:String,
  },
  country:{
    type:String,
  },
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;