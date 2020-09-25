// instantiate express router and store in variable `router`
const router = require("express").Router();

// import all routes
const usuariosRoutes = require("./usuarios");
const mensajesRoutes = require("./mensajes");
const historialRoutes = require("./historial");
const hijosRoutes = require("./hijos");
const actividadesRoutes = require("./actividades");
const comunasRoutes = require("./comunas");
const mailerRoutes = require("./mailer");

// assign respective routes under '/api'
router.use("/usuarios", usuariosRoutes);
router.use("/mensajes", mensajesRoutes);
router.use("/historial", historialRoutes);
router.use("/hijos", hijosRoutes);
router.use("/actividades", actividadesRoutes);
router.use("/comunas", comunasRoutes);
router.use("/mailer", mailerRoutes);

module.exports = router;
