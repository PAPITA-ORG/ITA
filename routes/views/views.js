// start express router
const router = require("express").Router();

// import views controller
const viewsController = require("../../controllers/viewsControllers").views;

// index view
router.route("/").get(viewsController.indexView);

// sobre view
router.route("/sobre").get(viewsController.sobreView);

// get team view
router.route("/team").get(viewsController.teamView);

// start view
router.route("/start").get(viewsController.startView);

// start_new view
router.route("/start_new").get(viewsController.startNewView);

// get registro view
router.route("/registro").get(viewsController.registroView);

// selector view
router.route("/selector").get(viewsController.selectorView);

// end view
router.route("/end").get(viewsController.endView);

module.exports = router;
