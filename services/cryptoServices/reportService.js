const findData = require("./findDataForReport");

const report = async (numberOfData, cryptoAddress, basedOn) => {

    data = [];
    if (basedOn == "daily") {
        for (i = 1; i < numberOfData; i++) {
            date.setDate(date.getDate() - 1); // make it end of the day
            date.setHours(23, 59, 59, 999);

            const findPrevioursdata = await findData(cryptoAddress);

            if (findPrevioursdata) {
                data.push(findPrevioursdata)
            }
        }
    } else if (basedOn == "weekely") {
        for (i = 1; i < numberOfData; i++) {
            date.setDate(date.getDate() - date.getDay() - 1); // make it end of the day
            date.setHours(23, 59, 59, 999);

            const findPrevioursdata = await findData(cryptoAddress);

            if (findPrevioursdata) {
                data.push(findPrevioursdata)
            }
        }
    } else {
        for (i = 1; i < numberOfData; i++) {
            date.setMonth(date.getMonth(), 1);
            date.setDate(date.getDate() - 1);
            date.setHours(23, 59, 59, 999);

            const findPrevioursdata = await findData(cryptoAddress);

            if (findPrevioursdata) {
                data.push(findPrevioursdata)
            }
        }
    }
    return data;
}

module.exports = report