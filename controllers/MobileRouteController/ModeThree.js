const AuthUser=require("../../models/AuthModel")
const AsyncErrorHadler=require("../../utils/AsyncError.js")
const SignToken=require("../../utils/signToken.js")
const GenerateOTP=require("../../utils/GenerateOtp.js")
const customError=require("../../utils/CustomError.js")
const sendEmail=require("../../utils/Email.js")
module.exports.ModeThree=AsyncErrorHadler(async(req,res,next)=>{
    //add modedetails @modeTwo
    if(req.user.ActiveMode!=="MODE_THREE"){
        let user=await AuthUser.findByIdAndUpdate(req.user.id,{ActiveMode:"MODE_THREE"},{new:true,runValidators:true});
        if(!user){
            next(new customError("user Doesnt exist please Resister",404))
        }
        res.status(200).json({
            status:"success",
            data:user
          })
    }
    else{
        res.status(200).json({
            status:"success",
            data:req.user
          })
    }
})