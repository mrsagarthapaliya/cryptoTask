const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: './.env' });

const dbConnect = async () => {
    await mongoose
        .connect(process.env.MONGO_URL)
        .then(() =>
            console.log("Connected to database"))
        .catch((err) =>
            console.log("error while connecting to database ===> " + err));    
}

module.exports = dbConnect;