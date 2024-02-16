const mongoose=require('mongoose');
const initData=require("./data.js");
const Listing=require("../models/listings.js");

const Mongo_url="mongodb://127.0.0.1:27017/cipherthon";

main().then(() => {
    console.log("connected to mongodb")
})
.catch(err =>{
     console.log(err)
});

async function main() {
  await mongoose.connect(Mongo_url);
}
const initDB= async() =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("init db done");
}
initDB();