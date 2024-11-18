// Select elements
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapList = document.getElementById('lap-list');

let minutes = 0,
  seconds = 0,
  milliseconds = 0,
  interval;

// Start Stopwatch
startButton.addEventListener('click', () => {
  clearInterval(interval);
  interval = setInterval(() => {
    milliseconds += 100; // Increment by 100ms
    if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    updateDisplay();
  }, 100); // Set interval to 100ms
});

// Pause Stopwatch
pauseButton.addEventListener('click', () => {
  clearInterval(interval);
});

// Reset Stopwatch
resetButton.addEventListener('click', () => {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  lapList.innerHTML = ''; // Clear lap times
  updateDisplay();
});

// Record Lap Time
lapButton.addEventListener('click', () => {
  const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
  lapList.appendChild(li);
});

// Helper Functions
function updateDisplay() {
  minutesDisplay.textContent = formatTime(minutes);
  secondsDisplay.textContent = formatTime(seconds);
  millisecondsDisplay.textContent = formatMilliseconds(milliseconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(ms) {
  return ms < 100 ? `0${ms / 100}` : ms / 100; // Display two digits
}
