const router = require("express").Router();
const apiRoutes = require("./api");
const viewsRoutes = require("./views").viewsRoutes;

// API ROUTES
router.use("/api", apiRoutes);

// VIEWS ROUTES
router.use("/", viewsRoutes);

module.exports = router;
