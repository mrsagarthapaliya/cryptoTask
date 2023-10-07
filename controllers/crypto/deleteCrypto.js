const status = require("http-status-codes");

const crypto = require("../../models/crypto/cryptoSchema");
const cryptoBalance = require("../../models/crypto/cryptoBalanceSchema");
const oldCryptoBalance = require("../../models/crypto/oldCryptoBalanceSchema");

const deleteCrypto = async (req, res, next) => {
    try {
        const cryptoAddress = req.query.cryptoAddress;
        const owner = req.user.id;

        if (!cryptoAddress) return res.status(status.BAD_REQUEST)
            .json({ message: "provide data to delete" })

        const findCrypto = await crypto.findOne({
            cryptoAddress: cryptoAddress,
            owner: owner,
            status: true
        });

        if (findCrypto) {
            const deleteFromCrypto = await crypto.findByIdAndUpdate(
                findCrypto.id,
                {
                    $set: { status: false }
                }
            );
            const deleteFromCryptoBalance = await cryptoBalance.updateOne(
                {
                    cryptoAddress: cryptoAddress,
                    owner: owner,
                    status: true
                },
                {
                    $set: { status: false }
                }
            );
            const deleteFromOldCryptoBalance = await oldCryptoBalance.updateOne(
                {
                    cryptoAddress: cryptoAddress,
                    owner: owner,
                    status: true
                },
                {
                    $set: { status: false }
                }
            );

            await Promise.all([
                deleteFromCrypto,
                deleteFromCryptoBalance,
                deleteFromOldCryptoBalance
            ]);

            res.status(status.OK).json({
                message: `your crypto address ${cryptoAddress} has been deleted successfully`
            });
        } else {
            res.status(status.NOT_FOUND).json({
                message: `crypto address ${cryptoAddress} is not found in your database`
            });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = deleteCrypto;