
const mongoose = require('mongoose');
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
        }
    
},{ _id: false });


