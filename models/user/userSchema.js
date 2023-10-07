const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        minlength: 5,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = mongoose.model("user", userSchema);
