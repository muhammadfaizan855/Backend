import express from "express";

const app = express();
const port = 5000;

// console.log("hello world");



app.get("/" , (req , res)=>{
    res.send("Hello SMIT");
});

// get about

app.get("/about" , (req , res)=>{
    res.send("Hello About"); 
})




app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});