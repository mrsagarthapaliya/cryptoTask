const router = require("express").Router();

const saveCrypto = require("../controllers/crypto/saveCryptoAddress");
const findCrypto = require("../controllers/crypto/findCrypto");
const deleteCrypto = require("../controllers/crypto/deleteCrypto");
const fetchCryptoBalance = require("../controllers/crypto/fetchCryptoBalance");
const balanceReport = require("../controllers/crypto/balanceReport");


//add new Crypto Address and balance in it
router.post("/addCrypto", saveCrypto);

//get CryptoAddresses
router.get("/findCrypto", findCrypto);

//delete CryptoAddress
router.patch('/deleteCrypto', deleteCrypto);

//fetch crypto Balance
router.get("/fetchBalance", fetchCryptoBalance);

//calculate balance change daily, weekly and monthly basis
router.get('/balanceReport/:basedOn', balanceReport);

module.exports = router;