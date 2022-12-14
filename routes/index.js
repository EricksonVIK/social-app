// Main Route File
const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>Dreaded 404 Error</h1>");
});

module.exports = router;
