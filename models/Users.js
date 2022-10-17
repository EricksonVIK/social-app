const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // validate email
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
    },
    thoughst: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create the User Model using Schema
const User = model("User", UserSchema)

// Friend count/tracking
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

module.exports = User;

