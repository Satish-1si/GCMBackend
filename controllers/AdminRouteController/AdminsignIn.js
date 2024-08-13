const AdminSignInModel = require("../../models/adminregistration.js");
const AsyncErrorHandler = require("../../utils/AsyncError.js");
const customError = require("../../utils/CustomError.js");
const CustomError = require("../../utils/CustomError.js");
const bcrypt = require('bcryptjs');

module.exports.AdminSignIn = AsyncErrorHandler(async (req, res, next) => {
    const {username, password } = req.body;
    
    if (!username) {
        return next(new CustomError("Please Enter the Username", 400));
    }

    if (!password) {
        return next(new CustomError("Please Enter the Password", 400));
    }
  
    // Check if email 
    const existingAdmin = await AdminSignInModel.findOne({username});
    if(!existingAdmin){
        next(new customError("User Doesnt Exsists Please Contact superAdmin!!!",404))
    }
    //verify password 
    let verifyPassword=await existingAdmin.comparePasswordInDb(password,existingAdmin.password)

    if(!verifyPassword){
        next(new customError("Invalid password",404)) 
    }
    res.status(200).json({
        success: true,
        data: {
            id: existingAdmin._id,
            email: existingAdmin.email,
            username: existingAdmin.username,
        },
    })
         

});
