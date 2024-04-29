const Contest = require("../models/Contest.model");

async function contestRemindController(req, res) {
  const { userId, contestId, contestName, startTime, email } = req.body;

  console.log(req.body);

  try {
    const contest = new Contest(req.body);

    await contest.save();
    res.status(201).json({ contest });
  } catch (error) {
    res.status(500).json({ message: "Interenal Server Error" });
  }
}

module.exports = {
  contestRemindController,
};
