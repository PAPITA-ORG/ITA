// instantiate express router and store in variable `router`
const router = require("express").Router();

// import usuarios controller
const usuariosController = require("../../controllers").usuarios;

// match router with '/api/usuarios'

// get all usuarios
router.route("/").get(usuariosController.findAll);

// get one usuario
router.route("/:id").get(usuariosController.findByID);

// delete all usuarios
router.route("/").delete(usuariosController.deleteMany);

// delete one usuario
router.route("/:id").delete(usuariosController.deleteOne);

// update one usuario
router.route("/:id").put(usuariosController.updateOne);

// create one usuario
router.route("/").post(usuariosController.create);

module.exports = router;
