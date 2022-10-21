// Thought Routes
const router = require("express").Router();

// import functionality from controllers
const {
  getAllThoughts,
  addThought,
  deleteThought,
  addReply,
  deleteReply,
  updateThought,
} = require("../../controllers/thought-controller");
// routes
router.route("/").get(getAllThoughts).post(addThought);

router.route("/:thoughtId").delete(deleteThought).put(updateThought);

router.route("/:thoughtId/reactions").post(addReply);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReply)
module.exports = router;
