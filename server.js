const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const AllControllers = require('./controllers/MergeAllControllers.js');
const CustomError = require('./utils/CustomError.js');
const AuthRouter = require('./Routes/AuthRouter.js');
const AdminRouter = require('./Routes/AdminRouter.js');
const UserRouter  = require('./Routes/userRoute.js');
const { getIO, initIO } = require('./controllers/sockets/socket.js');
const { createServer } = require('http');
const cors = require('cors');

// Convert binary data into JSON format --> add the req object
server.use(express.json());
server.use(cors());

// Configure the local env file
dotenv.config({ path: './config.env' });



/******************************** Configure the Routes **********************/
/* Auth level Routes */
server.use('/gcm', AuthRouter); /* eg:- ==> /gcm/signup */


/* user level Routes */
server.use('/gcm', UserRouter); /* eg:- ==> /gcm/UpdateUserDetails */


/* Admin level Routes */
server.use('/Admin/GcmDialler', AdminRouter); /* eg:- ==> /gcm/signup */

/* Protected Routes */
/*************************************************************************** */
// Catch-all route for handling unknown routes
server.use('*', (req, res, next) => {
    const error = new CustomError(`Not found URL: ${req.originalUrl} in this server`, 404);
    next(error);
});

// General error-handling middleware
server.use(AllControllers?.GlobalErrorController);



// Ensure that the connection string is correctly set in your environment variables
const connectionStr = process.env.Connection_Str;

// Connect to MongoDB using Mongoose
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Connection to MongoDB failed:', error.message);
    });


const serverReference = server.listen(process.env.PORT||9001, () => {
    console.log("**********************server configrations ******************************")
      console.log(`Server running on port ~ http://localhost:${process.env.PORT}`);
      console.log(`Envirnoment stage ~ ${process.env.NODE_ENV}`)
    console.log("**************************************************************************")
});
/*Handle sockets ==> veido calls */
initIO(server);
getIO();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled rejection: ${err.message}`);
    serverReference.close(() => process.exit(1));
});
