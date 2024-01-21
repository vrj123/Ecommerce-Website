const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const path=require('path');

router.post('/create-new-message', upload.single('file'), catchAsyncErrors(async(req, res, next)=>{
    // let images=[];
    try{
        // if(req.files){
        //     const files=req.files;
        //     const imageUrls=files.map((file)=>`${file.filename}`);
        //     images=imageUrls;
        // }
        let imgUrl="";

        if(req.file){
            const file=req.file.filename;
            imgUrl=path.join(file);
        }
        const message=await Messages.create({
            conversationId:req.body.conversationId,
            sender:req.body.sender,
            images:imgUrl?imgUrl:"",
            text:req.body.text,
        })


        res.status(201).json({
            success:true,
            message
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 500));
    }
}))


router.get('/get-all-messages/:id', catchAsyncErrors(async(req, res, next)=>{
    try{
        const messages=await Messages.find({conversationId:req.params.id});
        res.status(200).json({
            success:true,
            messages,
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 500));
    }
}))





module.exports=router;