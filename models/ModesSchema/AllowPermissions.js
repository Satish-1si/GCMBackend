
const mongoose = require('mongoose');

const STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
  };

module.exports= new mongoose.Schema({
        AudioCalls:{
            type:Boolean,
            default:false
        },
        AudioConference:{
            type:Boolean,
            default:false
        },
        GsmCalls:{
            type:Boolean,
            default:false
        },
        VideoCalls:{
            type:Boolean,
            default:false
        },
        Status: {
            type: String,
            enum: [STATUS.ACTIVE, STATUS.INACTIVE, STATUS.PENDING],
            default: STATUS.PENDING
        }
    
},{ _id: false });


