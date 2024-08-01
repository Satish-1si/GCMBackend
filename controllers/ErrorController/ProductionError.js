let CustomError=require("../../utils/CustomError")
module.exports=(err,req,res,next)=>{
       if(err.isOperational===true){
           res.status(err.statusCode).json({
                status:err.status,//code err
                message:err.message//proper error explain
           })
       }
       if(err.name==="MongoServerError"){
              let ServerError = { ...err };
              let error=(new CustomError( ServerError.errorResponse.errmsg ,404))
              res.status(error.statusCode).json({
                status:error.status,//code err
                message:error.message//proper error explain
              })
       }
}
