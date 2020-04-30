// instantiate express router and store in variable `router`
const router = require("express").Router();

// import all routes
const usuariosRoutes = require("./usuarios");
const mensajesRoutes = require("./mensajes");
const historialRoutes = require("./historial");
const hijosRoutes = require("./hijos");
const actividadesRoutes = require("./actividades");
const comunasRoutes = require("./comunas");

// assign respective routes under '/api'
router.route("/usuarios", usuariosRoutes);
router.route("/mensajes", mensajesRoutes);
router.route("/historial", historialRoutes);
router.route("/hijos", hijosRoutes);
router.route("/actividades", actividadesRoutes);
router.route("/comunas", comunasRoutes);

module.exports = router;
