// this page is used for listing of product 

// require mongoose 

const mongoose=require("mongoose");

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        required:true,
        default:"https://unsplash.com/photos/tall-building-in-the-center-of-the-city-fQM60anQ594",
        set:(v)=> v===""? "https://unsplash.com/photos/tall-building-in-the-center-of-the-city-fQM60anQ594" : v,
    },
    price:Number,
    location:String,
    country:String
})

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;

