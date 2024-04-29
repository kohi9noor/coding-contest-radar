const cron = require("node-cron");
const Contest = require("../models/Contest.model");

// scheduling reminder for saved contests

async function shedule() {
  cron.schedule("* * * * *", async () => {
    try {
      const contests = await Contest.find({ startTime: { $gte: new Date() } });
      contests.forEach((contest) => {
        const reminderTime = new Date(contest.startTime.getTime() - 10 * 60000); // 10 minutes before start time
        scheduleReminderJob(contest.userId, contest.contestName, reminderTime);
      });

      console.log("corn job runnded");
    } catch (error) {
      console.error("Error scheduling reminders:", error);
    }
  });

  function scheduleReminderJob(userId, contestName, reminderTime) {
    // Implement logic to send reminder to user via email or other means
    console.log(`Reminder for ${contestName} scheduled for ${reminderTime}`);
  }
}

module.exports = shedule;
