// import model
const { User } = require("../models");

// User Controller
// how do i add in friends?
const UserController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((dpUserData) => res.json(dpUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get single user w _id
  getUserById(req, res) {},
  // post new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // put update user w _id
  updateUser(req, res) {},
  // Delete user w _id -- delete associated thoughts and reactions
  deleteUser(req, res) {},
};

// export controller
module.exports = UserController;
