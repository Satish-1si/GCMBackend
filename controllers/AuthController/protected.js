const AuthUser = require("../../models/AuthModel");
const AsyncErrorHandler = require("../../utils/AsyncError.js");
const CustomError = require("../../utils/CustomError");
const Jwt = require("jsonwebtoken");
const util = require("util");

module.exports.ProtectedController = AsyncErrorHandler(async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return next(new CustomError("Authorization required!!! Token undefined", 401));
    }
    const token = authorizationHeader.split(" ")[1];
    
    if (!token) {
        return next(new CustomError("Authorization token is missing", 401));
    }
    
    let UserDetails;
    try {
        UserDetails = await util.promisify(Jwt.verify)(token, process.env.SecretString);
    } catch (err) {
        return next(new CustomError("Invalid token", 403)); // Changed to 403 for forbidden access
    }

    if (!UserDetails) {
        return next(new CustomError("User Not Registered...!!!", 404));
    }
    
    const UserDoc = await AuthUser.findById(UserDetails.id).select("+role").select("+sendOtp");
    if (!UserDoc) {
        return next(new CustomError("Please register!!!", 404));
    }
    
    // Uncomment and implement token expiration check if needed
    // const isTokenValid = await UserDoc.verifyTokenExpiredDate(UserDetails);
    // if (!isTokenValid) return next(new CustomError("Token expired, please login again", 401));
    
    // If everything is fine, proceed to the next middleware or route handler
    req.user = UserDoc;
    next();
});
