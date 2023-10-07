const errorHandler = require("../middlewares/errorHandler");


const paginateData = async (req, data) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;
        const startIndex = skip;
        const endIndex = page * limit;

        return await data.slice(startIndex, endIndex);
        
    } catch (err) {
        console.log(err);
        errorHandler(err);
    }
}

module.exports = paginateData