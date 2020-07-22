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

// not found view
router.route("/notfound").get(viewsController.notfoundView);

// get registro view
router.route("/registro").get(viewsController.registro);

// get stats view
router.route("/stats").get(ensureAuthenticated, viewsController.statsView);

// selector view
router
  .route("/tutorial")
  .get(ensureAuthenticated, viewsController.tutorialView);

module.exports = router;
