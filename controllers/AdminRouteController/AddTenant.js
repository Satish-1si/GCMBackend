const TenantRole = require("../../models/Tenant.js");
const AsyncErrorHandler = require("../../utils/AsyncError.js");
const CustomError = require("../../utils/CustomError.js");

module.exports.AddTenant = AsyncErrorHandler(async (req, res, next) => {
   // Check for TenentRole in the request body
    if (!req.body.TenentRole) {
        return next(new CustomError("Please enter the Tenant Role", 404));
    }

    // Check for DidNo in the request body
    if (!req.body.DidNo) {
        return next(new CustomError("Please enter the DID NO", 404));
    }

    // Create a new tenant using the TenantRole model
    const CreateTenant = await TenantRole.create({ ...req.body });
    console.log(CreateTenant)

    // Send a successful response with the created tenant data
    res.status(201).json({
        status: "success",
        data: CreateTenant
    });
  
});
