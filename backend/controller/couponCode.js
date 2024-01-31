const express=require('express');
const router=express.Router();
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ErrorHandler=require('../utils/ErrorHandler');
const CouponCode=require('../model/couponCode');
const {isSeller}=require('../middleware/auth');


router.post('/create-coupon-code', isSeller, catchAsyncErrors(async(req, res, next)=>{
    try{
        const isCouponCodeExists=await CouponCode.find({name:req.body.name});
        if(isCouponCodeExists.length!==0){
            return next(new ErrorHandler("Coupon already exists", 400));
        }
        const couponCode=await CouponCode.create(req.body);
        res.status(201).json({
            success:true,
            couponCode
        })

    }
    catch(error){
        return next(new ErrorHandler(error, 400));
    }
}))

router.get('/get-coupons/:id', isSeller, catchAsyncErrors(async(req, res, next)=>{
    try{
        const coupons=await CouponCode.find({shopId:req.params.id});

        res.status(200).json({
            success:true,
            coupons
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 400));
    }
}))


router.get('/get-coupon-value/:name', catchAsyncErrors(async(req, res, next)=>{
    try{
        const coupon=await CouponCode.find({name:req.params.name});
        if(coupon.length===0){
            return next(new ErrorHandler('Coupon code not valid', 400));
        }
        res.status(200).json({
            success:true,
            coupon:coupon[0],
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 500));
    }
}))

router.delete('/delete-coupon/:id', isSeller, catchAsyncErrors(async(req, res, next)=>{
    try{
        const coupon=await CouponCode.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            coupon
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 500));
    }
}))

module.exports=router;