const PORT=8001;
const express=require('express');
const app=express();
app.use(express.json());
const URL=require('./model/url');

const urlRoute=require("./router/router");

const connectToMongoDB=require("./connect")


connectToMongoDB("mongodb://127.0.0.1:27017/URLSHORTNER")
.then(()=>
    console.log("DB connected successfully")
) 

app.use("/url",urlRoute);

app.get("/:shortId", async (req,res)=>{
 const shortId = req.params.shortId;
 const entry=await URL.findOneAndUpdate({
    shortId
 },{$push:{
    visitHistory: {timestamp:Date.now()}
 }})
 res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
 }) 

    