const express=require('express');
const Product=require('../model/product');
const router=express.Router();
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const {upload}=require('../multer');
const ErrorHandler=require('../utils/ErrorHandler');
const Shop=require('../model/shop');
const {isSeller}=require('../middleware/auth');

router.post('/create-product', upload.array('images'), catchAsyncErrors(async(req, res, next)=>{
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
            const productData=req.body;
            productData.shop=shop;
            productData.images=imagesUrls;
            const product=await Product.create(productData); 
            res.status(201).json({
                success:true,
                product
            })
        }
    }
    catch(error){
        return new ErrorHandler(error, 400);
    }
}))


// get all products of shop
router.get('/get-all-products-shop/:id', catchAsyncErrors(async(req, res, next)=>{
    try{
        const products=await Product.find({shopId:req.params.id});
        res.status(200).json({
            success:true,
            products
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 400));
    }
}))


router.delete('/delete-shop-product/:id', isSeller, catchAsyncErrors(async(req, res, next)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return next(new ErrorHandler("No product found", 400));
        }
        res.status(201).json({
            success:true,
            message:"Product deleted succesfully",
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 400));
    }
}))


router.get('/get-all-products', catchAsyncErrors(async(req, res, next)=>{
    try{
        const products=await Product.find();
        res.status(200).json({
            success:true,
            products,
        })
    }
    catch(error){
        return next(new ErrorHandler(error, 400));
    }
}))


module.exports=router;