// start express router
const router = require("express").Router();

// import usuarios controller
const usuariosController = require("../../controllers/").usuarios;

// get all usuarios
router.route("/").get(usuariosController.findAll);

// get one usuario
router.route("/:usuario").get(usuariosController.findOne);

// create an usuario
router.route("/").post(usuariosController.create);

module.exports = router;
