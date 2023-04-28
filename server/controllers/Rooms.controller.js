const Sequelize = require("../db");
const Model = require("../models/models");

class RoomsController {
  async getRooms(req, res) {
    const data = req.query;
    let userId=data.userId
    let limit = data.limit || 20;
    let offset = data.offset || 0;
    let Rooms = await Model.Member.findAndCountAll({
      attributes: ["chatId","userId"],
      
      include: {
        model: Model.Chat,
        attributes: ["name", "id"],
        required: true,
        include: {
          model: Model.User,
          attributes: ["name", "id"],
          required: true,
          
        },
      },
      where: {
        userId: userId,
      },

      offset,
      limit,
    });
    //console.log(Rooms)
    return res.json(Rooms);
  }
  async createRooms(req, res) {
    const { name, userId } = req.body;
    const newChat = await Model.Chat.create({ name, userId });
    res.json(newChat);
  }

  async subscribeRooms(req, res) {
    const { userId, chatId } = req.body;
    const Rooms = await Model.Member.create({ userId, chatId });
    res.json(Rooms);
  }
  async unsubscribeRooms(req, res) {
    // const { userId, chatId } = req.body;
    // const Rooms = await Model.Member.create({ userId, chatId });
     res.json(req);
  }
  async deleteRooms(req, res) {
    // const id= req.params.id
    // const User =await db.query(`DELETE* FROM public.users where id=$1`,[id])
    res.json(req);
  }
}
module.exports = new RoomsController();
