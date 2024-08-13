const TenantRole = require("../../models/Tenant.js");
const AsyncErrorHandler = require("../../utils/AsyncError.js");
const CustomError = require("../../utils/CustomError.js");

module.exports.ViewTenant = AsyncErrorHandler(async (req, res, next) => {
    try{
       // Create a new tenant using the TenantRole model
       const GetAllTenant = await TenantRole.find();
       if(!GetAllTenant){
          next(new CustomError("something went wrong not getting Tenant Details",500))
       }
        // Send a successful response with the created tenant data
        res.status(201).json({
           status: "success",
           data: GetAllTenant
        });
    }
    catch(err){
        res.status(404).json({
            status: "un success",
            data: err.message
         });
    }
});
