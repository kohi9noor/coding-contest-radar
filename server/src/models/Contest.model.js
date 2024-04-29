const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  userId: String,
  email: String,
  name: String,
  contestId: {
    type: String,
    required: true,
  },
  contestName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
});

const Contest = mongoose.model("Contest", contestSchema);

module.exports = Contest;
