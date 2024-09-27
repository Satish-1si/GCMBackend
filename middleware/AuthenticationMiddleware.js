//Checks ==>  1.user’s identity by checking their credentials against the database & 2. verifying their token details.

const AuthUser = require("../models/AuthModel");
const AsyncErrorHandler = require("../utils/AsyncError.js");
const CustomError = require("../utils/CustomError");
const Jwt = require("jsonwebtoken");
const util = require("util");

module.exports.ProtectedController = AsyncErrorHandler(async (req, res, next) => {
    
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader)
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return next(new CustomError("Authorization required!!! Token undefined", 401));
    }
    const token = authorizationHeader.split(" ")[1];
    
    if (!token) {
        return next(new CustomError("Authorization token is missing", 401));
    }
    
    let UserTokenDetails;
    try {
        UserTokenDetails = await util.promisify(Jwt.verify)(token, process.env.SecretString);
    } catch (err) {
        return next(new CustomError("Invalid token", 403)); // Changed to 403 for forbidden access
    }

    if (!UserTokenDetails) {
        return next(new CustomError("User Not Registered...!!!", 404));
    }
    
    
    const UserDoc = await AuthUser.findById(UserTokenDetails.id).select("+email").select("+role").select("+sendOtp");
    if (!UserDoc) {
        return next(new CustomError("Please register user not found!!!", 404));
    }

    const isTokenValid = await UserDoc.verifyTokenExpiredDate(UserTokenDetails);
    if (!isTokenValid) return next(new CustomError("Token expired, please login again", 401));
    

    
    req.user = UserDoc;
    next();
});
