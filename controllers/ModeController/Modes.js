const AddAdminUsers = require("../../models/ModesSchema/AdminAddusers.js");
const ServerGenerateUsers = require("../../models/ModesSchema/ServerGenerateUsers.js");
const AsyncErrorHadler = require("../../utils/AsyncError.js");
const customError = require("../../utils/CustomError.js");

module.exports.Mode = AsyncErrorHadler(async (req, res, next) => {
	const { RequestMode, ExtensionNO, ExtensionPassword } = req.body;
	if (RequestMode === "MODEONE") {
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
	} else if (RequestMode === "MODETWO") {
		if (ExtensionNO) {
			if (ExtensionPassword) {
				let ValidateUser = await AddAdminUsers.findOne({
					ExtensionNo: ExtensionNO,
					password: ExtensionPassword,
				});

				if (ValidateUser) {
					req.user.ActiveMode = "MODETWO";
					await req.user.save();
					res.status(200).json({
						status: "success",
						data: req.user,
						AllowPermissions: ValidateUser?.AllowPermissions
					});
				} else {
                    next(new customError("Please contact Admin, you don't have permissions !!!", 404));
				}
			} else {
				next(new customError("Please enter the ExtensionPassword !!!", 404));
			}
		} else {
			next(new customError("Please enter the ExtensionNO !!!", 404));
		}
	} else if (RequestMode === "MODETHREE") {
		if (ExtensionNO) {
			let ValidateUser = await ServerGenerateUsers.findOne({ExtensionNo:ExtensionNO});
			if(ValidateUser){
				req.user.ActiveMode = "MODETHREE";
				await req.user.save();
				res.status(200).json({
					status: "success",
					data: req.user,
					AllowPermissions: ValidateUser?.AllowPermissions
				});
			}

	     }
	     else {
		  next(new customError("Please enter the ExtensionNO !!!", 404));
	     }

   }
});
