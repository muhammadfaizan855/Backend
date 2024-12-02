import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema()

const userSchema = new Schema({
    email: {
        type: String,
        required: [true , "Email is required"],
        unique: true
    },
    password : {
        type : String,
        required: [true , "Password is Required"],
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


export default mongoose.model("Users" , userSchema);