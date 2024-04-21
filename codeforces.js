function fetchCodeforcesContest() {
  const codeforcesApiUrl = "https://codeforces.com/api/contest.list";
  fetch(codeforcesApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const codeforcesUpcomingContests = data.result.filter(
        (contest) => contest.phase === "BEFORE"
      );

      const codeforcesContestInfoDiv = document.getElementById("contestInfo");

      if (codeforcesUpcomingContests.length > 0) {
        codeforcesUpcomingContests.forEach((contest, index) => {
          const contestDiv = document.createElement("div");
          contestDiv.className = "platform";

          const h2Element = document.createElement("h2");
          h2Element.textContent = contest.name;
          contestDiv.appendChild(h2Element);

          const pElement = document.createElement("p");
          pElement.textContent = `Start Time : ${new Date(contest.startTimeSeconds * 1000).toLocaleString()}`;
          contestDiv.appendChild(pElement);

          const countdownDiv = document.createElement("div");
          countdownDiv.id = `countdown${index}`;
          contestDiv.appendChild(countdownDiv);

          const buttonElement = document.createElement("button");
          buttonElement.textContent = "Register Now";
          buttonElement.onclick = () => registerForCodeforcesContest(contest.id);
          contestDiv.appendChild(buttonElement);

          codeforcesContestInfoDiv.appendChild(contestDiv);

          const countdownElement = document.getElementById(`countdown${index}`);
          setInterval(() => {
            const currentTime = new Date();
            const contestTime = new Date(contest.startTimeSeconds * 1000);
            const timeDifference = contestTime - currentTime;
            const remainingTime = new Date(timeDifference);
            countdownElement.textContent = `Time Remaining: ${remainingTime.getUTCHours()}h ${remainingTime.getUTCMinutes()}m ${remainingTime.getUTCSeconds()}s`;
          }, 1000);
        });
      } else {
        codeforcesContestInfoDiv.innerHTML = "<p>No upcoming contests found.</p>";
      }
    })
    .catch((error) =>
      console.error(
        "Error fetching upcoming contests from Codeforces API: ",
        error
      )
    );
}

function registerForCodeforcesContest(contestId) {
  window.open(`https://codeforces.com/contestRegistration/${contestId}`);
}