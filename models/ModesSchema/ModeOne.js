const mongoose = require('mongoose');
const AllowPermissionsSchema = require('./AllowPermissions');
module.exports= new mongoose.Schema({
  AllowPermissions:{
    type:AllowPermissionsSchema
  }
},{ _id: false });