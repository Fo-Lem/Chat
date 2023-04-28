const Sequelize = require("../db");
const Model = require("../models/models");

class MessageController {
  async getMessage(req, res) {
    const data = req.query;
    let limit = data.limit || 20;
    let offset = data.offset || 0;
    let Messages = await Model.Message.findAndCountAll({
      attributes: ["id", "type", "body", "createdAt", "chatId"],

      include: {
        model: Model.User,
        attributes: ["name", "id"],
        required: true,
      },
      where: {
        chatId: data.chatId,
      },
      offset,
      limit,
    });

    //console.log(Messages)
    return res.json(Messages);
  }
  async createMessage(req, res) {
    const { type, body, userId, chatId } = req.body;
    const newMessage = await Model.Message.create({
      type,
      body,
      userId,
      chatId,
    });
    res.json(newMessage);
  }

  async update(req, res) {
    const { id, title, body } = req.body;
    const newMessage = await Model.Message.update({ id, title, body });
    res.json(newMessage);
  }
  async delete(req, res) {
    // const id= req.params.id
    // const User =await db.query(`DELETE* FROM public.users where id=$1`,[id])
    // res.json(User.rows[0])
  }
}
module.exports = new MessageController();
