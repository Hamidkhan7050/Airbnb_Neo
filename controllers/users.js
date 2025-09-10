const User=require("../models/user.js");


module.exports.signupPage=(req,res)=>{
    res.render("users/signup.ejs")
}


module.exports.userSignup=async(req,res)=>{
    try {
        let {username,email,password}=req.body;
    // console.log(username,email,password)
        const newUser=new User({email,username});
        let registerUser=await User.register(newUser,password);
        console.log(registerUser);
        // code for auto login 

        req.login(registerUser,(err)=>{
            if(err){
            return next(err);

        }
            req.flash("success",`Welcome to Airbnb Neo Mr. ${username}`);
            res.redirect("/listings");
        })

        
    } catch (error) {
        req.flash("error",error.message);
        res.redirect("/signup")
    }
    

}

module.exports.loginPage=(req,res)=>{
    res.render("users/login.ejs");
}


module.exports.userLogin=async(req,res)=>{
    let {username}=req.body;
    req.flash("success",`Welcome to Airbnb Neo  Mr. ${username}`);
    let var1=res.locals.redirectUrl || "/listings";
    res.redirect(var1);
}

module.exports.userLogout=async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err);

        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
    
}