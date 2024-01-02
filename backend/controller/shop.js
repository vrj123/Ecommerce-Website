const express = require("express");
const path = require("path");
const Shop = require("../model/shop");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendShopToken=require('../utils/shop_token');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {isSeller} = require('../middleware/auth');

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;

    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleteing file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      zipCode:req.body.zipCode,
      phoneNumber:req.body.phoneNumber,
      address:req.body.address
    };
    

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:3000/shop/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate shop
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      
      
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, phoneNumber, zipCode, address } = newSeller;

      let seller = await Shop.findOne({ email });
    

      if (seller) {
        return next(new ErrorHandler("Shop already exists", 400));
      }
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        address,
        zipCode,
        phoneNumber
      });
      


      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login
router.post(
  "/login-seller",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all the fields", 400));
      }
      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("Shop doen't exists", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Plese provide valid information", 400));
      }
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);


// loadSeller

router.get('/getSeller', isSeller, catchAsyncErrors(async(req, res, next)=>{
  try{
    const seller=await Shop.findById(req.seller.id);

    if(!seller){
      return next(new ErrorHandler("Shop doesn't exists", 400));
    }
    console.log(seller);
    res.status(200).json({
      success:true,
      seller
    })
  }
  catch(err){
    return next(new ErrorHandler(err.message, 500));
  }
})
)

router.get('/logout', isSeller, catchAsyncErrors(async(req, res, next)=>{
  try{
    res.cookie("shop_token", null, {
      expires:new Date(Date.now()),
      httpOnly:true
    })

    res.status(200).json({
      success:true,
      message:"Logged out successfully"
    })
  }
  catch(error){
    return next(new ErrorHandler(err.message, 400));
  }
}))

router.get('/get-shop-info/:id', catchAsyncErrors(async(req, res, next)=>{
  try{
    const shop=await Shop.findById(req.params.id);
    if(!shop){
      return next(new ErrorHandler('No shop found', 400));
    }
    res.status(200).json({
      success:true,
      shop
    })
  }
  catch(error){
    return next(new ErrorHandler(error, 400));
  }
}))




module.exports = router;
