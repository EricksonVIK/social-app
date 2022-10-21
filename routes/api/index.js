// API Route File
const router = require("express").Router();

// import route location
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// users
router.use("/users", userRoutes);
// thoughts
router.use("/thoughts", thoughtRoutes);
// export routes
module.exports = router;
