// instantiate express router and store in variable `router`
const router = require("express").Router();
// import bcryptjs
const bcrypt = require("bcryptjs");
const passport = require("passport");

// import Usuarios model
const Usuario = require("../../models").usuarios;

// import usuarios controller
const usuariosController = require("../../controllers").usuarios;

// match router with '/api/usuarios'

// get all usuarios
router.route("/").get(usuariosController.findAll);

// get one usuario
router.route("/:id").get(usuariosController.findByID);

// delete all usuarios
router.route("/").delete(usuariosController.deleteMany);

// delete one usuario
router.route("/:id").delete(usuariosController.deleteOne);

// update one usuario
router.route("/:id").put(usuariosController.updateOne);

// create one usuario
// router.route("/register").post(usuariosController.create);
router.post("/register", (req, res) => {
  const {
    correo,
    password,
    edad,
    genero,
    parentesco,
    comunaCod,
    i1,
    i2,
    i3,
    i4,
    i5,
    af_0,
    tutorial
  } = req.body;

  // validate creation of usuario

  // check required fields
  let errors = [];
  if (
    !correo ||
    !password ||
    !edad ||
    !genero ||
    !parentesco ||
    !comunaCod ||
    !i1 ||
    !i2 ||
    !i3 ||
    !i4 ||
    !i5 ||
    !af_0 ||
    !tutorial
  ) {
    errors.push({ msg: "Por favor procure llenar el formulario completo" });
  }

  // check password length
  if (password.length < 6) {
    errors.push({ msg: "Su contraseña debe ser de al menos 6 caracteres" });
  }

  if (errors.length > 0) {
    console.log(errors);
    res.status(422).json(errors);
  } else {
    // Validation passed
    Usuario.findOne({ correo: correo })
      .then(dbUsuarios => {
        if (dbUsuarios) {
          // user exists

          errors.push({
            msg: "Ups! Parece ser que ya existe una cuentITA bajo este correo"
          });
          res.json(errors);
        } else {
          // save a new user
          const newUsuario = new Usuario({
            correo: correo,
            password: password,
            edad: edad,
            genero: genero,
            parentesco: parentesco,
            comunaCod: comunaCod,
            i1: i1,
            i2: i2,
            i3: i3,
            i4: i4,
            i5: i5,
            af_0: af_0,
            tutorial: tutorial
          });

          // Hash Password
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            return bcrypt.hash(newUsuario.password, salt, (err, hash) => {
              if (err) throw err;

              // set new usuario password to hash
              newUsuario.password = hash;

              // save user
              newUsuario
                .save()
                .then(usuario => {
                  req.flash(
                    "success_msg",
                    "Tu registracion esta completa! Continua con tu login."
                  );
                  res.redirect("/");
                })
                .catch(err => res.status(422).json(err));
            });
          });
        }
      })
      .catch(err => err);
  }
});

// Login Handler
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }), (req, res) => {
    if (tutorial == 1) {
      res.redirect('/tutorial');
    }
    if (tutorial == 0) {
      res.redirect('/start');
    }
  });


/*router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/start",
    failureRedirect: "/",
    failureFlash: true
  })(req, res, next);
  
});*/

module.exports = router;
