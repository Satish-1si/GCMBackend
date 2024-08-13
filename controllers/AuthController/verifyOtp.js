const AuthUser = require("../../models/AuthModel");
const AsyncErrorHandler = require("../../utils/AsyncError.js");
const customError = require("../../utils/CustomError.js");
const moment = require("moment");

module.exports.VerifyOtpController = AsyncErrorHandler(async (req, res, next) => {
    const { OTP: DB_OTP, OTPCreateAt } = req.user.sendOtp;
    const currentTime = moment();
    const otpCreateAt = moment(OTPCreateAt);
    const expiresInMinutes = currentTime.diff(otpCreateAt, "minutes");
    if (expiresInMinutes <= 3) {
        if (req.body.verifyOtp) {
            const userPostOtp =req.body.verifyOtp;
            if (DB_OTP !== userPostOtp) {
                next(new customError("Please enter a valid OTP", 404));
            } else {
                let updatedUser = await AuthUser.findByIdAndUpdate(
                    req.user.id,
                    { 
                      ActiveMode: "MODE_ONE",
                      sendOtp: { OTP: null, OTPCreateAt: null },
                      ModeDetails:{
                        ModeOne:{
                            AllowPermissions:{
                                AudioCalls:false,
                                AudioConference:false,
                                GsmCalls:true,
                                VideoCalls:false,
                                Status:"active"
                            }
                       }
                      }
                     },
                    { new: true, runValidators: true }
                );
                res.status(200).json({
                    status: "success",
                    data: updatedUser
                });
            }
        } else {
            next(new customError("Please enter the OTP", 404));
        }
    } else {
        req.user.sendOtp={OTP:null,OTPCreateAt:null};
        await req.user.save();
        next(new customError("OTP has expired", 404));
    }
});
