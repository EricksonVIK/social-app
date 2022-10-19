const { Thought, User } = require("../models");

// Thought Controllers
const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({}).then((dbThoughtData) => res.json(dbThoughtData));
  },
  // get single by _id
  getSingleThought(req, res) {},
  // Post new thoughts - push to user thought array
  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => res.json(dbThoughtData));
  },
  // Put to update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(400).json(err));
  },

  // delete thought and associated reactions
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      // returns the deleted thought info
      .then((dbDeletedThought) => res.json(dbDeletedThought));
  },
  // add reply
  addReply({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      {
        $push: { reactions: body },
      },
      { new: true }
    )
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => res.status(400).json(err));
  },
  // remove reply
  deleteReply({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      {
        $pull: { reactions: params.reactionId },
      },
      { new: true }
    )
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
