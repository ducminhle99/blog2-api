const router = require("express").Router();
const userCtrl = require("../controllers/userController")

router.get("/:id", userCtrl.get)
    .get("/", userCtrl.getByUserName)
    .put("/:id", userCtrl.update)
    .delete("/:id", userCtrl.delete)


module.exports = router;