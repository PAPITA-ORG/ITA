// instantiate express router and store in variable `router`
const router = require("express").Router();
// import bcryptjs
const bcrypt = require("bcryptjs");
const passport = require("passport");

// import registros model
const Registro = require("../../models").registros;

// import registros controller
const registrosController = require("../../controllers").registros;

// match router with '/api/registros'

// get all registros
router.route("/").get(registrosController.findAll);

// get one registro
router.route("/:id").get(registrosController.findByID);

// delete all registros
router.route("/").delete(registrosController.deleteMany);

// delete one registro
router.route("/:id").delete(registrosController.deleteOne);

// update one registro
router.route("/:id").put(registrosController.updateOne);