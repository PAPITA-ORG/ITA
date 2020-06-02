// start express router
const router = require("express").Router();

// import views controller
const viewsController = require("../../controllers/viewsControllers").views;

// index view
router.route("/").get(viewsController.login);

// sobre view
router.route("/sobre").get(viewsController.sobreView);

// start view
router.route("/start").get(viewsController.startView);

// not found view
router.route("/notfound").get(viewsController.notfoundView);


// get registro view
router.route("/registro").get(viewsController.registro);

// selector view
router.route("/tutorial").get(viewsController.tutorialView);

module.exports = router;
