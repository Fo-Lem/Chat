const Router = require("express");
const router = new Router();
const RoomsController = require("../controllers/Rooms.controller");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkMiddleware"); //Проверка на админа

router.get("/room/get", authMiddleware, RoomsController.getRooms);
router.post("/room/create", authMiddleware, RoomsController.createRooms);
router.post("/room/subscribe", authMiddleware, RoomsController.subscribeRooms);
router.post("/room/unsubscribe", authMiddleware, RoomsController.unsubscribeRooms);
router.delete("/room/delete:id", authMiddleware, RoomsController.deleteRooms);

module.exports = router;
