const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const announceSchema=new Schema({
    comment:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});
const Announcement=mongoose.model("Announcement",announceSchema);
module.exports=Announcement