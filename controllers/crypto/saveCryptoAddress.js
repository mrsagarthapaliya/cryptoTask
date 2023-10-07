const status = require("http-status-codes");

const crypto = require("../../models/crypto/cryptoSchema");
const cryptoBalance = require("../../models/crypto/cryptoBalanceSchema");

const saveCrypto = async (req, res, next) => {
    try {
        const cryptoAddress = await req.body.cryptoAddress;
        const owner = await req.user.id;

        //saving cryptoAddress Data to the collection if not exist
        const findCryptoAddress = await crypto.findOne({
            cryptoAddress: cryptoAddress,
            owner: owner
        });

        if (!findCryptoAddress) {
            const newCryptoAddress = await new crypto({
                cryptoAddress: cryptoAddress,
                owner: owner
            });

            const saveCryptoAddress = await newCryptoAddress.save();

            return res.status(status.OK).json({
                message: "crypto Address saved successfully",
                data: saveCryptoAddress
            });
        } else if (findCryptoAddress.status ) {
            const saveCryptoAddress = await crypto.findByIdAndUpdate(
                findCryptoAddress.id,
                {
                    $set: { status: true }
                },
                { new: true }
            );

            return res.status(status.OK).json({
                message: "crypto Address saved successfully",
                data: saveCryptoAddress
            });
        } else {
            res.status(status.CONFLICT).json({
                message: "Crypto Address already exists"
            });
        }
    } catch (err) {
        next(err)
    }
}


module.exports = saveCrypto;