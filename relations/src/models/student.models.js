import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
    fullName : {
        type  : String,
        required : [true , "Fullname is required"]
    },
    email : {
        type : String,
        required : [true , "Email is required"]
    },
    enrolledCourse : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course", 
    }
},
{
  timestamps : true,
}
)



export default mongoose.model("Students" , studentSchema)