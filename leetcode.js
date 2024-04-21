
    const cheerio = require('cheerio');
    const axios = require('axios');
    
    
    function fetchLeetCodeContests() {
      // Fetch the HTML content of LeetCode's contest page
      axios.get('https://leetcode.com/contest/')
        .then(response => {
          const html = response.data;
          const $ = cheerio.load(html);
    
          // Find the upcoming contest details
          const upcomingContest = $('.contest-item.card-upcoming').first();
          const contestName = upcomingContest.find('.contest-name').text().trim();
          const contestTime = new Date(upcomingContest.find('.contest-start-time').attr('datetime'));
          const currentTime = new Date();
          const timeDifference = contestTime - currentTime;
    
          // Create HTML elements to display contest details
          const h2Element = document.createElement('h2');
          h2Element.textContent = contestName;
    
          const pElement = document.createElement('p');
          pElement.textContent = `Start Time: ${contestTime.toLocaleString()}`;
    
          const countdownDiv = document.createElement('div');
          countdownDiv.id = 'countdown';
    
          const buttonElement = document.createElement('button');
          buttonElement.textContent = 'Register Now';
          buttonElement.onclick = registerForContest();
    
          // Append elements to contestInfo div
          const contestInfoDiv = document.getElementById('contestInfo');
          contestInfoDiv.appendChild(h2Element);
          contestInfoDiv.appendChild(pElement);
          contestInfoDiv.appendChild(countdownDiv);
          contestInfoDiv.appendChild(buttonElement);
    
          // Countdown timer
          const countdownElement = document.getElementById('countdown');
          setInterval(() => {
            const remainingTime = new Date(timeDifference);
            countdownElement.textContent = `
              Time Remaining: ${remainingTime.getUTCHours()}h ${remainingTime.getUTCMinutes()}m ${remainingTime.getUTCSeconds()}s
            `;
            timeDifference -= 1000; // Update time difference every second
          }, 1000);
    
          // Function to redirect to contest registration page
          function registerForContest() {
            const contestUrl = upcomingContest.find('.contest-link').attr('href');
            console.log(`Redirecting to contest registration page: ${contestUrl}`);
            // You can replace this with your actual code for redirecting to the registration page
            // window.location.href = contestUrl;
          }
        })
        .catch(error => {
          console.error('Error fetching and parsing HTML:', error);
        });
    }
    
   
    

