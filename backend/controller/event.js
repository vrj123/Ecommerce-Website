const express=require('express');
const Event=require('../model/event');
const router=express.Router();
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const {upload}=require('../multer');
const ErrorHandler=require('../utils/ErrorHandler');
const Shop=require('../model/shop');
const {isSeller}=require('../middleware/auth');
const fs=require('fs');

router.post('/create-event', upload.array('images'), catchAsyncErrors(async(req, res, next)=>{
    try{
        const shopId=req.body.shopId;
        const shop=await Shop.findById(shopId);
        console.log(shop);
        if(!shop){
            return next(new ErrorHandler("Shop Id is invalid", 400));
        }
        else{
            const files=req.files;
            const imagesUrls=files.map((file)=>`${file.filename}`);
            const eventData=req.body;
            eventData.shop=shop;
            eventData.images=imagesUrls;
            const event=await Event.create(eventData); 
            res.status(201).json({
                success:true,
                event
            })
        }
    }
    catch(error){
        return new ErrorHandler(error, 400);
    }
}))

router.get('/get-all-events-shop/:id', catchAsyncErrors(async(req, res, next)=>{
    try{
        const events=await Event.find({shopId:req.params.id});
        res.status(200).json({
            success:true,
            events
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 400));
    }
}))

router.delete('/delete-shop-event/:id', isSeller, catchAsyncErrors(async(req, res, next)=>{
    try{
        const event=await Event.findById(req.params.id);
        if(!event){
            return next(new ErrorHandler("No event found", 400));
        }

      
      event.images.forEach((image)=>{
        const filePath = `uploads/${image}`;
        fs.unlink(filePath, (err) => {
            if (err) {
              res.status(500).json({ message: "Error deleteing file" });
            }
          });
      })
      const eventData=await Event.findByIdAndDelete(req.params.id);
      if(!eventData){
          return next(new ErrorHandler("No event found", 400));
      }
        res.status(201).json({
            success:true,
            message:"Event deleted succesfully",
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 400));
    }
}))


router.get('/get-all-events', catchAsyncErrors(async(req, res, next)=>{
    try{
        const events=await Event.find();
        res.status(200).json({
            success:true,
            events
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 400));
    }
}))

// get all products of shop
module.exports=router;