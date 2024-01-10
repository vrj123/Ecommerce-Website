const express = require("express");
const Order = require("../model/order");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const Product=require('../model/product');

router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      const shopItemMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemMap.has(shopId)) {
          shopItemMap.set(shopId, []);
        }
        shopItemMap.get(shopId).push(item);
      }

      const orders = [];
      for (const [shopId, items] of shopItemMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, error) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);


router.get('/get-shop-all-orders/:shopId', catchAsyncErrors(async(req, res, next)=>{
  try {
    const orders = await Order.find({ "cart.shopId": req.params.shopId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
}))

router.put('/update-order-status/:id', isSeller, catchAsyncErrors(async(req, res, next)=>{
  try{
    const order=await Order.findById(req.params.id);
    if(!order){
      return next(new ErrorHandler("Order, not found", 400));
    }

    const updateProduct=async(id, qty)=>{
      const product=await Product.findById(id);
      product.stock-=qty;
      product.sold_out+=qty;
      await product.save({validateBeforeSave:true});
    }

    if(req.body.status==="Transferred to delivery partner"){
      order.cart.forEach(async(o)=>{
        await updateProduct(o._id, o.qty);
      })
    }

    order.status=req.body.status;

    if(req.body.status==='Delivered'){
      order.deliveredAt=Date.now();
      order.paymentInfo.status='Suceeded';
    }

    await order.save({validateBeforeSave:true});

    res.status(200).json({
      success:true,
      order,
    })

    
  }
  catch (error) {
    return next(new ErrorHandler(error, 500));
  }
}))
router.put('/return-order/:id', catchAsyncErrors(async(req, res, next)=>{
  try{
    const order=await Order.findById(req.params.id);
    if(!order){
      return next(new ErrorHandler("Order, not found", 400));
    }

    // const updateProduct=async(id, qty)=>{
    //   const product=await Product.findById(id);
    //   product.stock-=qty;
    //   product.sold_out+=qty;
    //   await product.save({validateBeforeSave:true});
    // }

    // if(req.body.status==="Transferred to delivery partner"){
    //   order.cart.forEach(async(o)=>{
    //     await updateProduct(o._id, o.qty);
    //   })
    // }

    order.status=req.body.status;


    await order.save({validateBeforeSave:true});

    res.status(200).json({
      success:true,
      order,
    })

    
  }
  catch (error) {
    return next(new ErrorHandler(error, 500));
  }
}))


router.put('/order-refund-success/:id', isSeller, catchAsyncErrors(async(req, res, next)=>{
  try{
    const order=await Order.findById(req.params.id);
    if(!order){
      return next(new ErrorHandler("Order, not found", 400));
    }


    order.status=req.body.status;


    await order.save({validateBeforeSave:true});

    res.status(200).json({
      success:true,
      order,
    })


    const updateProduct=async(id, qty)=>{
      const product=await Product.findById(id);
      product.stock+=qty;
      product.sold_out-=qty;
      await product.save({validateBeforeSave:true});
    }

    if(req.body.status==="Refund success"){
      order.cart.forEach(async(o)=>{
        await updateProduct(o._id, o.qty);
      })
    }
    
  }
  catch (error) {
    return next(new ErrorHandler(error, 500));
  }
}))


module.exports = router;
