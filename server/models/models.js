const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, defaultValue: "" },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  //avatar:{type:DataTypes.STRING, defaultValue:''},
  status: { type: DataTypes.BOOLEAN, defaultValue: false },
});
const Chat = sequelize.define("chat", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  //avatar:{type:DataTypes.STRING, defaultValue:''},
});
const Member = sequelize.define("member", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Message = sequelize.define("message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.STRING, allowNull: false },
  //image:{type:DataTypes.STRING,allowNull:false},
});

User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(Member);
Member.belongsTo(User);

Chat.hasMany(Member);
Member.belongsTo(Chat);

Chat.hasMany(Message);
Message.belongsTo(Chat);

Chat.belongsToMany(User, { through: Member });
User.belongsToMany(Chat, { through: Member });

module.exports = {
  User,
  Message,
  Member,
  Chat,
};
