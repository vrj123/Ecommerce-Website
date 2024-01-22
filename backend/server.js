const app=require('./app');
const connectDatabase = require('./db/Database');


process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server for handling uncaught exceptions");
})

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }

// connect database
connectDatabase();

  const server=app.listen(process.env.PORT, ()=>{
    console.log(`Sever started on port number ${process.env.PORT}`)
  })
  
  process.on('unhandledRejection', (err)=>{
    console.log(`Shutting down the server for ${err.message}`);
    console.log('Shutting dowm the server for promise rejection');
  
    server.close(()=>{
      process.exit(1);
    });
  })