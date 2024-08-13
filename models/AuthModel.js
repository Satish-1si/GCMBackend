const mongoose = require("mongoose");
const moment=require("moment")
const Bcrypt=require("bcryptjs")
const OTP_SCHEMA=require("./OtpModel")
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: {
        validator: function(msg) {
          return /^[a-z . 0-9]*@gmail.com$/.test(msg);
        },
        message: "Please enter a valid email"
      }
    },
    IsActive:{
        type:Boolean,
        default:true,
        select:false
    },
    sendOtp:{
      type:OTP_SCHEMA,
      select:false
    },
    ActiveMode:{
       type:String
    }
},{timestamps:true});
  
//Hash the ==> new || modied passwords
userSchema.pre("save",async function (next){
        //isModified ==> if the user changes currect Document Field or not @ create ,update ==> change(true) ||!change(false)
         if(!this.isModified("password")) next()    
         try{
            let HashPassword=await Bcrypt.hash(this.password,10)
            this.password=HashPassword
            this.conformPassword=undefined
            next()
         }
         catch(err){
            next(err)
         }
  })

//verify the Token 
userSchema.methods.verifyTokenExpiredDate=async function(IssuedTokenDetails){
        const {iat,exp}=(IssuedTokenDetails);
        const IssuedTime=moment.unix(iat).format()/*30-1-2022 */
        const ExpriedTime=moment.unix(exp).format()/*30-2-2022 */
        let CountDays=(new moment(ExpriedTime).diff(IssuedTime,"days"))
        return (CountDays<=1)
         
}



const AuthUser = mongoose.model("UserAuthtication", userSchema);
module.exports = AuthUser;
  



