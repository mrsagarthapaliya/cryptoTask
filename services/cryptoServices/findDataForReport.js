const oldCryptoBalance = require("../../models/crypto/oldCryptoBalanceSchema");

const findData = async (cryptoAddress) => {
    const findData = await oldCryptoBalance.find(
        {
            cryptoAddress: cryptoAddress,
            status: true,
            createdAt: {
                $lte: date
            }
        }
    ).sort({ createdAt: -1 }).limit(1);

    if (findData.length > 0) {
        return ({
            date: findData[0].createdAt,
            balance: findData[0].cryptoBalance
        });
    }
}

module.exports = findData