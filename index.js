const express=require('express')
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const listingRouter=require("./routes/listings.js");
const announcementsRouter=require("./routes/announcement.js");
const session=require("express-session");
const flash=require("connect-flash");
const ejsMate=require("ejs-mate");
var methodOverride = require('method-override');
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

const expressSession={
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now()+1000*60*60*24*7,
      maxAge:1000*60*60*24*7,
      httpOnly:true,
    }
  };

  app.use(session(expressSession));
  app.use(flash());
  app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
});
app.use("/listings",listingRouter);
app.use("/listings/:id/announcements",announcementsRouter);

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
//root route
app.get('/',(req,res)=>{
  res.render("./listings/home.ejs");
});
//error route
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});
app.use((err,req,res,next)=>{
    let {statusCode=404,message="Page not found"}=err;
    res.status(statusCode).render("./listings/error.ejs",{err});
});

  
app.listen(8080,()=>{
    console.log("listening on port 8080");
});

