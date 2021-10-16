const router = require("express").Router();
const postCtrl = require("../controllers/postController")

router.post("/", postCtrl.create)
    .put("/:id", postCtrl.update)
    .delete("/:id", postCtrl.delete)
    .get("/:id", postCtrl.getPost)
    .get("/", postCtrl.getAllPost)

module.exports = router;