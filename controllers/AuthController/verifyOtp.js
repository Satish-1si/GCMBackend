const AsyncErrorHandler = require("../../utils/AsyncError.js");
const customError = require("../../utils/CustomError.js");
const moment = require("moment");

module.exports.VerifyOtpController = AsyncErrorHandler(async (req, res, next) => {
    const { OTP: DBOTP, OTPCreateAt } = req.user.sendOtp;
    const currentTime = moment();
    const otpCreateAt = moment(OTPCreateAt);
    const expiresInMinutes = currentTime.diff(otpCreateAt, "minutes");
    if (expiresInMinutes <= 3) {
        if (req.body.verifyOtp) {
            const userPostOtp =req.body.verifyOtp;
            if (DBOTP !== userPostOtp) {
                next(new customError("Please enter a valid OTP", 404));
            } else {
                req.user.ActiveMode = "MODEONE";
	         	await req.user.save();
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
