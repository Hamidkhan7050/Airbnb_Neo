const Listing=require("../models/listing.js")

module.exports.index=async (req,res)=>{
   const allListings= await Listing.find({});
   res.render("listings/index.ejs",{allListings})
}


module.exports.newForm=(req,res)=>{
    
    res.render("listings/newListing.ejs");
}

module.exports.addNewListing=async(req,res)=>{
    
    let list= req.body.Listing;
    const newlist=new Listing(list);
    newlist.owner=req.user._id;
    await newlist.save();
    req.flash("success","New Listing Created!");
    console.log(Listing);
    res.redirect("/listings");
}

module.exports.showListing=async (req,res)=>{
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
}

module.exports.editListing=async (req,res)=>{
    let {id}=req.params;
    const list=await Listing.findById(id);
    console.log(list);
    if(!list){
        req.flash("error","Listing does not exist.")
        res.redirect("/listings");
    }

    res.render("listings/edit.ejs",{list});
    
}


module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    const val=await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    req.flash("success","New Update Created!");

    console.log(val);
    
    res.redirect(`/listings/${id}`);

}

module.exports.deleteListing=async (req,res)=>{
    let {id}=req.params;
    const del=await Listing.findByIdAndDelete(id);
    console.log( del);
    req.flash("success","Listing Deleted");

    console.log("data deleted");
    res.redirect("/listings")
}