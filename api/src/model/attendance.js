let mongoose = require('mongoose');
const userModel = require('./user');

const Attendance = new mongoose.Schema({

    date: {
        type: String,
        default: null,
    },
    check_in: {
        type: String,
        default: null
    },
    check_out: {
        type: String,
        default: null
    },
    break_on: {
        type: String,
        default: "0:00"
    },
    break_end: {
        type: String,
        default: "0:00"
    },
    total_work: {
        type: String,
        default: null
    },
    total_break: {
        type: String,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    roles:{
        type:[String],
        default:null
    },
    first_name: {
        type: String,
        default:null
    },
    last_name:{
        type: String,
        default:null
    }
})

const attendanceModel = new mongoose.model("attendance", Attendance);

module.exports = attendanceModel;