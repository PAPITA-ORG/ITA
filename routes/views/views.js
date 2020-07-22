const { ensureAuthenticated } = require("../../config/auth");
// start express router
const router = require("express").Router();

// import views controller
const viewsController = require("../../controllers/viewsControllers").views;

// index view
router.route("/").get(viewsController.login);

// sobre view
router.route("/sobre").get(viewsController.sobreView);

// subscribe view
router.route("/subscribe").get(viewsController.subscribeView);

// start view
router.route("/start").get(ensureAuthenticated, viewsController.startView);

// encuesta-acitividad view
router
  .route("/endsurvey")
  .post(ensureAuthenticated, viewsController.encuestaActividadView);
// not found view
router.route("/*").get(viewsController.notfoundView);

// get registro view
router.route("/registro").get(viewsController.registro);

// selector view
router
  .route("/tutorial")
  .get(ensureAuthenticated, viewsController.tutorialView);

module.exports = router;
