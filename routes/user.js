const router = require("express").Router();
const UserController = require("../controllers/User");
const ctrl = new UserController();

router.route("/user").post(ctrl.insert);

module.exports = router;
