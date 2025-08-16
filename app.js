// setup for express

const express=require("express");
const app=express();
let port=8080;
const listing=require("./models/listing.js");
const Review=require("./models/review.js")
const methodOverride= require("method-override");
const ejsMate=require("ejs-mate");

const wrapAsync=require("./utils/wrapAsync.js")

const ExpressError=require("./utils/ExpressError.js")

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
// app.get("/",(req,res)=>{
//     res.send("Hii it is basic or root page");
// })
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


app.get("/listings", wrapAsync(async (req,res)=>{
   const allListings= await listing.find({});
   res.render("index.ejs",{allListings})
}))

// show route

app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    // console.log("hello");
    // res.send(id);
    const data1= await listing.findById(id).populate("reviews");
    res.render("show.ejs", {data1});
    // console.log(data1);
}))

// new listing route

app.get("/listing/new",(req,res)=>{
    res.render("newListing.ejs");
})

app.post("/listing",wrapAsync(async(req,res)=>{
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
}))

// edit route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id);
    console.log(list);
    // res.render("edit.ejs",{list});
    // res.render("edit.ejs");
}))

// update route

app.put("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const val=await listing.findByIdAndUpdate(id,{...req.body.Listing});
    console.log(val);
    
    res.redirect(`/listings/${id}`);

}))

// DELETE  route

app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const del=await listing.findByIdAndDelete(id);
    console.log( del);
    console.log("data deleted");
    res.redirect("/listings")
}))


// review route

app.post("/listings/:id/reviews",wrapAsync(async(req,res)=>{
    let list= await listing.findById(req.params.id);
    let {id}=req.params;

    let newReview=new Review(req.body.review);
    // let {id}=req.body;
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    console.log( "new review saved");
    // res.send("new review saved");
    
    res.redirect(`/listings/${id}`);
    
    
}))

// delete review route
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    let {id, reviewId}=req.params;
    await listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);

}))
// page not found error

app.all("/*splat",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"))
})

// Error handling middleware
app.use((err,req,res,next)=>{
    // res.send("Something went wrong!")
    let {status=500,message="something went wrong!"}=err;
    // res.status(status).send(message);
    res.render("error.ejs",{message})
})

app.listen(port,(req,res)=>{
    console.log("server is working with port 8080");
})