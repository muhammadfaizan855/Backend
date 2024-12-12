import User from "../models/users.models.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"




// cloudinary configuration

cloudinary.config({ 
    cloud_name: "dcehigt1w", 
    api_key: "716858866297597", 
    api_secret: "3_PIO8nK5bqYaE9y6ExMsML7rDI"
});





// upload image function


// const uploadImageToCloudinary = async (localpath) => {
//     try {
//       const uploadResult = await cloudinary.uploader.upload(localpath, {
//         resource_type: "auto",
//       });
//       fs.unlinkSync(localpath);
//       console.log(uploadResult.url);
//       return uploadResult.url;
      
//     } catch (error) {
//       fs.unlinkSync(localpath);
//       console.log(error);
//       return null;
//     }
// };

const uploadImageToCloudinary = async (localpath) => {
    try {
      const uploadResult = await cloudinary.uploader.upload(localpath, {
        resource_type: "auto",
      });
      fs.unlinkSync(localpath);
      return uploadResult.url;
    } catch (error) {
      fs.unlinkSync(localpath);
      return null;
    }
};







// Access JWT Token

const generateAccessToken = (user)=>{
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "6h",
    });
}



// Refresh JWT Token

const generateRefreshToken = (user)=>{
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, { expiresIn : "7d",
    });
}





// user register

const userRegister = async (req , res)=>{
   const {email , password} = req.body
   
   if(!email){
    res.status(400).json({
        message : "Email is Required"  
    })
   }

   if(!password){
    res.status(400).json({
        message : "Password is Required"  
    })
   }

   const user = await User.findOne({email : email});
   if(user) return res.status(401).json({message : "User Already Exist"})

   const createUser = await User.create({
    email, 
    password
   })
   res.status(200).json({
    message : "User Registered Successfully",
    data : createUser, 
   })
}




// user login


const loginUser = async (req , res) => {
    const {email , password} = req.body;

    if(!email){
        res.status(404).json({message : "Email is Required"})
    };
    if(!password){
        res.status(404).json({message : "Password is Required"})
    };

    // email mujood ha bhi ye nhi 

    const user = await User.findOne({email : email});
    if(!user) return res.status(404).json({message : "User No Found"});

    // agar email mujood ha toh password compare karen ge bcrypt ke through 
    
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword) return res.status(400).json({message : "incorrect Password"});
    
    // JWT Token Generate 
    
    const accessToken =  generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)   
    
    // uske bad cookies mai refresh token save karwana ha 
    
    res.cookie("refreshToken" , refreshToken, { http: true , secure : false })


    res.status(200).json({
      message: "User logged in succesfully",
      accessToken,
      refreshToken,
      data : user,
    })
        

}







// logout User

const logoutUser = (req , res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({message: "User logout successfully"})
}






// Refresh Token


const refreshToken = async (req , res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if(!refreshToken){
        return res.status(401).json({
            message : "No Refresh Token Found!"
        })
    }


    const decodedToken = jwt.verify(refreshToken , process.env.REFRESH_JWT_SECRET)
    
    const user = await User.find({email : decodedToken.email})

    if(!user){
        return res.status(404).json({
            message : "Invalid Token"
        })
    }

    const generateToken = generateAccessToken(user)
    return res.status(200).json({ message : "access token generate" , accessToken: generateToken })

    res.json({ decodedToken  })
}



// const uploadImage = (req , res) => {
//     if(!req.file){
//         return res.status(404).json({
//             message : "no image file upload",
//         })
//     };
    
//     try {
    
    
        
//     const imageResult = uploadImageToCloudinary(req.file.path)

//     // agar image nhi ha toh ye msg bejwa dena

//     if(!imageResult){
//         return res.status(500).json({
//             message : "error occured  while uploading image",
//         })

//     };

//     // agar image a jaye toh ye msg bejwa dena or uske sath image ka url bhi
    
//     res.status(200).json({
//         message : "image uploaded successfully",
//         url : imageResult
//     })

//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         message : "error occured  while uploading image",
//     })
//     }
// }

const uploadImage = async (req, res) => {
    if (!req.file)
      return res.status(400).json({
        message: "no image file uploaded",
      });
  
    try {
      const uploadResult = await uploadImageToCloudinary(req.file.path);
  
      if (!uploadResult)
        return res
          .status(500)
          .json({ message: "error occured while uploading image" });
  
      res.json({
        message: "image uploaded successfully",
        url: uploadResult,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error occured while uploading image" });
    }
  };
  




export { userRegister , loginUser , logoutUser , refreshToken , uploadImage }