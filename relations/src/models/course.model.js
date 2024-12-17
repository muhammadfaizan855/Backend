import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    coursename : {
        type : String,
        required : [true , "coursename is required"]
    },
    duration : {
        type : String,
        default : 12
    },
    enrolledStudent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student"
    }
} ,
{
  timestamps : true,
})


export default mongoose.model("Course", courseSchema);