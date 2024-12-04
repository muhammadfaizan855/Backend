import express from "express"
import { loginUser, userRegister } from "../controller/users.controller.js"

const router = express.Router();


// registerUser
router.post("/register" , userRegister);
router.post("/login" , loginUser)




export default router