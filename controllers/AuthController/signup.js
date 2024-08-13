const AuthUser = require("../../models/AuthModel");
const AsyncErrorHandler = require("../../utils/AsyncError.js");
const SignToken = require("../../utils/signToken.js");
const GenerateOTP = require("../../utils/GenerateOtp.js");
const CustomError = require("../../utils/CustomError.js");
const sendEmail = require("../../utils/Email.js");

module.exports.SignupController = AsyncErrorHandler(async (req, res, next) => {
    try {
        // Generate OTP and create new user
        const OTPNO = GenerateOTP();
        const newUser = await AuthUser.create({ ...req.body, 
                                                 sendOtp:{OTP:OTPNO,OTPCreateAt:new Date()}
                                             });
        if (newUser) {
            // Send OTP via email
            const emailResponse = await sendEmail({
                frommail: process.env.Email,
                tomail: newUser.email,
                subject: "Welcome to GCM Dialler!",
                textmsg: "One Time Password (OTP)",
                userName: newUser.username,
                userotp: OTPNO
            });

            if (emailResponse?.status === "success") {
                const payload = { id: newUser._id };
                newUser.IsActive =undefined;
                newUser.sendOtp  =undefined;
                newUser.createdAt=undefined;
                newUser.updatedAt=undefined;
                res.status(200).json({
                    status: "success",
                    token: SignToken(payload),
                    data: newUser
                });
            } else {
                return next(new CustomError(emailResponse.message, 404));
            }
        } else {
            return next(new CustomError("User creation failed", 404));
        }
    } catch (error) {
        return next(new CustomError(error.message, 404));
    }
});





 