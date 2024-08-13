const mongoose = require('mongoose');
const Bcrypt=require("bcryptjs")
const AdminSignModel= new mongoose.Schema({
      username:{
        type:String,
        unique:true,
        required:[true,"username required !!!"]
      },
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
      password:{
        type:String,
        minlength:8,
        required:[true,"password required !!!"]
      },
      PhoneNumber:{
        type:String,
        required:[true,"please enter the MobileNumber"],
      }
});
//Hash the ==> new || modied passwords
AdminSignModel.pre("save",async function (next){
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

//comapre the Db password and userpostpassword
AdminSignModel.methods.comparePasswordInDb = async function(userPassword,DBpassword) {
    return await Bcrypt.compare(userPassword, DBpassword);
  };

const AdminRegistrationModel =mongoose.model("adminregistration",AdminSignModel);
module.exports = AdminRegistrationModel