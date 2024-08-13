const AuthUser=require("../../models/AuthModel")
const AsyncErrorHadler=require("../../utils/AsyncError.js")
const customError=require("../../utils/CustomError.js")
module.exports.ModeOne=AsyncErrorHadler(async(req,res,next)=>{
    //add modedetails @modeOne
    if(req.user.ActiveMode!=="MODE_ONE"){
        let user=await AuthUser.findByIdAndUpdate(req.user.id,{ActiveMode:"MODE_ONE"},{new:true,runValidators:true});
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