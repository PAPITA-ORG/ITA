// instantiate express router and store in variable `router`
const router = require("express").Router();

// import the mailer controller
const mailerController = require("../../controllers").mailer;

router.route("/").post(mailerController.sendEmail);
router.route("/welcome").post(mailerController.sendWelcomeEmail);
router.route("/passwordChanged").post(mailerController.sendPasswordChangedMail);

module.exports = router;