const db = require("../db");
const ApiError = require("../error/ApiError");
const { User, Message } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generatejwt = (id, name, surname, role) => {
  return jwt.sign({ id, name, surname, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, name, surname, password, role } = req.body;
    if (!email || !password || !name) {
      return next(ApiError.bedRequest("Некоректный Email или passworn"));
    }
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(
        ApiError.bedRequest("Пользователь с таким Email уже существует")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({email,name,surname,password: hashPassword,role,});

    const token = generatejwt(newUser.id,newUser.name,newUser.surname,newUser.role);

    res.json({ token });

  }

  async authorization(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      //res.json('Пользователь не найден')
      return next(ApiError.bedRequest("Пользователь не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      //res.json('Указан неверный пароль')
      return next(ApiError.bedRequest("Указан неверный пароль"));
    }
    const token = generatejwt(user.id, user.name, user.surname, user.role);
    res.json({ token });
  }

  async check(req, res, next) {
    
    const token = generatejwt(req.user.id,req.user.name,req.user.surname,req.user.role);

    return res.json({ token });
  }

  // async update(req,res) {
  //     const {email,name,surname,password}=req.body
  //     const newUser =await User.update({email,name,surname,password})
  //     res.json(newUser)

  // }
  // async delete(req,res) {
  //     const id= req.params.id
  //     const newUser =await User.destroy({id})
  //     res.json(newUser)

  // }
}
module.exports = new UserController();
