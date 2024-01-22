const express = require("express");
const path = require("path");
const Withdraw = require("../model/withdraw");
const Shop = require("../model/shop");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shop_token");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawAmount } = req.body;
      const data = {
        seller: req.seller,
        amount: withdrawAmount,
      };
      const withdraw = await Withdraw.create(data);
      const shop = await Shop.findById(req.seller._id);
      shop.balance = shop.balance - withdrawAmount;
      await shop.save();
      res.status(200).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/get-all-withdraw-requests",
  isAuthenticated,
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.put(
  "/update-withdraw-status/:id",
  isAuthenticated,
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
        const{sellerId}=req.body;
      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        { status: "Successful", updatedAt: Date.now() },
        { new: true }
      );
      const transaction={
          _id:withdraw._id,
          amount:withdraw.amount,
          updatedAt:withdraw.updatedAt,
          status:withdraw.status,
      }

      const seller=await Shop.findById(sellerId);
      seller.transactions=[...seller.transactions, transaction];
      await seller.save();

      res.status(200).json({
        sucess: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
