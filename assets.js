
document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to Mindfulness & Mood Tracker!");
  });

  document.addEventListener('DOMContentLoaded', function() {
    let timer;
    let isRunning = false;
    let seconds = 0;
  
    
    const startButton = document.getElementById('start-timer');
    const timerDisplay = document.getElementById('timer-display');
  
    
    startButton.addEventListener('click', function() {
      if (!isRunning) {
        isRunning = true;
        startTimer();
        startButton.textContent = 'Pause';
      } else {
        isRunning = false;
        clearInterval(timer);
        startButton.textContent = 'Resume';
      }
    });
  
  
    function startTimer() {
      timer = setInterval(function() {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  
      
        if (seconds % 5 === 0) {
          timerDisplay.style.backgroundColor = 'lightblue'; 
        } else if (seconds % 3 === 0) {
          timerDisplay.style.backgroundColor = 'lightgreen'; 
        } else {
          timerDisplay.style.backgroundColor = 'white'; 
        }
      }, 1000);
    }
  });
  
document.addEventListener('DOMContentLoaded', function() {
    const moodForm = document.getElementById('mood-log-form');
    const moodChartCanvas = document.getElementById('moodChart').getContext('2d');
    let moodData = [];
  
    moodForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const date = document.getElementById('date').value;
      const mood = document.getElementById('mood').value;
  
      
      moodData.push({ date, mood });
      updateMoodGraph();
      moodForm.reset();  
    });
  
    
    function updateMoodGraph() {
      // Prepare data for the chart
      const labels = moodData.map(entry => entry.date);
      const moodValues = moodData.map(entry => {
        if (entry.mood === 'happy') return 1;
        if (entry.mood === 'neutral') return 2;
        if (entry.mood === 'sad') return 3;
      });
  
      // Create or update the chart
      new Chart(moodChartCanvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Mood Tracker',
            data: moodValues,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                callback: function(value) {
                  if (value === 1) return 'Happy';
                  if (value === 2) return 'Neutral';
                  if (value === 3) return 'Sad';
                }
              }
            }
          }
        }
      });
    }
  
  });
  document.getElementById('mood-log-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get form values
    const date = document.getElementById('date').value;
    const mood = document.getElementById('mood').value;
    const notes = document.getElementById('notes').value;
  
    // Create a new table row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${date}</td>
      <td>${mood}</td>
      <td>${notes || "No notes"}</td>
    `;
  
    // Append the row to the table
    document.getElementById('mood-entries').appendChild(newRow);
  
    // Reset the form
    this.reset();
  });
  