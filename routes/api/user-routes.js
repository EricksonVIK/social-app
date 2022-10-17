const router = require("express").Router();

// import functionality from controllers
const { createUser, getAllUsers } = require("../../controllers/user-controller")
// routes
router.route("/").get(getAllUsers).post(createUser)

module.exports = router;