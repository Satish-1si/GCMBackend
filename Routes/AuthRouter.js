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
        ModeOne,ModeTwo,ModeThree
      }=AllControllers

/* signup */
Router.route("/signup").post(SignupController)

/* verifyRoute */
Router.route("/verifyOtp").post(ProtectedController,VerifyOtpController)

/*ReverifyRoute */
Router.route("/reverifyOtp").post(ProtectedController,ReSendOtpController)

/* login */
Router.route("/login").post(ProtectedController,LoginController)

/* ForgetPassword */
Router.route("/forgetPassword").post(ProtectedController,ForgetPasswordController)

/*Mode1 */
Router.route("/ModeOne").post(ProtectedController,ModeOne)
/*Mode2 */
Router.route("/ModeTwo").post(ProtectedController,ModeTwo)
/*Mode3 */
Router.route("/ModeThree").post(ProtectedController,ModeThree)

module.exports=Router