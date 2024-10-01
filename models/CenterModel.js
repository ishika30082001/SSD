import { mongoose } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const CenterSchema = new mongoose.Schema({
  centerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, // Password field will not be included by default in queries mtlb password show nhi hoga when you hit the query
  },
  role: {
    type: String,
    default: "Centeradmin",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Pre-save hook to hash the password before saving  // pre ek event hai
CenterSchema.pre("save", async function (next) {
  //if password phle se hash hai to modiefied nhi krenge
  if (!this.isModified("password")) {
    return next();
  } 
  // const salt = await bcrypt.genSalt(10)
  // this.password = await bcrypt.hash(this.password, salt);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// token generation 
CenterSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
CenterSchema.methods.comparePassword = async function(EnteredPassword)  {
  return await bcrypt.compare(EnteredPassword, this.password)
};

export const CenterModel = mongoose.model("center", CenterSchema);  
