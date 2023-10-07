const status = require("http-status-codes");

const errorHandler = (err, req, res, next) => {

    statusCode = 500
    
    if (err instanceof ReferenceError) {
        statusCode = status.INTERNAL_SERVER_ERROR
    }
    
    return res.status(statusCode).json({
        err: err.message
    });
};

module.exports = errorHandler;