const router = require("express").Router();

const registerUser = require("../controllers/userController/registerUser");
const userLogin = require("../controllers/userController/userLogin");
const { loginViews, registerViews } = require("../controllers/viewsControllerToRenderPage/allViewsController");

//register new user

router.get("/register", registerViews);

router.post("/register", registerUser);

//login user
router.get("/login", loginViews);

router.post("/login", userLogin);

module.exports = router;