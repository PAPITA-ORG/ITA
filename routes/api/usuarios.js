// instantiate express router and store in variable `router`
const router = require("express").Router();
const axios = require("axios");
axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://ita-production.herokuapp.com/"
    : `http://localhost:${process.env.PORT || 3000}`;
// import bcryptjs
const bcrypt = require("bcryptjs");
const passport = require("passport");

// import Usuarios model
const Usuario = require("../../models").usuarios;

// import usuarios controller
const usuariosController = require("../../controllers").usuarios;

// import subscribe form
let subscribeForm = require("../../controllers/viewsControllers/controllerRenders");

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

router.post("/register", (req, res) => {
  let {
    correo,
    password,
    nombres,
    apellidos,
    edad,
    educacion,
    genero,
    parentesco,
    comunaCod,
    i1,
    i2,
    i3,
    i4,
    i5
  } = req.body;

  let efficacies = [i1, i2, i3, i4, i5].map(eff => Number(eff));
  let af_0 = calculate_eff(efficacies);

  function calculate_eff(efficacies) {
    return sum_eff(efficacies) / efficacies.length;
  }

  function sum_eff(efficacies) {
    return efficacies.reduce((a, b) => a + b);
  }
  // validate creation of usuario

  // check required fields
  let errors = [];
  if (
    !correo ||
    !password ||
    !nombres ||
    !apellidos ||
    !edad ||
    !educacion ||
    !genero ||
    !parentesco ||
    !comunaCod ||
    !i1 ||
    !i2 ||
    !i3 ||
    !i4 ||
    !i5
  ) {
    errors.push({ msg: "Por favor procure llenar el formulario completo" });
  }

  // check password length
  if (password.length < 6) {
    errors.push({ msg: "Su contraseña debe ser de al menos 6 caracteres" });
  }

  if (errors.length > 0) {
    // fetch subscribe form 'comunas' fields and render view

    subscribeForm.findComunas(renderSubscribe);

    function renderSubscribe(err, subscribeForm) {
      if (err) {
        res
          .status(422)
          .json("RSRC", err, "Could not retrieve expected database resources");
      } else {
        subscribeForm.correo.value = correo;
        subscribeForm.password.value = password;

        subscribeForm.nombres.value = nombres;
        subscribeForm.apellidos.value = apellidos;

        subscribeForm.edad.value = edad;

        parentesco = Number(parentesco);
        edad = Number(edad);
        genero = Number(genero);

        subscribeForm.parentesco.selected =
          subscribeForm.parentesco.options[parentesco - 1];

        subscribeForm.genero.selected =
          subscribeForm.genero.options[genero - 1];

        subscribeForm.educacion.selected =
          subscribeForm.educacion.options[educacion - 1];

        subscribeForm.comuna.selected = subscribeForm.comuna.options.filter(
          comuna => comuna.id === comunaCod
        )[0].id;

        subscribeForm.sliderInputs.map((efficacy, i) => {
          efficacy.value = efficacies[i];
        });

        let nav_content = require("../../controllers/viewsControllers/controllerRenders").renderNavContent(
          "index"
        );

        // console.log(subscribeForm.correo);
        res.render("subscribe", {
          errors: errors,
          data: subscribeForm,
          view_data: nav_content
        });
      }
    }
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
            nombres: nombres,
            apellidos: apellidos,
            edad: Number(edad),
            educacion: educacion,
            genero: Number(genero),
            parentesco: Number(parentesco),
            comunaCod: comunaCod,
            i1: Number(i1),
            i2: Number(i2),
            i3: Number(i3),
            i4: Number(i4),
            i5: Number(i5),
            af_0: af_0
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
                    "Tu registracion esta completa! Continua con tu login y registra a tus hij@s."
                  );
                  // llamada de prueba
                  // axios.get("/api/usuarios").then(res => console.log(res)).catch(error => console.log(error))

                  console.log("Register done, sending mail");
                  console.log(correo);
                  // make post request with welcome email
                  PostWelcomeEmail(correo);

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
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/"
  }),
  (req, res) => {
    if (req.user.hijos.length === 0) {
      res.redirect("/tutorial");
    } else {
      req.app.locals["usuario"] = req.user;
      res.redirect("/start");
    }
  }
);

// Logout Handler
router.route("/logout").post(usuariosController.logout);
// change password
router.route("/changePassword").post(usuariosController.changePassword);

// choose an activity
router
  .route("/chooseActivity/:topicoCod")
  .post(usuariosController.chooseRandomActivities);

// download a pdf
router.route("/activity/pdf").post(usuariosController.download);

module.exports = router;

function PostWelcomeEmail(correo) {
  // let options = { headers: { 'Content-Type': 'application/json' } }
  axios
    .post("/api/mailer/welcome", { to: correo })
    .then(r => {
      console.log("Welcome email sent");
      // r.redirect("/");
      return r;
    })
    .catch(error => {
      console.log("error, welcome email not sent: " + error);
    });
}
