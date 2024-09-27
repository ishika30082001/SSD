import { CenterModel } from "../models/CenterModel.js";
import validator from "validator";
import sendToken from "../utils/tokenGenrator.js";

export const CenterRegisterUser = async (req, res) => {
  const { name, email, password, centerId } = req.body;
  try {
    const userExist = await CenterModel.findOne({ email });

    if (userExist) {
      return res.status(404).json({
        message: "Email already exist",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(404).json({
        message: "Invalid email format",
      });
    }

    if (!email.endsWith("@gmail.com")) {
      return res.status(404).json({
        message: "Only Gmail addresses are allowed",
      });
    }
    const user = await CenterModel.create({
      centerId,
      name,
      email,
      password,
    });

    sendToken(user, 201, res);
    
  } catch (error) {
    res.status(404).json({
      message: error.message,
      success: false, 
    });
    console.log(error);
  }
};

// centerLogin Api
export const CenterLogin = async (req, res) => {
  console.log(req.body);
  const { centerId, password } = req.body;
  try {
    const user = await CenterModel.findOne({ centerId }).select("+password");
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid centerId or password" });
    }

    const isPasswordMatched = await user.comparePassword(password);
    console.log(isPasswordMatched);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid centerId or password" });
    }

    sendToken(user, 201, res, "Login Successfully");
    
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
