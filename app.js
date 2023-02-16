const express=require("express");
const dotenv=require("dotenv");
const app=express();
const path=require("path");
dotenv.config({path:'./config.env'});
const PORT=process.env.PORT;


// importing mongodb connection file
require('./conn');

// middlewares 
app.use(express.json());

// requiring router 
app.use(require('./router'));

// listening at port 
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`); 
})

