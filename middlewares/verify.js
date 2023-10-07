const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

const verifyToken = (req, res, next) => {

    const authorization = req.headers.cookie.split("=") || "";
    const token = authorization[authorization.length -1];
    // console.log(req.headers);

    if (token) {
        jwt.verify(token, process.env.SEC_JWT, (err, user) => {

            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'Token missing' });
    }

}

module.exports = { verifyToken }