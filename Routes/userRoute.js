const Express=require("express")
const Router=Express.Router()
const AllControllers=require("../controllers/MergeAllControllers.js")
const {ProtectedController}=require("../middleware/AuthenticationMiddleware.js")
const {UpdateUserDetailsController}=AllControllers

/*update user Details */
Router.route("/UpdateUserDetails").post(ProtectedController,UpdateUserDetailsController)

module.exports=Router
