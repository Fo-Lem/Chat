const WebSocketController = require("../controllers/WebSocket.controller");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.ws("/ws/subscribe", WebSocketController.subscribe);

module.exports = router;
