import express from "express"
import { addCourse } from "../controller/course.controller.js";

const router = express.Router();


router.post("/course" , addCourse)



export default router