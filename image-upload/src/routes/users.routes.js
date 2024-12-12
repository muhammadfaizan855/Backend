import express from "express"
import { loginUser, logoutUser, refreshToken, uploadImage, userRegister } from "../controller/users.controller.js"
import { upload } from "../middlewire/multer.middlewire.js";

const router = express.Router();


// registerUser
router.post("/register" , userRegister);
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)
router.post("/refreshtoken" , refreshToken)
router.post("/uploadimage" , upload.single("image"), uploadImage)

export default router