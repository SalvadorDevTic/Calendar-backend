/*
  Rutas de eventos / events
  host + api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middelwares/validar-campos");
const { validarJWT } = require("../middelwares/validar-jwt");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

const router = Router();

//Todas tienen que pasar la validación de JWT
router.use(validarJWT);

//Obtener eventos
router.get("/", getEvents);

//Crear un nuevo evento
router.post(
  "/createEvent",
  [
    //midelwares
    check("title", "El title es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio obligatoria").custom(isDate),
    check("end", "Fecha de fin obligatoria").custom(isDate),
    validarCampos,
  ],
  createEvent
);

//Actualizar un evento
router.put("/:id", updateEvent);

//Eliminar evento
router.delete("/:id", deleteEvent);

module.exports = router;
