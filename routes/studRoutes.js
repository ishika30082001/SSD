import express from "express";
// import { StudentRegister } from "../controller/StudentController.js"
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';   // random number generator upto 16 num and v4 name ka property hai iske andar jo extract hoti hai.
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { StudentModel } from "../models/StuInfoModel.js";


cloudinary.config({
    cloud_name: "dkqug51rv",
    api_key: 298748942386567,
    api_secret: "1lloUDb9GHLE86xZCkAeOe6x2Ro",
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const random = uuidv4()
        cb(null, random + "" + file.originalname)
    }
})
const upload = multer({ storage: storage })



// const upload = multer({dest: "uploads"})


const router = express.Router();

router.post('/student/register', upload.single('avatar'), async (req, res) => {
    try {
        // console.log(req.file.path)
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "SSDSTUDENTS" })
        console.log("cloudinary:", result);

        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url
        };

        // Directly create and save the new student document
        const student = await StudentModel.create(req.body);
        // Delete example_file.txt
        await fs.unlink((req.file.path), function (err) {
            if (err) console.log(err)
            else {
                console.log("file deleted")
            }
        })
        // res.send("hello");
        // console.log(req.file);
        res.status(200).json({
            success: true,
            message: "Student registered successfully!",
            student,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message,
        })
    }

});

export default router;
