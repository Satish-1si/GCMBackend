
const DevelopmentErrors=require("./DevelpmentErrors.js")
const ProductionErrors=require("./ProductionError.js")
module.exports.GlobalErrorController = (error,req,res,next) => {
      console.log("Error NODE_ENV Matched :-",process.env.NODE_ENV==="Development")
      console.log("error occur in :-","Development")
      console.log(error)


      if(process.env.NODE_ENV==="Development") DevelopmentErrors(error,req,res,next)
      else if(process.env.NODE_ENV==="Production") ProductionErrors(error,req,res,next)
}
