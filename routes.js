const router = require("express").Router();

const user = require("./routes/user");
const crypto = require("./routes/crypto");
const verify = require("./middlewares/verify");

router.use("/user", user);
router.use("/crypto", verify.verifyToken, crypto);

router.get("/", (req, res) => {
    return res.send("This is cryptoTask");
});

module.exports = router;