class customError extends Error{
    constructor(ErrorMsg,StatusCode){
           super(ErrorMsg);
           this.statusCode = StatusCode;
           this.status =(StatusCode >= 400 && StatusCode < 500) ? "ClientSide_error" : "ServerSide_error ";
           this.isOperational = true;
           this.name =this.constructor.name
           Error.captureStackTrace(this, this.constructor);
    }
}
module.exports=customError