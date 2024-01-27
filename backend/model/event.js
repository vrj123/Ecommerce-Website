const mongoose=require('mongoose');


const eventSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide your product name']
    },
    description:{
        type:String,
        required:[true, 'Please provide your product description']
    },
    category:{
        type:String,
        required:[true, 'Please provide your product category']
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:"Running",
    },
    tags:{
        type:String,
    },
    originalPrice:{
        type:Number,
    },
    discountPrice:{
        type:Number,
        required:[true, 'Please provide your product price']
    },
    stock:{
        type:Number,
        required:[true, 'Please provide your product stocks']
    },
    images:[
        {
            public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
        },
    ],
    shopId:{
        type:String,
        required:true
    },
    shop:{
        type:Object,
        required:true
    },
    sold_out:{
        type:Number,
        default:0
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("Event", eventSchema);