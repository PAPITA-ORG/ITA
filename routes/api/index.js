// instantiate express router and store in variable `router`
const router = require("express").Router();

// import indexes controller
const indexController = require("../../controllers").indexes;

// get all indexes
router.route("/").get(indexController.findAll);

// get one index
router.route("/:id").get(indexController.findByID);

// delete all indexes
router.route("/").delete(indexController.deleteMany);

// delete one index
router.route("/:id").delete(indexController.deleteOne);

// update one index
router.route("/:id").put(indexController.updateOne);

// create one index
router.route("/").post(indexController.create);

module.exports = router;