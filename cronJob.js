const cron = require("node-cron");
const dotenv = require("dotenv")

const dbConnect = require("./dbConnect");
const cryptoBalance = require("./models/crypto/cryptoBalanceSchema");
const oldCryptoBalance = require("./models/crypto/oldCryptoBalanceSchema");
const crypto = require("./models/crypto/cryptoSchema");
const findBalance = require("./services/cryptoServices/findBalance");

dotenv.config({ path: '../.env' });

dbConnect();

let i = 1

const balanceJob = async () => {

    try {
        const findCryptoAddress = await crypto.find();

        for (const crypto of findCryptoAddress) {

            const cryptoAddress = crypto.cryptoAddress;

            //to fetch new balance data available with wallet address
            const balance = await findBalance(cryptoAddress);
            // console.log(balance);

            // to transfer wallet data data to another collection before update and then update balance
            const findCryptoBalance = await cryptoBalance.findOne({ cryptoAddress: cryptoAddress });

            if (findCryptoBalance) {
                const { _id, createdAt, updatedAt, __v, ...others } = findCryptoBalance._doc;
                const balanceChangeAmount = balance - findCryptoBalance._doc.cryptoBalance;
                const balanceChangePercentage = (balanceChangeAmount / findCryptoBalance._doc.cryptoBalance) * 100;

                const saveOldCryptoBalance = new oldCryptoBalance({
                    ...others,
                    balanceChangeAmount,
                    balanceChangePercentage
                });
                await saveOldCryptoBalance.save()
                    .then(await cryptoBalance.updateOne( //to update existing wallet account
                        {
                            cryptoAddress: cryptoAddress
                        },
                        {
                            $set: { cryptoBalance: balance }
                        }
                    ));
            } else {
                const { _id, createdAt, updatedAt, __v, ...others } = crypto._doc;

                const saveCryptoBalance = new cryptoBalance({
                    ...others,
                    cryptoBalance: balance
                });
                await saveCryptoBalance.save();
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const cronJob = cron.schedule("*/5 * * * * *", async () => {
    console.log("cron start: " + i)
    await balanceJob()
        .then(() => {
            console.log("success");
        })
        .catch(() => {
            console.log("failed");
        });
    i++;
});

cronJob.start();