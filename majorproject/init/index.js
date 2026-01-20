const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = 'mongodb://127.0.0.1:27017/wanderlust';
mongoose.connect(mongo_url)
  .then(() => console.log('Connected!'))
  .catch((err)=> console.log('error not connected',err));

  const initDB = async ()=>{
   try {
     await Listing.deleteMany({});
     await Listing.insertMany(initData.data);
    console.log("Data was initialized sucessfully");
   } catch(err) {
      console.log("Data was not initialized",err);
   }
  };

  initDB();