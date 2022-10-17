const router = require("express").Router();

// import functionality from controllers
const { createUser, getAllUsers, getUserById } = require("../../controllers/user-controller")
// routes
router.route("/").get(getAllUsers).post(createUser)

router.route("/:id").get(getUserById)

module.exports = router;