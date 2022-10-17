// central file for routes
const router = require("express").Router();

// import route location
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// define routes router.use(**) for user and thought

// export routes
module.exports = router;
