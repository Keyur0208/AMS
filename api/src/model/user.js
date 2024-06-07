let mongoose = require("mongoose"); 

const User = new mongoose.Schema({

    first_name: {
        type: String,
        default: null,
    },
    last_name: {
        type: String,
        default: null
    },
    profile_image: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    roles: {
        type: [String],
        enum: ['admin', 'employee', 'intern'],
        default: ['intern'],
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    },
    is_actived: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

const userModel = new mongoose.model("user", User);

module.exports = userModel;
