import { mongoose } from "mongoose";
import validator from "validator";

const StuInfoSchema = new mongoose.Schema({
    Gender: {
        type: String,
        required: true,
    },
    Name_of_Applicant: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    FatherName: {
        type: String,
        required: [true, "please specify your father's name"],
    },
    MotherName: {
        type: String,
        required: [true, "please specify your mother name"],
    },
    AadharNo: {
        type: Number,
        required: [true, "please specify your adharNo"],
    },
    MaritalStatus: {
        type: String,
        required: [true, "Please specify your marital status"],
    },
    EmailId: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter valid Email"],
    },
    MobileNo: {
        type: Number,
        required: [true, "please enter your phone number"],
        maxLength: [10, "Phone no should be correct"],
    },
    WhatsappNo: {
        type: Number,
        required: [true, "please enter your whatsapp no"],
    },
    Category: {
        type: String,
        required: [true, "please specify your category"],
    },
    Religion: {
        type: String,
        required: [true, "please specify your religion"],
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
export const StudentModel = mongoose.model("student", StuInfoSchema);