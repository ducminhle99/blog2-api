const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authCtrl = require("../controllers/authController")

router.post("/register", authCtrl.register)
    .post("/login", authCtrl.login)

module.exports = router;