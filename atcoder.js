function fetchAtCoderContest() {
  // Fetch upcoming contests from AtCoder API
  const atCoderApiUrl =
    "https://kenkoooo.com/atcoder/atcoder-api/v3/contest/upcoming";
  fetch(atCoderApiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        //Display upcoming contests
        const atCoderNextContest = data[0];
        const atCoderContestName = atCoderNextContest.title;
        const atCoderContestTime = new Date(
          atCoderNextContest.start_time * 1000
        );
        const currentTime = new Date();
        const timeDifference = atCoderContestTime - currentTime;

        // Display contest information
        //Create HTML elements
        const atCoderH2Element = document.createElement("h2");
        atCoderH2Element.textContent = atCoderContestName;

        const atCoderPElement = document.createElement("p");
        atCoderPElement.textContent = `Start Time : ${atCoderContestTime.toLocaleString()}`;

        const atCoderCountdownDiv = document.createElement("div");
        atCoderCountdownDiv.id = "atCoderCountdown";

        const atCoderButtonElement = document.createElement("button");
        atCoderButtonElement.textContent = "Register Now";
        atCoderButtonElement.onclick = () =>
          registerForAtCoderContest(atCoderNextContest.id);

        //Append elements to contestInfo div
        const atCoderContestInfoDiv =
          document.getElementById("atCoderContestInfo");
        atCoderContestInfoDiv.appendChild(atCoderH2Element);
        atCoderContestInfoDiv.appendChild(atCoderPElement);
        atCoderContestInfoDiv.appendChild(atCoderCountdownDiv);
        atCoderContestInfoDiv.appendChild(atCoderButtonElement);

        // Display countdown
        const atCoderCountdownElement =
          document.getElementById("atCoderCountdown");
        setInterval(() => {
          const currentTime = new Date();
          const timeDifference = atCoderContestTime - currentTime;
          const atCoderContestRemainingTime = new Date(timeDifference);
          atCoderCountdownElement.textContent = `
        Time Remaining: ${atCoderContestRemainingTime.getUTCHours()}h ${atCoderContestRemainingTime.getUTCMinutes()}m ${atCoderContestRemainingTime.getUTCSeconds()}s
    `;
        }, 1000);
      } else {
        // No upcoming contests found
        document.getElementById("atCoderContestInfo").innerHTML =
          "<p>No upcoming contests found.</p>";
      }
    })
    .catch((error) =>
      console.error(
        "Error fetching upcoming contests from AtCoder API: ",
        error
      )
    );
}

//Function to redirect to AtCoder contest page
function registerForAtCoderContest(contestId) {
  window.open(`https://atcoder.jp/contests/${contestId}/register`);
}
