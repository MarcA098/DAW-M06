// -------------- First part --------------

// -------------- LLISTA --------------

// Get the div where the list will be added
let div1 = document.getElementById("llista_propietats");

// Create a list element
let ul = document.createElement("ul");

// a. Valor mínim que pot tenir un número JS
let liMinValue = document.createElement("li");
liMinValue.textContent = "Valor mínim que pot tenir un número JS: " + Number.MIN_VALUE;
ul.appendChild(liMinValue);

// b. Amplada total de la pantalla
let liScreenWidth = document.createElement("li");
liScreenWidth.textContent = "Amplada total de la pantalla: " + screen.width + "px";
ul.appendChild(liScreenWidth);

// c. Amplada interna de la finestra
let liWindowInnerWidth = document.createElement("li");
liWindowInnerWidth.textContent = "Amplada interna de la finestra: " + window.innerWidth + "px";
ul.appendChild(liWindowInnerWidth);

// d. Títol de la web
let liDocumentTitle = document.createElement("li");
liDocumentTitle.textContent = "Títol de la web: " + document.title;
ul.appendChild(liDocumentTitle);

// e. Hora actual
let liCurrentTime = document.createElement("li");
let currentTime = new Date().toLocaleTimeString();
liCurrentTime.textContent = "Hora actual: " + currentTime;
ul.appendChild(liCurrentTime);

// Append the list to the div
div1.appendChild(ul);

// -------------- AUDIO -------------- 

// Get audio element and controls
const audio = document.getElementById("audio");
const volumeControl = document.getElementById("volume");
const progressControl = document.getElementById("progress");
const durationDisplay = document.getElementById("duration");
const audioSelector = document.getElementById("audio-selector");

// Initialize audio settings
audio.src = audioSelector.value;
audio.volume = volumeControl.value;

// Event listener to update time control as audio plays
audio.addEventListener('timeupdate', () => {
    progressControl.value = audio.currentTime;
    progressControl.max = audio.duration;
    durationDisplay.textContent = `${audio.currentTime.toFixed(1)} / ${audio.duration.toFixed(1)}`;
});

// Event listener to update audio time when changing time control
progressControl.addEventListener('input', () => {
    audio.currentTime = progressControl.value;
});

// Event listener to update volume when changing volume control
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Play audio
function playAudio() {
    audio.play();
}

// Pause audio
function pauseAudio() {
    audio.pause();
}

// Stop audio (reset to start and pause)
function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
}

// Mute or unmute audio
function muteAudio() {
    audio.muted = !audio.muted;
}

// Increase volume
function volumeUp() {
    audio.volume = Math.min(1, audio.volume + 0.1);
    volumeControl.value = audio.volume;
}

// Decrease volume
function volumeDown() {
    audio.volume = Math.max(0, audio.volume - 0.1);
    volumeControl.value = audio.volume;
}

// Change audio source based on selection
function changeAudio() {
    audio.src = audioSelector.value;
    audio.load();
    audio.play();
}

// -------------- Second part -------------- 

// -------------- TAULA -------------- 

// Get div where the table will added
const tableContainer = document.getElementById('taula_propietats');

// Create table and heather
const table = document.createElement('table');
const headerRow = document.createElement('tr');

const header1 = document.createElement('th');
header1.textContent = "Propietat";
headerRow.appendChild(header1);

const header2 = document.createElement('th');
header2.textContent = "Valor";
headerRow.appendChild(header2);

table.appendChild(headerRow);

// Data propierties (1st column)
const labels = [
    "Valor màxim que pot tenir un número JS",
    "Altura total de la pantalla",
    "Altura interna de la finestra",
    "URL del lloc web"
];

// Dinamic data (2nd column)
const values = [
    Number.MAX_VALUE,
    screen.height + "px",
    window.innerHeight + "px",
    window.location.href
];

// Crate rows of the table
for (let i = 0; i < labels.length; i++) {
    const row = document.createElement('tr');

    // 1st column labels
    const cell1 = document.createElement('td');
    cell1.textContent = labels[i];
    row.appendChild(cell1);

    // 2nd column properties
    const cell2 = document.createElement('td');
    cell2.textContent = values[i];
    row.appendChild(cell2);

    // Add row to table
    table.appendChild(row);
}

// Add table to container
tableContainer.appendChild(table);

// -------------- TEMPORITZADOR -------------- 

// Get DOM
const timerDisplay = document.getElementById('timer-display');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const alarmSound = document.getElementById('alarm-sound');

let timer;
let totalTime = 0;
let isRunning = false;

// Function to Inicialize timer
function startTimer() {
    // If is running don't start another
    if (isRunning) return;
    isRunning = true;

    // Calculate total time
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    totalTime = minutes * 60 + seconds;

    // Inicialize timer
    timer = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timer);
            isRunning = false;
            alarmSound.play();
        } else {
            totalTime--;
            updateDisplay();
        }
    }, 1000);
}

// Pause timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    alarmSound.pause();
    alarmSound.currentTime = 0; 
}

// Reset timer
function resetTimer() {
    clearInterval(timer);
    totalTime = 0;
    isRunning = false;
    updateDisplay();
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// Actualize display
function updateDisplay() {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


// DOM
const clockDisplay = document.getElementById('clock');
const alarmTimeInput = document.getElementById('alarm-time');
const musicSelect = document.getElementById('music-select');

// Create second reproducer
const alarmSound2 = document.getElementById("alarm-sound");
const volumeControl2 = document.getElementById("volume2");

let alarmTime = null;
let alarmTimeout = null;

// Actualize every second
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    // Check if the current time matches the alarm
    if (alarmTime && `${hours}:${minutes}:${seconds}` === alarmTime) {
        playMusic();
        alarmTime = null;
    }
}
setInterval(updateClock, 1000);

// Set alarm
function setAlarm() {
    alarmTime = alarmTimeInput.value + ":00";
    alert(`Alarma establerta per a les ${alarmTime}`);
}

// Stop the alarm manually
function stopAlarm() {
    clearTimeout(alarmTimeout);
    stopMusic();
    alarmTime = null;
}

// Play select music
function playMusic() {
    alarmSound.src = musicSelect.value;
    alarmSound.volume = volumeControl.value;
    alarmSound.play();
}

// Stop music
function stopMusic() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// Change volume
volumeControl2.addEventListener('input', () => {
    alarmSound2.volume = volumeControl2.value;
});

