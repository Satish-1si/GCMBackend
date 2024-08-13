const AuthUser = require("../../models/AuthModel");
const AsyncErrorHadler = require("../../utils/AsyncError.js");
const SignToken = require("../../utils/signToken.js");
const GenerateOTP = require("../../utils/GenerateOtp.js");
const customError = require("../../utils/CustomError.js");
const sendEmail = require("../../utils/Email.js");
// * mode_2:- domainID && password
module.exports.ModeTwo = AsyncErrorHadler(async (req, res, next) => {
	//add modedetails @modeTwo
	if (req.body.ExtensionNO) {
		if (req.body.ExtensionPassword) {
			if (req.user.ActiveMode !== "MODE_TWO") {
				let user = await AuthUser.findByIdAndUpdate(req.user.id,{ ActiveMode: "MODE_TWO" },{ new: true, runValidators: true },);
				if (!user) {
					next(new customError("user Doesnt exist please Resister",404,));
				}
				res.status(200).json({status: "success",data: user,});
			} else {
				res.status(200).json({status: "success",data: req.user,});
			}
		} else {
			next(customError("please enter the DomainPassword",404,));
		}
	} else {
		next(customError("please enter the DomainId", 404));
	}
});
