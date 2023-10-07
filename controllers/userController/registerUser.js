const cryptoJS = require('crypto-js');
const dotenv = require("dotenv");

const user = require("../../models/user/userSchema");
const validatePassword = require("../../services/userServices/validatePassword");
const status = require('http-status-codes');

dotenv.config({ path: '../.env' });

const registerUser = async (req, res, next) => {
    try {
        const username = req.body.username.toUpperCase();
        const password = req.body.password;

        const validationResult = validatePassword(password);

        if (password.length >= 8) {
            if (validationResult) {
                const encPassword = cryptoJS.AES.encrypt(password, process.env.SEC_PASS).toString();

                const findUser = await user.findOne({
                    username: username
                });

                if (!findUser) {
                    const newUser = new user(
                        {
                            username: username,
                            password: encPassword
                        }
                    );
                    const savedUser = await newUser.save();

                    res.render("../views/ejs/user/userLogin");

                    return res.status(status.OK).json({
                        message: "new user created successfully",
                        data: savedUser
                    });

                } else {
                    return res.status(status.CONFLICT).json({
                        message: "The username already exists"
                    });
                }
            } else {
                return res.status(status.UNPROCESSABLE_ENTITY).json({
                    message: "Password must contain at least one Uppercase, one lowercase, one number and one special character"
                });
            }
        } else {
            return res.status(status.UNPROCESSABLE_ENTITY).json({
                message: "Password must contain at least 8 characters"
            });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = registerUser;