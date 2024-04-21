

window.onload = function () {
  includeHeader();
  includeFooter();
  if (window.location.pathname.endsWith("contests.html")) {
    
    fetchContests();
    
  }

  if(window.location.pathname.endsWith("about.html")){
    includeAbout();
  }
};

function includeAbout(){
  fetch("about.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("about").innerHTML = data));
}

function includeHeader() {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("header").innerHTML = data));
}

function includeFooter() {
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("footer").innerHTML = data));
}

// Your fetchContests and displayContests functions
function fetchContests() {
  // Fetch contests from Codeforces, AtCoder, CodeChef, LeetCode APIs
  
  fetchCodeforcesContest();
  
//   fetchAtCoderContest();
//   fetchCodechefContest();
//   fetchLeetcodeContest();
}
