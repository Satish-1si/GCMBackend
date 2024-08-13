
const GetErrorMessage=(err)=>{
    if(err.code===11000){
        return "Duplicate key Error !!!"
    }
    else{
        return err.message
    }
     
}
module.exports=(err,req,res,next)=>{
    const ErrorMsg=GetErrorMessage(err) 
    res.status(err.statusCode||404).json({
        status : err.status,
        message: ErrorMsg,
        stack  : err.stack,
        error  : err,
    });
}