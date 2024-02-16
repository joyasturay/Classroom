const express = require("express");
const router = express.Router({mergeParams:true});
const {announceSchema}=require("../schema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Expresserror=require("../utils/ExpressError.js");
const Announcement=require("../models/announcement.js");
const Listing=require("../models/listings.js");
const validateAnnounce=(req,res,next)=>{
    let {error}=announceSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(',');
        throw new Expresserror(400,errMsg);
    }else{
        next();
    }
};
//announcements
//post route
router.post("/",validateAnnounce,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    const newAnnouncement=new Announcement(req.body.announcement);
    listing.announcements.push(newAnnouncement);
    await newAnnouncement.save();
    await listing.save();
    res.redirect(`/listings/${id}`);
}));
//delete route
router.delete("/:aid",wrapAsync(async(req,res)=>{
    let {id,aid}=req.params;
    const listing=await Listing.findById(id);
    const announcement=await Announcement.findByIdAndDelete(aid);
    listing.announcements.pull(announcement);
    await listing.save();
    res.redirect(`/listings/${id}`);
}));
  module.exports=router;