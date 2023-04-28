const sequelize = require("../db");
const MessageController = require("../controllers/Message.controller");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.get("/message/get", authMiddleware, MessageController.getMessage);
router.post("/message/create", authMiddleware, MessageController.createMessage);
router.delete("/message/delete/:id", authMiddleware, MessageController.delete);

module.exports = router;
