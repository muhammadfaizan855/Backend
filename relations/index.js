import dotenv from "dotenv"
dotenv.config()

import express from "express"
import connectDB from "./src/db/index.js"
import cors from "cors";

const app = express()
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})





connectDB()
.then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
        
    })
}).catch((err)=>{
  console.log(`MONGO DB Connection Failed !!` , err );
})