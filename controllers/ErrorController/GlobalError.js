
const DevelopmentErrors=require("./DevelpmentErrors.js")
const ProductionErrors=require("./ProductionError.js")
module.exports.GlobalErrorController = (error,req,res,next) => {
      if(process.env.NODE_ENV==="Development") DevelopmentErrors(error,req,res,next)
      else if(process.env.NODE_ENV==="Production") ProductionErrors(error,req,res,next)
}
