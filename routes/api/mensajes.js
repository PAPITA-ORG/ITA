// instantiate express router and store in variable `router`
const router = require("express").Router();

// import mensajes controller
const mensajeController = require("../../controllers").mensajes;

// match router with '/api/mensajes'

// get all mensajes
router.route("/").get(mensajeController.findAll);

// get one mensaje
router.route("/:id").get(mensajeController.findByID);

// delete all mensajes
router.route("/").delete(mensajeController.deleteMany);

// delete one mensaje
router.route("/:id").delete(mensajeController.deleteOne);

// update one mensaje
router.route("/:id").put(mensajeController.updateOne);

// create one mensaje
router.route("/").post(mensajeController.create);

module.exports = router;