const mongoose = require('mongoose');
const AllowPermissionsSchema = require('./AllowPermissions');
module.exports= new mongoose.Schema({
  ExtensionNo: {
    type: Number,
    default:null,
    // required:[true,"ExtensionNo required !!!"] ,
  },
  Password: {
    type: String,
    default:null,
    // required:[true,"Password required !!!"] ,
  },
  AllowPermissions:{
    type:AllowPermissionsSchema
  }
},{ _id: false });
