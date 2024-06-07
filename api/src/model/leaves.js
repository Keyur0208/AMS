const mongoose = require("mongoose");
const userModel = require('./user');

const Leaves = new mongoose.Schema({
    mention:{
        type:String,
        default:"Sulok_admin"
    },
    leave_date:{
        type:String,
        default:null,
    },
    reason_name:{
        type:"string",
        default:null
    },
    reason_des:{
        type:"string",
        default:null
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
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
        default:null
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

const leaveModel = new mongoose.model("leaves",Leaves);

module.exports = leaveModel;