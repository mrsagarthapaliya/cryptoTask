const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: '../.env' });

const findBalance = async (cryptoAddress) => {
    const response = await axios.get(
        process.env.BSCSCAN_API_URL,
        {
            params: {
                module: "account",
                action: "balance",
                address: cryptoAddress,
                apiKey: process.env.BSCSCAN_API_KEY
            }
        }
    );

    const balance = response.data.result;

    return balance
}

module.exports = findBalance;