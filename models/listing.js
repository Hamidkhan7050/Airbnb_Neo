// this page is used for listing of product 

// require mongoose 

const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js")

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
    country:String,

    reviews:[
        {   
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing.reviews.length){
        let res=await Review.deleteMany({_id: {$in:listing.reviews}})
        // let res=await Order.deleteMany({})

        console.log(res)
    }
})



const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

