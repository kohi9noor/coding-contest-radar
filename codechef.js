

function fetchCodechefContest() {
   // Fetch upcoming contests from codechef API
   const codechefApiUrl = "https://www.codechef.com/api/contests";
   fetch(codechefApiUrl)
     .then((response) => response.json())
     .then((data) => {
       if (data.status === "success") {
         //Display upcoming contests
         const codechefUpcomingContests = data.result.data.content.contestList;
         const codechefNextContest = codechefUpcomingContests[0];
         const codechefContestName = codechefNextContest.name;
         const codechefContestTime = new Date(codechefNextContest.startDate);
         const currentTime = new Date();
         const timeDifference = codechefContestTime - currentTime;
 
         // Display contest information
         //Create HTML elements
         const codechefH2Element = document.createElement("h2");
         codechefH2Element.textContent = codechefContestName;
 
         const codechefPElement = document.createElement("p");
         codechefPElement.textContent = `Start Time : ${codechefContestTime.toLocaleString()}`;
 
         const codechefCountdownDiv = document.createElement("div");
         codechefCountdownDiv.id = "codechefCountdown";
 
         const codechefButtonElement = document.createElement("button");
         codechefButtonElement.textContent = "Register Now";
         codechefButtonElement.onclick = () => registerForCodechefContest(codechefNextContest.code);
 
         //Append elements to contestInfo div
         const codechefContestInfoDiv = document.getElementById("codechefContestInfo");
         codechefContestInfoDiv.appendChild(codechefH2Element);
         codechefContestInfoDiv.appendChild(codechefPElement);
         codechefContestInfoDiv.appendChild(codechefCountdownDiv);
         codechefContestInfoDiv.appendChild(codechefButtonElement);
 
         // Display countdown
         const codechefCountdownElement = document.getElementById("codechefCountdown");
         setInterval(() => {
           const codechefContestRemainingTime = new Date(timeDifference);
           codechefCountdownElement.textContent = `
             Time Remaining: ${codechefContestRemainingTime.getUTCHours()}h ${codechefContestRemainingTime.getUTCMinutes()}m ${codechefContestRemainingTime.getUTCSeconds()}s
         `;
         }, 1000);
       } else {
         // No upcoming contests found
         document.getElementById("codechefContestInfo").innerHTML =
           "<p>No upcoming contests found.</p>";
       }
     })
     .catch(error =>
       console.error("Error fetching upcoming contests from Codechef API: ", error)
     );

       
}

//Function to redirect to Codechef contest page
function registerForCodechefContest(contestCode) {
    window.open(`https://www.codechef.com/${contestCode}`);
  }
