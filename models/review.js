const mongoose=require("mongoose");
const Schema=mongoose.Schema;


// schema for review 

const reviewSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

// model of Schema

const Review=new mongoose.model("Review",reviewSchema);

module.exports=Review;