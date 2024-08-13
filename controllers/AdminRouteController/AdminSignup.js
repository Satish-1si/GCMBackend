const AdminSignInModel = require("../../models/adminregistration.js");
const AsyncErrorHandler = require("../../utils/AsyncError.js");
const CustomError = require("../../utils/CustomError.js");
const bcrypt = require('bcryptjs');

module.exports.AdminSignup = AsyncErrorHandler(async (req, res, next) => {
    const { email, username, phoneNumber, password, conformPassword } = req.body;

    // Check if all fields are provided
    if (!email) {
        return next(new CustomError("Email is required", 400));
    }
    if (!username) {
        return next(new CustomError("Username is required", 400));
    }
    if (!phoneNumber) {
        return next(new CustomError("Phone number is required", 400));
    }
    if (!password) {
        return next(new CustomError("Password is required", 400));
    }
    if (!conformPassword) {
        return next(new CustomError("Confirm password is required", 400));
    }

    // Check if passwords match
    if (password !== conformPassword) {
        return next(new CustomError("Passwords do not match", 400));
    }

    // Check if email already exists
    const existingAdmin = await AdminSignInModel.findOne({ email:email });
    if (existingAdmin) {
        return next(new CustomError("Email already exists", 400));
    }

    // Create new admin
    const newAdmin = new AdminSignInModel({
        email,
        username,
        phoneNumber,
        password: password,
    });

    await newAdmin.save();

    res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        data: {
            id: newAdmin._id,
            email: newAdmin.email,
            username: newAdmin.username,
        },
    });
});
