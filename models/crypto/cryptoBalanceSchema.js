const mongoose = require("mongoose");


const cryptoBalanceSchema = mongoose.Schema(
    {
        cryptoAddress: {
            type: String,
            unique: true,
            required: true
        },
        cryptoBalance: {
            type: Number,
            required: true
        },
        owner: {
            type: String,
            ref: "user",
            required: true
        },
        status: {
            type: Boolean,
            default: true,
            required: true
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("cryptoBalance", cryptoBalanceSchema);