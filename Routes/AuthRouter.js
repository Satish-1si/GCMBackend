const Express=require("express")
const Router=Express.Router()
const AllControllers=require("../controllers/MergeAllControllers.js")
const {ProtectedController}=require("../middleware/AuthenticationMiddleware.js")
const {
        SignupController,
        LoginController,
        VerifyOtpController,
        ForgetPasswordController,
        ReSendOtpController,
        Mode
      }=AllControllers

/* signup */
Router.route("/signup").post(SignupController)

/* verifyRoute ==>using Register token ==> to pass login Details */
Router.route("/verifyOtp").post(ProtectedController,VerifyOtpController)

/*ReverifyRoute */
Router.route("/resendOtp").post(ProtectedController,ReSendOtpController)

/* login ==>using Register token ==> to pass login Details*/
Router.route("/login").post(LoginController)

/* ForgetPassword */
Router.route("/forgetPassword").post(ProtectedController,ForgetPasswordController)

/*MODE 1,2,3 ==> all Mode api  */
Router.route("/MODE").post(ProtectedController,Mode)

module.exports=Router


