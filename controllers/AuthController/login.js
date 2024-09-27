const AuthUser=require("../../models/AuthModel")
const AsyncErrorHadler=require("../../utils/AsyncError.js")
const CustomError = require("../../utils/CustomError");
const SignToken=require("../../utils/signToken.js")

module.exports.LoginController=AsyncErrorHadler(async(req,res,next)=>{
    let user=await AuthUser.findOne({email:req.body.email}).select("+email").select("+password");
    if(!(req.body.email)){
        next(new CustomError("please enter the email",404))
    }
    if(!user){
       next(new CustomError("user Doesnt exist please Register and again",404))
    }
    let payload={id:user._id}
    res.status(200).json({
        status:"success",
        token :SignToken(payload),
        data:user
      })

})


