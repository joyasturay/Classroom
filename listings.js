const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Announcement=require("./announcement.js");

const listingSchema=new Schema({
    batchname:{
        type:String,
        required:true
    },
    teachername:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=>v===""?"https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        :v,
    },
    announcements:[{
        type:Schema.Types.ObjectId,
        ref:"Announcement",
    }],
    
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;