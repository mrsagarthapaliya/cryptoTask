const cryptoJS = require('crypto-js');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const status = require("http-status-codes")

const user = require("../../models/user/userSchema");


dotenv.config({ path: '../.env' });

const userLogin = async (req, res, next) => {
    try {
        const username = req.body.username.toUpperCase();
        const password = req.body.password;

        if (username && password) {
            const findUser = await user.findOne(
                {
                    username: username
                }
            );

            if (findUser) {
                const decPassword = cryptoJS.AES.decrypt(findUser.password, process.env.SEC_PASS).toString(cryptoJS.enc.Utf8);

                if (decPassword === password) {

                    const token = jwt.sign({
                        id: findUser.id
                    },
                        process.env.SEC_JWT,
                        { expiresIn: '1d' }
                    );

                    await res.cookie("authorization", token, {
                        httpOnly: true
                    })

                    res.render("./homepage", {username: username});

                    // return res.status(status.OK).json({
                    //     message: "Login Success",
                    //     data: {
                    //         username: findUser.username,
                    //         token: token
                    //     }
                    // });

                } else {
                    return res.status(status.UNAUTHORIZED).json({
                        message: "Incorrect Password"
                    });
                }
            } else {
                res.status(404).json({
                    message: "user not found"
                });
            }
        } else {
            res.status(status.BAD_REQUEST).json({
                message: "Please provide both username and password"
            });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = userLogin;