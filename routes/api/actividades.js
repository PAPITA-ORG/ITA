// instantiate express router and store in variable `router`
const router = require("express").Router();

// import the actividades controller
const actividadesController = require("../../controllers").actividades;

// match router with '/api/actividades'

// get all actividades
router.route("/").get(actividadesController.findAll);

// get one actividad
router.route("/:id").get(actividadesController.findByID);

// get all curated actividades
router.route("/:topicoCod/:af_0").get(actividadesController.findByCategories);

// delete all actividades
router.route("/").delete(actividadesController.deleteMany);

// delete one actividad
router.route("/:id").delete(actividadesController.deleteOne);

// update one actividad
router.route("/:id").put(actividadesController.updateOne);

module.exports = router;
