const jwt = require("jsonwebtoken");
module.exports = function (role) {
  return function (req, res, next) {
    if (req.method == "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; //Bearer kdnfgjsjgndhsdg
      if (!token) {
        return res.status(401).json({ messege: "Пользователь не авторизован" });
      }
      const decoder = jwt.verify(token, process.env.SECRET_KEY);
      if (decoder.role !== role) {
        res.status(403).json({ messege: "Нет доступа" });
      }
      req.user = decoder;
      next();
    } catch (error) {
      res.status(401).json({ messege: "Пользователь не авторизован" });
    }
  };
};
