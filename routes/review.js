const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review=require("../models/review.js")

const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {isLoggedIn,isReviewAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js")





// review route

router.post("/",isLoggedIn,wrapAsync(reviewController.createReview))

// delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))

module.exports=router;