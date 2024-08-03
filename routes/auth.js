/*
  Rutas de Usuarios / Auth
  host + api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middelwares/validar-campos");
const { validarJWT } = require("../middelwares/validar-jwt");

const router = Router();

const { createUser, login, updateToken } = require("../controllers/auth");

router.post(
  "/new",
  [
    //midelwares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);

router.post(
  "/",
  [
    //midelwares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.get(
  "/renew",
  [
    //midelwares
    validarJWT,
    validarCampos,
  ],
  updateToken
);

module.exports = router;
