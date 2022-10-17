// central file for routes
const router = require("express").Router();

// import route location
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// define routes router.use(**) 
// users
router.use("/users", userRoutes);
// thoughts

// export routes
module.exports = router;
