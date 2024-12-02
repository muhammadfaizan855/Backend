import express from "express"
import userRegister from "../controller/user.controller.js"

const router = express.Router();


// registerUser
router.post("/register" , userRegister);

