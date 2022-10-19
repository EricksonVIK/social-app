const { Schema, model, Types } = require("mongoose");
// date validator
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    // validate maximum 280 characters
    // match: /\w{0-280}/
    maxlength: 280
  },
    username: {
    //   how do i link user?
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
},
{
    toJSON: {
        getters: true,
    }
});

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // validate 1-280 characters
    //   match: /\w{1-280}/
        maximumlength:280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      // link user model with thoughts
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
