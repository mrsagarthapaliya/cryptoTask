const status = require("http-status-codes");

const crypto = require("../../models/crypto/cryptoSchema");
const findBalance = require("../../services/cryptoServices/findBalance");

const fetchCryptoBalance = async (req, res, next) => {
    try {
        const cryptoAddress = req.query.cryptoAddress;
        const owner = req.user.id

        const findCrypto = await crypto.findOne(
            {
                cryptoAddress: cryptoAddress,
                owner: owner,
                status: true
            });

        if (findCrypto) {
            const balance = await findBalance(cryptoAddress);

            res.status(status.OK).json({
                cryptoAddress: cryptoAddress,
                currentBalance: balance,
                owner: owner
            });
        } else {
            res.status(status.NOT_FOUND).json({
                message: `""${cryptoAddress}" is not available in your database`
            });
        }   
    } catch (err) {
        next(err)
    }      
}

module.exports = fetchCryptoBalance;