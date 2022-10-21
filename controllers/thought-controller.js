const { Thought, User } = require("../models");

// Thought Controllers
const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get single by _id
  getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(400).json({
            message: "Couldn't find your thought, check ID and try again!",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

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
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Put to update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(400).json({
            message: "Couldn't find your thought, check ID and try again!",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // delete thought and associated reactions
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      // returns the deleted thought info
      .then((dbDeletedThought) => res.json(dbDeletedThought))
      // return json message
      // .then({message: "Your thought has been deleted."})
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
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
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // remove reply
  deleteReply({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      {
        $pull: { reactions: { _id: params.reactionId } },
      },
      { new: true }
    )
      .then((dbReactionData) => res.json(dbReactionData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = thoughtController;
