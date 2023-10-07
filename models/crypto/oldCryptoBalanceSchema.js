const mongoose = require("mongoose");


const oldCryptoBalanceSchema = mongoose.Schema(
    {
        cryptoAddress: {
            type: String,
        },
        cryptoBalance: {
            type: Number,
        },
        owner: {
            type: String,
            ref: 'user',
            required: true
        },
        status: {
            type: Boolean,
            default: true,
            required: true
        }
    }, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
}
);

module.exports = mongoose.model("oldcryptoBalance", oldCryptoBalanceSchema);