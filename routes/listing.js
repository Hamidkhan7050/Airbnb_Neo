const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const passport = require("passport");
const {isLoggedIn,isOwner}=require("../middleware.js");





router.get("/", wrapAsync(async (req,res)=>{
   const allListings= await Listing.find({});
   res.render("listings/index.ejs",{allListings})
}))


// new listing route

router.get("/new",isLoggedIn,(req,res)=>{
    
    res.render("listings/newListing.ejs");
})

router.post("/",wrapAsync(async(req,res)=>{
    // let {title,description,image,price,country,location}=req.body;
    // console.log(title);
    // console.log(description);
    // console.log(image);
    // console.log(price);
    // console.log(country);
    // console.log(location);
    // const newData= await listing.insertOne(title,description,image,country,location,price);

    // console.log(newData);
    // console.log("data insert successfuly.......");
    let list= req.body.Listing;
    const newlist=new Listing(list);
    newlist.owner=req.user._id;
    await newlist.save();
    req.flash("success","New Listing Created!");
    console.log(Listing);
    res.redirect("/listings");
}))

// show route

router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    // console.log("hello");
    // res.send(id);
    const data1= await Listing.findById(id).populate({path:"reviews",
        populate:{
            path:"author"
        }}
    )
    .populate("owner");
    if(!data1){
        req.flash("error","Listing does not exist.")
        res.redirect("/listings");
    }
    
    res.render("listings/show.ejs", {data1});
    // console.log(data1);
}))


// edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const list=await Listing.findById(id);
    console.log(list);
    if(!list){
        req.flash("error","Listing does not exist.")
        res.redirect("/listings");
    }

    res.render("listings/edit.ejs",{list});
    
}))

// update route

router.put("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const val=await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    req.flash("success","New Update Created!");

    console.log(val);
    
    res.redirect(`/listings/${id}`);

}))

// DELETE  route

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const del=await Listing.findByIdAndDelete(id);
    console.log( del);
    req.flash("success","Listing Deleted");

    console.log("data deleted");
    res.redirect("/listings")
}))

module.exports=router;