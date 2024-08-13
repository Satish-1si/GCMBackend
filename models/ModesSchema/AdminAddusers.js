const mongoose = require('mongoose');
const AllowPermissionsSchema = require('./AllowPermissions');

const AdminAddUsersSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: function (msg) {
        return /^[a-z0-9.]+@gmail.com$/.test(msg);
      },
      message: "Please enter a valid Gmail address"
    }
  },
  username: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  ExtensionNo: {
    type: Number,
    default: null,
    required: [true, "ExtensionNo required!!!"]
  },
  password: {
    type: String,
    required: [true, "Password required!!!"]
  },
  conformPassword: {
    type: String,
    required: [true, "Confirm Password required!!!"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match"
    }
  },
  CreateBy: {
    type: String,
    required: [true, "CreateBy required!!!"]
  },
  UpdatedBy: {
    type: String
  },
  AllowPermissions: {
    type: AllowPermissionsSchema
  }
}, { timestamps: true });

const AdminAddUsers = mongoose.model("ModeTwo", AdminAddUsersSchema);
module.exports = AdminAddUsers;

