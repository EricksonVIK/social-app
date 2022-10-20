// import model
const { User, Thought } = require("../models");

// User Controller
// how do i add in friends?
const UserController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
      })
      .then((dpUserData) => res.json(dpUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get single user w _id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(400)
            .json({ message: "No user with provided information." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // post new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // put update user w _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(400)
            .json({ message: "No user with provided information." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Delete user w _id -- delete associated thoughts
  deleteUser({ params }, res) {
    //   delete associated Thoughts?
    User.findOneAndDelete({ _id: params.id })
      // insert a deleteMany() to delete any thought with user name
      // Thought.deleteMany({})
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(400)
            .json({ message: "No user with provided information." });
          return;
        }
        return Thought.deleteMany({
          _id: dbUserData.thoughts
        })
        ;
      }).then(() => res.json({message: "User deleted!"}))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // Delete a friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
};

// export controller
module.exports = UserController;
