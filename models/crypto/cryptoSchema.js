const mongoose = require("mongoose");


const cryptoSchema = mongoose.Schema(
    {
        cryptoAddress: {
            type: String,
            required: [true, "crypto address is required"],
            valitade: [/^(0x)?[0-9a-fA-F]{40}$/, "please enter a valid ethereum wallet address"]
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

module.exports = mongoose.model("crypto", cryptoSchema);