const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");

main().then((result)=>{
    console.log("database connected successful")
}).catch((err)=>{
    console.log(err);
})
 
async function main(params) {
    
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');

} 

const initDB= async ()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'68a956b00cbed1bdcc0aae5e'}))
    await listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();