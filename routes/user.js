const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js");
const passport = require("passport");

const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/users.js")

// signup form
router.get("/signup",userController.signupPage)


// signup route
router.post("/signup",wrapAsync(userController.userSignup)
)

// login page
router.get("/login",userController.loginPage)

// login route
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.userLogin)

// logout route
router.get("/logout",userController.userLogout)

module.exports=router;