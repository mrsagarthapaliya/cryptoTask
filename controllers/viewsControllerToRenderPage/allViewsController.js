const registerViews = async (req, res) => {
    res.render("./ejs/user/userRegister");
}

const loginViews = async (req, res) => {
    res.render("./ejs/user/userLogin");
}

const homepageViews = async (req, res) => {
    res.render("./homepage");
}

const balanceReportViews = async (req, res) => {
    res.render("./ejs/crypto/cryptoBalanceReport");
}

const findAddressesViews = async (req, res) => {
    res.render("./ejs/crypto/getCryptoAddresses");
}

module.exports = { registerViews, loginViews, homepageViews, balanceReportViews, findAddressesViews }