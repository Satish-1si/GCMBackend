const AsyncErrorHandler = require("../../utils/AsyncError.js");
const CustomError = require("../../utils/CustomError");
const GenerateOTP = require("../../utils/GenerateOtp.js");
const sendEmail = require("../../utils/Email.js");

module.exports.UpdateUserDetailsController = AsyncErrorHandler(async (req, res, next) => {
    const { email, username, ActiveMode } = req.body;
    // Check if ActiveMode is being updated
    if (ActiveMode) {
        return next(new CustomError("You can't update ActiveMode for this endpoint", 400));
    }

    // Flag to determine if user details were updated
    let updated = false;

    // Handle email update

    // if (email) {
    //     try {
    //         const OTPNO = GenerateOTP(6);
    //         req.user.email = email;
    //         req.user.sendOtp = { OTP: OTPNO, OTPCreateAt: new Date() };
    //         await req.user.save();

    //         // Send OTP email
    //         const emailResponse = await sendEmail({
    //              frommail: process.env.Email,
    //              tomail  : req.user.email,
    //              subject : "Update your GCM Dialler Email",
    //              textmsg : "One Time Password (OTP)",
    //              userName: req.user.username,
    //              userotp : OTPNO,
    //              type    : "verifyOtp",
    //              data    : req.user
    //         });

    //         if (emailResponse?.status !== "success") {
    //             return next(new CustomError(emailResponse.message, 404));
    //         }
    //         updated = true;
    //     } catch (error) {
    //         return next(new CustomError(error.message, 500));
    //     }
    // }

    // Handle username update
    if(email){
        req.user.email=email
        await req.user.save()
        updated=true;
    }
    if (username) {
        req.user.username = username;
        await req.user.save();
        updated = true;
    }

    // Send response if any details were updated
    if (updated) {
        req.user.IsActive = undefined;
        req.user.sendOtp = undefined;
        return res.status(200).json({
            success: true,
            message: "User details updated successfully",
            data: req.user
        });
    } else {
        // If no update was made
        return res.status(400).json({
            success: false,
            message: "No details were updated"
        });
    }
});
