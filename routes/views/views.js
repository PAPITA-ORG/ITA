// start express router
const router = require("express").Router();

// import views controller
const viewsController = require("../../controllers/viewsControllers").views;

// get team view
router.route("/team").get(viewsController.teamView);

// get registro view
router.route("/registro").get(viewsController.registroView);

module.exports = router;
