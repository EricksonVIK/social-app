// User Routes
const router = require("express").Router();

// import functionality from controllers
const { createUser, getAllUsers, getUserById, updateUser, deleteUser, addFriend, deleteFriend,
} = require("../../controllers/user-controller")
// routes
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;