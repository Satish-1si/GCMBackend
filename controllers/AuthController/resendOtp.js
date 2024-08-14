const AsyncErrorHandler = require("../../utils/AsyncError.js");
const GenerateOTP = require("../../utils/GenerateOtp.js");
const CustomError = require("../../utils/CustomError.js");
const sendEmail = require("../../utils/Email.js");

module.exports.ReSendOtpController = AsyncErrorHandler(async (req, res, next) => {
    console.log("====================================================")
    try {
        // Generate OTP and update user
        const OTPNO = GenerateOTP(6);
        req.user.sendOtp = { OTP:OTPNO, OTPCreateAt: new Date() };
        await req.user.save();

        if (req.user) {
            // Send OTP via email
            const emailResponse = await sendEmail({
                frommail:process.env.Email,
                tomail  :req.user.email,
                subject :"Welcome to GCM Dialler!",
                textmsg :"One Time Password (OTP)",
                userName:req.user.username,
                userotp :OTPNO,
                type    :"verifyOtp",
                data    :req.user

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
