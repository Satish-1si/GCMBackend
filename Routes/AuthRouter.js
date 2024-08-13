const Express=require("express")
const Router=Express.Router()
const AllControllers=require("../controllers/MergeAllControllers.js")
const {
        SignupController,
        LoginController,
        VerifyOtpController,
        ProtectedController,
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

/*Mode1 */
Router.route("/MODE").post(ProtectedController,Mode)

module.exports=Router


