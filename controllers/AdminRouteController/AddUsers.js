const AdminAddUsers = require("../../models/ModesSchema/AdminAddusers.js");
const AsyncErrorHandler = require("../../utils/AsyncError.js");
const CustomError = require("../../utils/CustomError.js");

module.exports.AddUser= AsyncErrorHandler(async (req, res, next) => {
    const { email, username,ExtensionNo, PhoneNumber, password, conformPassword,AllowPermissions} = req.body;

    // Check if all fields are provided
    if (!email) {
        return next(new CustomError("Email is required", 400));
    }
    if (!username) {
        return next(new CustomError("Username is required", 400));
    }
    if (!PhoneNumber) {
        return next(new CustomError("Phone number is required", 400));
    }
    if (!password) {
        return next(new CustomError("Password is required", 400));
    }
    if (!conformPassword) {
        return next(new CustomError("Conform password is required", 400));
    }
    if(!ExtensionNo){
        return next(new CustomError("Extension No required", 400));
    }
    if(!AllowPermissions){
        return next(new CustomError("AllowPermissions required", 400));
    }

    // Check if passwords match
    if (password !== conformPassword) {
        return next(new CustomError("Passwords do not match", 400));
    }


    // Check if email already exists
    const existingUser = await AdminAddUsers.findOne({ email:email });
    if (existingUser) {
        return next(new CustomError("Email already exists", 400));
    }

    // Create new admin
    const newUser= new AdminAddUsers({
        ...req.body,CreateBy:"satishManepalli"
    });

    await newUser.save();

    res.status(201).json({
        success: true,
        message: "ModeTwo user registered successfully",
        data: newUser,
    });
});
