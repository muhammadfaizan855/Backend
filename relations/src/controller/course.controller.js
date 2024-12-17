import courseModel from "../models/course.model.js";

// add course 

const addCourse = async (req , res) => {
    const {coursename , duration} = req.body;

    if(!coursename){
        return res.status(400).json({
            message : "coursename is required",
        })
    }

    const course = courseModel.create({coursename , duration})
    res.status(200).json({
        message : "Course added successfully",
    })

}

export {addCourse}