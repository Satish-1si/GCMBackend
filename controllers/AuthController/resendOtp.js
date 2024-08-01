const AsyncErrorHandler = require("../../utils/AsyncError.js");
const GenerateOTP = require("../../utils/GenerateOtp.js");
const CustomError = require("../../utils/CustomError.js");
const sendEmail = require("../../utils/Email.js");

module.exports.ReSendOtpController = AsyncErrorHandler(async (req, res, next) => {
    try {
        // Generate OTP and update user
        const OTP = GenerateOTP();
        req.user.sendOtp = { OTP, OTPCreateAt: new Date() };
        await req.user.save();

        if (req.user) {
            // Send OTP via email
            const emailResponse = await sendEmail({
                frommail: process.env.EMAIL, // Ensure the environment variable is correctly named
                tomail: req.user.email,
                subject: "Welcome to GCM Dialler!",
                textmsg: "One Time Password (OTP)",
                userName: req.user.username,
                userotp: OTP
            });

            if (emailResponse?.status === "success") {
                res.status(200).json({
                    status: "success",
                    message: "Successfully sent OTP to your email 🎉🎉"
                });
            } else {
                return next(new CustomError(emailResponse.message, 404));
            }
        } else {
            return next(new CustomError("User not found in DB", 404));
        }
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
});
