const Express=require("express")
const Router=Express.Router()
const AllControllers=require("../controllers/MergeAllControllers.js")
const {AddTenant,ViewTenant,AdminSignup,AdminSignIn,AddUser}=AllControllers

/* SignUp */
Router.route("/SignUp").post(AdminSignup)

/*Sign In */
Router.route("/SignIn").post(AdminSignIn)
 
/*ModeTwo */
Router.route("/AddUser").post(AddUser)

/* create Tenant */
Router.route("/TenantManagement/AddTenant").post(AddTenant)

/* Get Tenant */
Router.route("/TenantManagement/ViewTenant").get(ViewTenant)
module.exports=Router
