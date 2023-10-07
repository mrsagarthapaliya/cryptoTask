const oldCryptoBalance = require("../../models/crypto/oldCryptoBalanceSchema");


const findLatestBalance = async (req) => {

    const cryptoAddress = req.query.cryptoAddress;

    const dateNow = new Date();

    const findLatestData = await oldCryptoBalance.find(
        {
            cryptoAddress: cryptoAddress,
            createdAt: { $lte: dateNow }
        }
    ).sort({ createdAt: -1 }).limit(1);

    if (findLatestData.length > 0) {

        const latestBalance = await findLatestData[0].cryptoBalance;    
        return latestBalance;

    } else {
        return 0;
    }

}

const findBalanceToCompare = async (req) => {

    const cryptoAddress = req.query.cryptoAddress;
    const basedOn = req.params.basedOn;

    const date = new Date();

    if (basedOn == "daily") {
        date.setHours(date.getHours() - 24);

    } else if (basedOn == "weekely") {
        date.setDate(date.getDate() - 7);

    } else if (basedOn == "montlhy") {
        date.setMonth(date.getMonth() - 1);
    }
    
    const findDataToCompare = await oldCryptoBalance.find(
        {
            cryptoAddress: cryptoAddress,
            createdAt: { $lte: date }
        }
    ).sort({ createdAt: -1 }).limit(1);

    if (findDataToCompare.length > 0) {

        const balanceToCompare = await findDataToCompare[0].cryptoBalance;
        return balanceToCompare;
        
    } else {
        return 0;
    }    
}

const calculateBalance = async (req, res) => {

    const latestBalance = await findLatestBalance(req);
    const balanceToCompare = await findBalanceToCompare(req);
    
    const balanceChangeAmount = latestBalance - balanceToCompare;
    const balanceChangePercentage = (balanceChangeAmount / balanceToCompare * 100);

    res.status(200).json({
        cryptoAddress: req.query.cryptoAddress,
        latestBalance: latestBalance,
        balanceToCompare: balanceToCompare,
        balanceChangeAmount: balanceChangeAmount,
        balanceChangePercentage: balanceChangePercentage
    });
}

module.exports = calculateBalance