let mongoose = require('mongoose');
const userModel = require('./user');

const Events = new mongoose.Schema({

    event_date:{
        type:String,
        default:null,
    },
    event_name:{
        type:String,
        default:null
    },
    event_des:{
        type:String,
        default:null
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel ,
        required: true
    },
    first_name:{
        type:String,
        default:null
    },
    last_name:{
        type:String,
        default:null
    },
    roles:{
        type:[String],
        default:['admin']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at:{
        type:Date,
        default:null
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

const eventModel = new mongoose.model("events",Events);

module.exports = eventModel;