const Express=require("express");
const server=Express();
const envpackage=require("dotenv");
const mongoose=require("mongoose");
const AllControllers=require("./controllers/MergeAllControllers.js")
const CustomError=require("./utils/CustomError.js")
const AuthRouter=require("./Routes/AuthRouter.js")
const AdminRouter=require("./Routes/AdminRouter.js")
const cors = require('cors');

//convert binary data into json format --> add the req object
server.use(Express.json());
server.use(cors())

//config the our local env file :-
envpackage.config({path:"./config.env"})

/********************************configure the Routes**********************/
/*Auth level Routes */
server.use("/gcm",AuthRouter) /* eg:- ==> /gcm/signup */

/*Admin level Routes */
server.use("/Admin/GcmDialler",AdminRouter) /* eg:- ==> /gcm/signup */

/*protected Routes */

/*************************************************************************** */
//at any Error will come first Route --> auto hit 
server.use("*",(req,res,next)=>{
         const error = new CustomError(`Not found URL: ${req.originalUrl} in this server`,404);
         next(error)
})

//General error-handling middleware :-
server.use(AllControllers?.GlobalErrorController);

// Ensure that the connection string is correctly set in your environment variables :-
const connectionStr = process.env.Connection_Str;

// Connect to MongoDB using Mongoose :-
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Connection to MongoDB failed:", error.message);
    });
//start the server using env varibles :-
const EnvData=process.env 
if(EnvData.Node_Environment==="Development"){
    //listen the server
      const serverReference= server.listen(EnvData.PORT,()=>{
         console.log(`server loading : ${EnvData.PORT}`)
     })
     process.on("unhandleRejection",(err)=>{
        console.log(err.message,err.name)
        console.log(`unhandle rejection occur!shutting down`)
        serverReference.close(()=>process.exit(1))
  })

}













