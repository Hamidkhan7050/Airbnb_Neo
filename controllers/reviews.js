const Review=require("../models/review.js")
const Listing=require("../models/listing.js")


module.exports.createReview=async(req,res)=>{
    let list= await Listing.findById(req.params.id);
    let {id}=req.params;

    let newReview=new Review(req.body.review);
    // let {id}=req.body;
    newReview.author=req.user._id;
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash("success","New Review Created!");

    console.log( "new review saved");
    // res.send("new review saved");
    
    res.redirect(`/listings/${id}`);
    
    
}


module.exports.deleteReview=async(req,res)=>{
    let {id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");

    res.redirect(`/listings/${id}`);

}