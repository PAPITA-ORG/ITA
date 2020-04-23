// start express router
const router = require("express").Router();

// import all routers
const usuariosRouter = require("./usuarios");

// route routers
router.use("/usuarios").get(usuariosRouter);

// export api router as route
module.exports = router;
