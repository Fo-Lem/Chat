const Router = require("express");
const router = new Router();
const UserController = require("../controllers/User.controller");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkMiddleware"); //Проверка на админа

router.post("/user/registration", UserController.registration);
router.post("/user/login", UserController.authorization);
router.get("/user/auth", authMiddleware, UserController.check); //вставить как тут

module.exports = router;
