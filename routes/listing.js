const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const passport = require("passport");
const {isLoggedIn,isOwner}=require("../middleware.js");

const listingController=require("../controllers/listings.js")




// index route
router.get("/", wrapAsync(listingController.index))


// new listing route

router.get("/new",isLoggedIn,listingController.newForm)

router.post("/",wrapAsync(listingController.addNewListing))

// show route

router.get("/:id",wrapAsync(listingController.showListing))


// edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing))

// update route

router.put("/:id",isLoggedIn,isOwner,wrapAsync(listingController.updateListing))

// DELETE  route

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))

module.exports=router;