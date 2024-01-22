const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop=require('../model/shop');


exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
});

exports.isSeller = catchAsyncErrors(async(req,res,next) => {
    const {shop_token} = req.cookies;

    if(!shop_token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(shop_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
});

exports.isAdmin = catchAsyncErrors(async(req, res, next)=>{
    if(req.user.role!=='Admin'){
        return next(new ErrorHandler(`${req.user.role} don't have access to resource`));
    }
    next();
})