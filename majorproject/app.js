const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");
const methodOverride =  require("method-override");
const ejsmate  = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
const {listingSchema} = require("./schema.js");
const app = express();
const port = 3000;

const mongo_url = 'mongodb://127.0.0.1:27017/wanderlust';
mongoose.connect(mongo_url)
  .then(() => console.log('Connected!'))
  .catch((err)=> console.log('error not connected',err));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsmate);
app.use(express.static(path.join(__dirname,"public")));


//   app.get("/Listing",async(req,res) =>{
//    let sampleListing = new Listing ({
//     title:"Sunny Goa Villa",
//     description:"Sunny Goa Villa with private pool & sea breeze! Bright,modern space near the beach.AC, kitchen,WiFi.Ideal for chill vibes, sunbathing, and tropical fun.Book your sunny gateway now!",
//     price: 1500,
//     location:"Calangute,Goa",
//     country:"India",
//    });

// await sampleListing.save()
// .then((res) => console.log("Data inserted"))
// .catch((err)=> console.log("data was not inserted"));
// res.send("this is listing routes");
//   });

app.get("/",(req,res)=>{
   res.send("this is root page");
});

// const validateListing = (req,res,next) =>{
//   let {error} = listingSchema.validate(req.body); 
//         if(error) {
//               let ermsg = details.map((el)=>el.message).join(",");
//              throw new expressError(400,ermsg);
//         } else {
//             next();
//         } 
//      }

//create Home route
app.get("/listings",(async(req,res) =>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings});
}));

//post new listing route
app.post("/listings",async (req,res,next)=>{    
try{
if(!req.body.listing.image ||!req.body.listing.image.url ) {
  delete req.body.listing.image;
} 
const newListing = new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");
} catch {
  console.log("this is error");
  res.redirect("/listings/new");
}
});

//create new listing route
app.get("/listings/new",async(req,res)=>{
  res.render("listings/new.ejs")
});

//create specific listing route
app.get("/listings/:id",(async(req,res)=>{
let { id } =req.params;
const listing = await Listing.findById(id);
res.render("listings/show.ejs",{listing});
}));

//create edit route
app.get("/listings/:id/edit", (async(req,res)=>{
   let { id } = req.params;
   const listing = await Listing.findById(id);
res.render("listings/edit.ejs",{listing});
}));

//create update route
app.put("/listings/:id",(async (req,res)=>{
  let { id } =req.params;
 await Listing.findByIdAndUpdate(id,{...req.body.listing});
 res.redirect(`/listings/${id}`);
}));


//create delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
   let { id } =req.params;
   let deleteListing = await Listing.findByIdAndDelete(id);
   console.log(deleteListing);
   res.redirect("/listings");
}));

// create wildcard route
// app.all("*",(req,res)=>{
 // next(new expressError(404,"Page not Found"));
//});

//handle error
// app.use((err,req,res,next)=>{
//   let {statusCode=500,message="Something went wrong"}= err;
//  res.status(statusCode).render("listings/error.ejs",{message});
// });

//create a server
app.listen(port,()=>{
    console.log("server is started at port",port);
});