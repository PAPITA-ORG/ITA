// instantiate express router and store in variable `router`
const router = require("express").Router();

// import hijos controller
const hijoController = require("../../controllers").hijos;

// match router with '/api/hijos'

// get all hijos
router.route("/").get(hijoController.findAll);

// get one hijo
router.route("/:id").get(hijoController.findByID);

// delete all hijos
router.route("/").delete(hijoController.deleteMany);

// delete one hijo
router.route("/:id").delete(hijoController.deleteOne);

// update one hijo
router.route("/:id").put(hijoController.updateOne);

// create one hijo
router.route("/").post(hijoController.create);

module.exports = router;