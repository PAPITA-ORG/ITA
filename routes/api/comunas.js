// instantiate express router and store in variable `router`
const router = require("express").Router();

// import comunas controller
const comunasController = require("../../controllers").comunas;

// match router with '/api/comunas'

// get all comunas
router.route("/").get(comunasController.findAll);

// get one comuna
router.route("/:id").get(comunasController.findByID);

// delete all comunas
router.route("/").delete(comunasController.deleteMany);

// delete one comuna
router.route("/:id").delete(comunasController.deleteOne);

// update one comuna
router.route("/:id").put(comunasController.updateOne);

module.exports = router;
