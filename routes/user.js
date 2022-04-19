const router = require("express").Router();
const { UserController } = require("../controllers/User");
const ctrl = new UserController();

router.post("/user", ctrl.insert);
router.get("/user/:id", ctrl.get);
router.get("/user", ctrl.getAll);
router.put("/user/:id", ctrl.update);
router.delete("/user/:id", ctrl.delete);

module.exports = router;
