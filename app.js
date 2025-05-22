// setup for express

const express=require("express");
const app=express();
let port=8080;
const listing=require("./models/listing.js");
const methodOverride= require("method-override");
const ejsMate=require("ejs-mate");

const path=require("path");
app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


// setup for mongoose

const mongoose=require("mongoose");
const { clearCache } = require("ejs");
// const listing = require("./models/listing.js");


main().then((result)=>{
    console.log("database connected successful")
}).catch((err)=>{
    console.log(err);
})

async function main(params) {
    
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');

}


// create first route to check setup
app.get("/",(req,res)=>{
    res.send("Hii it is basic or root page");
})
// app.get("/testListing",async(req,res)=>{
//     // using schema
//     let samplelisting=new listing({
//         title:"Hamid villa",
//         description:"for rent",
//         price:234,
//         location:"siwan west",
//         country:"india"
//     })
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("successful testing");


// })
app.get("/listings", async (req,res)=>{
   const allListings= await listing.find({});
   res.render("index.ejs",{allListings})
})

// show route

app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    // console.log("hello");
    // res.send(id);
    const data1= await listing.findById(id);
    res.render("show.ejs", {data1});
    // console.log(data1);
})

// new listing route
app.get("/listing/new",(req,res)=>{
    res.render("newListing.ejs");
})

app.post("/listing",async(req,res)=>{
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
    const newlist=new listing(list);
    await newlist.save();
    console.log(listing);
    res.redirect("/listings");
})

// edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id);
    res.render("edit.ejs",{list});
    // res.render("edit.ejs");
})

// update route
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const val=await listing.findByIdAndUpdate(id,{...req.body.Listing});
    console.log(val);
    
    res.redirect(`/listings/${id}`);

})

// DELETE  route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const del=await listing.findByIdAndDelete(id);
    console.log( del);
    console.log("data deleted");
    res.redirect("/listings")
})
app.listen(port,(req,res)=>{
    console.log("server is working with port 8080");
})