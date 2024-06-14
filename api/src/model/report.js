let mongoose = require("mongoose");
let attendance = require("./attendance");

const reportRecordSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    result: {
        type: String,
        enum: ['P', 'A'],
        default: 'A'
    },
    roles:{
        type:[String],
        default:null
    },
    attendance_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance',
        required: true
    }
});

const Report = new mongoose.Schema({
    report_date: {
        type: String,
        default: null
    },
    report_record: [reportRecordSchema]
});

const reportModel = new mongoose.model("report", Report);

module.exports = reportModel;
