
const AddAdminUsers = require("../../models/ModesSchema/AdminAddusers.js");
const ServerGenerateUsers = require("../../models/ModesSchema/ServerGenerateUsers.js");
const AsyncErrorHadler = require("../../utils/AsyncError.js");
const customError = require("../../utils/CustomError.js");
const AuthUser = require("../../models/AuthModel");

module.exports.Mode = AsyncErrorHadler(async (req, res, next) => {
	const { RequestMode, ExtensionNO, ExtensionPassword } = req.body;

	if (RequestMode === "MODEONE") {
		 
		/*All type of users avalible ==> @ registration time*/
		req.user.ActiveMode = "MODEONE";
		req.user.ExtensionNO=null
		await req.user.save();
        /*Get ModeOne users */
		let GetAllModeOneUsers = await AuthUser.find({$and:{ActiveMode: { $eq: RequestMode }}});

		res.status(200).json({
			status: "success",
			data: req.user,
			AllowPermissions: {
				GsmCalls: true,
				AudioCalls: false,
				AudioConference: false,
				VideoCalls: false,
			},
			ModeOneUsers:GetAllModeOneUsers
		});
	} else if (RequestMode === "MODETWO") {
		if (ExtensionNO) {
			if (ExtensionPassword) {
				console.log({
					ExtensionNo: ExtensionNO,
					password: ExtensionPassword,
					   email:req.user.email
				})

				/*AdimGenerate users ==> @Admin panel*/
				let ValidateUser = await AddAdminUsers.findOne({
					ExtensionNo: ExtensionNO,
					password: ExtensionPassword,
					   email:req.user.email
				});
				
				/*get All MODETWO users*/
				let GetAllModeTwoUsers = await AddAdminUsers.find( {ExtensionNo:{$ne: ExtensionNO*1}});
			
				if (ValidateUser) {
					req.user.ActiveMode = "MODETWO";
					req.user.ExtensionNO= ExtensionNO
					await req.user.save();
					res.status(200).json({
						status: "success",
						data: req.user,
						AllowPermissions: ValidateUser?.AllowPermissions,
						ModeTwoUsers:GetAllModeTwoUsers
					});
				} else {
                    next(new customError("Please contact Admin, you don't have permissions !!!", 404));
				}
			} else {
				next(new customError("Please enter the ExtensionPassword !!!", 404));
			}
		} 
		else {
			next(new customError("Please enter the ExtensionNO !!!", 404));
		}
	} else if (RequestMode === "MODETHREE") {
		if (ExtensionNO) {
		
            /*ServerGenerate users ==> @user registration time*/
			let ValidateUser = await ServerGenerateUsers.findOne({ExtensionNo:ExtensionNO,email:req.user.email});
			/*get All modeThree users */
			let GetAllModeThreeUsers = await ServerGenerateUsers.find({ExtensionNo:{$ne: ExtensionNO*1}});

			if(ValidateUser){
				req.user.ActiveMode = "MODETHREE";
				req.user.ExtensionNO= ExtensionNO
				await req.user.save();
				res.status(200).json({
					status: "success",
					UserMail: req.user.email,
					AllowPermissions: ValidateUser,
					ModeThreeUsers:GetAllModeThreeUsers
				});
			}
			else {
				next(new customError("invalid ExtensionNO.Please contact support Team, you don't have permissions !!!", 404));
			}

	     }
	     else {
		  next(new customError("Please enter the ExtensionNO !!!", 404));
	     }

   }
});
