const mongoose = require('mongoose');

module.exports= new mongoose.Schema({
  OTP: {
    type: String,
    default: null,
    select: false
  },
  OTPCreateAt: {
    type: Date,
    default:new Date(), // Function to set the default to the current date
    select: false
  }
},{ _id: false });

