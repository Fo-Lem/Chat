const Sequelize = require("../db");
const Model = require("../models/models");

// подключённые клиенты
const clients = {};
let subscribes;

function groupBy(array) {
  return array.reduce((acc, obj) => {
    const property = obj.dataValues.chatId;
    acc[property] = acc[property] || [];
    acc[property].push(obj.dataValues.userId);
    return acc;
  }, {});
}

async function subscribListing() {
  subscribes = await Model.Member.findAll({
    attributes: ["id", "userId", "chatId"],
  });
  subscribes = groupBy(subscribes);

  console.log(subscribes);
}
subscribListing();

async function createRoom(msg) {
  subscribes[msg.chatId] = [];
  subscribes[msg.chatId].push(msg.userId);
  console.log(subscribes);
}

async function deleteRoom(msg) {
  delete subscribes[msg.chatId];

  console.log(subscribes);
}

async function subscribe(msg) {
  //subscribes[msg.chatId] = subscribes[msg.chatId] || [];
  subscribes[msg.chatId].push(msg.userId);
  console.log(msg);
}

async function unsubscribe(msg) {
  subscribes[msg.chatId] = subscribes[msg.chatId].filter(
    (userId) => userId !== msg.userId
  );
  console.log(subscribes);
}

function clientListing(ws, id) {
  ws["id"] = id;
  clients[id] = ws;
  console.log("клиенты: " + Object.keys(clients));
  //console.log(clients)
}

function sendMessage(msg) {

  for (let client of subscribes[msg.chatId]) {
    if (clients[client]) {
      clients[client].send(JSON.stringify(msg));
    }
  }
}

class WebSocketController {
  subscribe(ws, req) {
    ws.send(JSON.stringify(
      {
          msg:"connection"
      }
  ));

    //console.log("Новое соединение " + clients[id]);
    var id;
    ws.on("message", (msg) => {
      msg = JSON.parse(msg);

      switch (msg.method) {
        case "connection":
          id = msg.userId;
          clientListing(ws, id);
          break;

        case "message":
          sendMessage(msg);
          break;
        
        case "create":
          createRoom(msg);
          break;
        
        case "delete":
          deleteRoom(msg);
          break;

        case "subscribe":
          subscribe(msg);
          break;

        case "unsubscribe":
          unsubscribe(msg);
          break;
      }
    });

    ws.on("close", (ws) => {
      console.log("Соединение " + id + " разорванно");

      delete clients[id];
      console.log(Object.keys(clients));
    });

    ws.on("error", (e) => ws.send(e));
  }
}
module.exports = new WebSocketController();
