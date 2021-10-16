const router = require("express").Router();
const categoryCtrl = require("../controllers/categoryController")

router.post("/", categoryCtrl.create)
    .get("/", categoryCtrl.getAll)

module.exports = router;
