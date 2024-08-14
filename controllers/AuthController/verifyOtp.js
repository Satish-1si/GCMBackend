const AsyncErrorHandler = require("../../utils/AsyncError.js");
const customError = require("../../utils/CustomError.js");
const ServerGenerateUsers = require("../../models/ModesSchema/ServerGenerateUsers.js");
const moment = require("moment");
const GenerateOTP = require("../../utils/GenerateOtp.js");
const sendEmail = require("../../utils/Email.js");

const OTP_EXPIRATION_TIME = 3; // in minutes

module.exports.VerifyOtpController = AsyncErrorHandler(async (req, res, next) => {
    const { OTP: DBOTP, OTPCreateAt } = req.user.sendOtp;
    const currentTime = moment();
    const otpCreateAt = moment(OTPCreateAt);
    const expiresInMinutes = currentTime.diff(otpCreateAt, "minutes");

    if (expiresInMinutes <= OTP_EXPIRATION_TIME) {
        const userPostOtp = req.body.verifyOtp;

        if (!userPostOtp) {
            return next(new customError("Please enter the OTP", 400));
        }

        if (DBOTP !== userPostOtp) {
            return next(new customError("Invalid OTP provided", 400));
        }

        // Generate Extension Number --> modeThree user
        const GenerateExtNo = GenerateOTP(7) * 1;
        const ModeThreeUser = await ServerGenerateUsers.create({
            email: req.user.email,
            username: req.user.username,
            PhoneNumber: req.user.PhoneNumber || null,
            ExtensionNo: GenerateExtNo,
            AllowPermissions: {
                GsmCalls: true,
                AudioCalls: false,
                AudioConference: false,
                VideoCalls: false,
            },
        });

        if (!ModeThreeUser) {
            return next(new customError("Something went wrong after verifying OTP", 500));
        }
         // send mode three --> from paticular user
        const emailResponse = await sendEmail({
            frommail: process.env.Email,
            tomail: ModeThreeUser.email,
            subject: "Welcome to GCM Dialler!",
            textmsg: "Mode Three Extension NO",
            userName: ModeThreeUser.username,
            userotp: GenerateExtNo,
            type: "ExtensionNO",
            data:ModeThreeUser
        });

        if (emailResponse?.status === "success") {
            // After verifying OTP, set user mode to MODEONE
            req.user.ActiveMode = "MODEONE";
            await req.user.save();
            req.user.sendOtp=undefined
            req.user._id=undefined
            res.status(200).json({
                status: "success",
                data: req.user,
                AllowPermissions: {
                    GsmCalls: true,
                    AudioCalls: false,
                    AudioConference: false,
                    VideoCalls: false,
                },
            });
        } else {
            return next(new customError(emailResponse.message || "Email sending failed", 500));
        }
    } else {
        // OTP expired
        req.user.sendOtp = { OTP: null, OTPCreateAt: null };
        await req.user.save();
        return next(new customError("OTP has expired", 400));
    }
});
