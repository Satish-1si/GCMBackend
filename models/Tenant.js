const mongoose = require('mongoose');

const TenentRoleSchema=new mongoose.Schema({
    TenentRole:{
        type:String,
        required:[true,"Tenent Role required !!!"],
        unique:true
    },
    DidNo:{
        type:Number,
        required:[true,"Did NO required !!!"]
    }
})
const TenentRoleModel=mongoose.model("TenentRoles",TenentRoleSchema)
module.exports=TenentRoleModel;
