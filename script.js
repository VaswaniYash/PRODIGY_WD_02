let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function updateDisplay() {
    let time = elapsedTime;
    if (isRunning) {
        time += Date.now() - startTime;
    }

    const hrs = String(Math.floor(time / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');

    display.textContent = `${hrs}:${mins}:${secs}`;
}

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = "Pause";
        isRunning = true;
    } else {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        startStopBtn.textContent = "Start";
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = "Start";
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        const li = document.createElement("li");
        li.textContent = display.textContent;
        lapsList.appendChild(li);
    }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);

updateDisplay();