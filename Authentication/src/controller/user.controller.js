import Users from "../models/user.models.js"
import jwt from "jsonwebtoken"




// user register

const userRegister = (req , res)=>{
   const {email , password} = req.body
   if(!email){
    res.status.json({
        message : "Email is Required"  
    })
   }

   if(!password){
    res.status.json({
        message : "Password is Required"  
    })
   }

   const createUser = Users.create({
    email, 
    password
   })
   res.status(200).json({
    message : "User Registered Successfully",
    data : createUser 
   })
}

export { userRegister }