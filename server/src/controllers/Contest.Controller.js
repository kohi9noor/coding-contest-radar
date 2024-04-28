const Contest = require("../models/Contest.model");

async function contestRemindController(req, res) {
  const { userId, contestId, contestName, startTime } = req.body;

  try {
    const contest = new Contest({ userId, contestId, contestName, startTime });

    await contest.save();
    res.status(201).json({ contest });
  } catch (error) {
    res.status(500).json({ message: "Interenal Server Error" });
  }
}

module.exports = {
  contestRemindController,
};
