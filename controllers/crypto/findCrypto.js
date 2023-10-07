const status = require("http-status-codes");

const crypto = require("../../models/crypto/cryptoSchema");
const findBalance = require("../../services/cryptoServices/findBalance");
const pagination = require("../../services/pagination")

const findCrypto = async (req, res, next) => {
    try {
        const owner = req.user.id

        const findCrypto = await crypto.find({
            owner: owner,
            status: true
            });

        if (findCrypto.length > 0) {
            const getCryptoBalanceData = await pagination(req, findCrypto);

            var data = [];

            for (const crypto of getCryptoBalanceData) {
                const balance = await findBalance(crypto.cryptoAddress); //ask if balance should be retrieved from database or with axios

                const cryptoData = {
                    cryptoAddress: crypto.cryptoAddress,
                    recentBalance: balance,
                    owner: owner
                }
                data.push(cryptoData);
            };

            const dataToPass = JSON.stringify(data);
            res.render("./ejs/crypto/getCryptoAddresses", { data: dataToPass });

            // return res.status(status.OK).json({
            //     data: data
            // });

        } else {
            res.status(status.NOT_FOUND).json({
                message: `Records not found`
            });
        }    
    } catch (err) {
        next(err)
    }   
}

module.exports = findCrypto;