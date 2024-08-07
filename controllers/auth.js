const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con este email",
      });
    }

    user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generar JWT
    const token = await generarJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacta con el administrador",
    });
  }
};

const login = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("find a user login in DB");
    console.log(user);

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "el usuario no existe con ese email",
      });
    }

    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password incorrecto",
      });
    }

    //Generar JWT
    const token = await generarJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacta con el administrador",
    });
  }
};

const updateToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  try {
    //Generar un nuevo JWT y retornarlo en esta petición
    const token = await generarJWT(uid, name);

    res.json({
      ok: true,
      uid,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, contacta con el administrador",
    });
  }
};

module.exports = {
  createUser,
  login,
  updateToken,
};
