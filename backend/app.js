const express=require('express');
const ErrorHandler = require('./middleware/error');
const app=express();
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const cors=require('cors');


app.use(cors({
  origin:['https://ecommerce-website-8uam.vercel.app'],
  credentials:true,
}));
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use('/test', (req, res)=>{
  res.send('hello World')
})
app.use(bodyParser.urlencoded({extended:true, limit: "50mb"}));
app.set('serverTimeout', 120000);





// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }


  // import routes
  const user=require('./controller/user');
  const shop=require('./controller/shop');
  const product=require('./controller/product');
  const event=require('./controller/event');
  const couponCode=require('./controller/couponCode');
  const payment=require('./controller/payment');
  const order=require('./controller/order');
  const conversation=require('./controller/conversation');
  const messages=require('./controller/messages');
  const withdraw=require('./controller/withdraw');


  app.use('/api/v2/user', user);
  app.use('/api/v2/shop', shop);
  app.use('/api/v2/product', product);
  app.use('/api/v2/event', event);
  app.use('/api/v2/coupon', couponCode);
  app.use('/api/v2/payment', payment);
  app.use('/api/v2/order', order);
  app.use('/api/v2/conversation', conversation);
  app.use('/api/v2/message', messages);
  app.use('/api/v2/withdraw', withdraw);


// it is for error handling
app.use(ErrorHandler);

module.exports = app;