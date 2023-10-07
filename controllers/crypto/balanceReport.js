const status = require("http-status-codes");

const crypto = require("../../models/crypto/cryptoSchema");
const oldCryptoBalance = require("../../models/crypto/oldCryptoBalanceSchema");
const report = require("../../services/cryptoServices/reportService");
const pagination = require("../../services/pagination");

const balanceReport = async (req, res, next) => {
    try {
        const numberOfData = req.query.numberOfData || 4;
        const basedOn = req.params.basedOn;
        const cryptoAddress = req.query.cryptoAddress;

        console.log(cryptoAddress)
        console.log(req.user.id)

        const findCryptoAddress = await crypto.findOne({
            cryptoAddress: cryptoAddress,
            status: true,
            // owner: new ObjectI(req.user.id)
        });


        if (findCryptoAddress && basedOn === "daily" ||
            basedOn === "weekely" || basedOn === "monthly") {
                
            todayData = []
            finalReportData = []
            paginatedData = []

            date = new Date();
            dateFirstHour = new Date()

            const findTodayData = await oldCryptoBalance.find(
                {
                    cryptoAddress: cryptoAddress,
                    status: true,
                    createdAt: {
                        $gte: date,
                        $lte: date
                    }
                }
            ).sort({ createdAt: -1 }).limit(1);

            if (findTodayData.length > 0) {
                todayData.push({
                    date: findTodayData[0].createdAt,
                    balance: findTodayData[0].cryptoBalance
                });
            }

            const previousData = await report(numberOfData, cryptoAddress, basedOn);
            if (previousData) {
                finalReportData = todayData.concat(previousData);
                paginatedData = await pagination(req, finalReportData);
            } else {
                finalReportData = todayData;
                paginatedData = await pagination(req, finalReportData);
            }

            const data = JSON.stringify(paginatedData);
            console.log(data)

            res.render("./ejs/crypto/cryptoBalanceReport", { cryptoAddress: cryptoAddress, basedOn: basedOn, data: data });
            
            // res.status(status.OK).json({
            //     Report: paginatedData
            // });
        } else if (basedOn != ("daily" || "weekely" || "monthly")) {
            res.status(status.BAD_REQUEST).json({
                message: "BAD REQUEST"
            });
        } else {
            return res.status(status.NOT_FOUND).json({
                message: "address not found in your database"
            });
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = balanceReport