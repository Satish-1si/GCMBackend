module.exports=(err,req,res,next)=>{
    console.log(err,"000000000000000000000000000000000===================================================================")
    res.status(err.statusCode||500).json({
        status : err.status,
        message: err.message,
        stack  : err.stack,
        error  : err,
    });
}