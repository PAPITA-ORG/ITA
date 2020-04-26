// instantiate express router and store in variable `router`
const router = require("express").Router();

// import historiales controller
const historialController = require("../../controllers").historial;

// match router with '/api/historiales'

// get all historiales
router.route("/").get(historialController.findAll);

// get one historial
router.route("/:id").get(historialController.findByID);

// delete all historiales
router.route("/").delete(historialController.deleteMany);

// delete one historial
router.route("/:id").delete(historialController.deleteOne);

// update one historial
router.route("/:id").put(historialController.updateOne);

// create one historial
router.route("/").post(historialController.create);

module.exports = router;
