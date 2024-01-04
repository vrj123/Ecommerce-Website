const mongoose=require('mongoose');

const couponCodeSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter coupon code here"],
    },
    value:{
        type:Number,
        required:true,
    },
    shop:{
        type:Object,
        required:true,
    },
    shopId:{
        type:String,
        required:true
    },
    minAmount:{
        type:Number,
    },
    maxAmount:{
        type:Number
    },
    selectedProduct:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    product:{
        type:Object,
    }
})

module.exports=mongoose.model("CouponCode", couponCodeSchema);