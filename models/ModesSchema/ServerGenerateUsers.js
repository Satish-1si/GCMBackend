const mongoose = require('mongoose');
const AllowPermissionsSchema = require('./AllowPermissions');

const ModeTWOUsersSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    select:false,
    validate: {
      validator: function (msg) {
        return /^[a-z0-9.]+@gmail.com$/.test(msg);
      },
      message: "Please enter a valid Gmail address"
    }
  },
  username: { type: String, required: true },
  PhoneNumber: { type: String},
  ExtensionNo: {//system generated backend user ExtensionNo
    type: Number,
    unique:true,
    required: [true, "ExtensionNo required!!!"]
  },
  AllowPermissions: {
    type: AllowPermissionsSchema
  }
});

const ModeTwoUsers = mongoose.model("ServerGenerateUsers", ModeTWOUsersSchema);
module.exports = ModeTwoUsers;

