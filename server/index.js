require("dotenv").config();

const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const sequelize = require("./db");
const PORT = process.env.PORT || 8081;
const models = require("./models/models");
const cors = require("cors");

const routerUser = require("./routes/User.routes");
const routerMessage = require("./routes/Message.routes");
const routerWs = require("./routes/Ws.routes");
const routerRooms = require("./routes/Rooms.routes");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

app.use(cors());
app.use(express.json());

app.use("/api", routerWs);
app.use("/api", routerUser);
app.use("/api", routerMessage);
app.use("/api", routerRooms);

//Обработка ошибок
app.use(errorHandler);
//console.log(expressWs)
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
