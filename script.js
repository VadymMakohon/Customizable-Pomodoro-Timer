let timeLeft = 25 * 60;
let timerInterval;
let currentInterval = 'pomodoro';
let backgroundColor = '#F1F1EF';
let fontColor = '#37352F';

const timeLeftEl = document.getElementById('time-left');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const pomodoroIntervalBtn = document.getElementById('pomodoro-interval-btn');
const shortBreakIntervalBtn = document.getElementById('short-break-interval-btn');
const longBreakIntervalBtn = document.getElementById('long-break-interval-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModalBtn = document.querySelector('.close-btn');
const backgroundColorSelect = document.getElementById('background-color');
const fontColorSelect = document.getElementById('font-color');
const saveBtn = document.getElementById('save-btn');

pomodoroIntervalBtn.addEventListener('click', () => {
    currentInterval = 'pomodoro';
    timeLeft = 25 * 60;
    updateTimeLeftTextContent();
});

shortBreakIntervalBtn.addEventListener('click', () => {
    currentInterval = 'short-break';
    timeLeft = 5 * 60;
    updateTimeLeftTextContent();
});

longBreakIntervalBtn.addEventListener('click', () => {
    currentInterval = 'long-break';
    timeLeft = 10 * 60;
    updateTimeLeftTextContent();
});

startStopBtn.addEventListener('click', () => {
    if (startStopBtn.textContent === 'Start') {
        startTimer();
        startStopBtn.textContent = 'Stop';
    } else {
        stopTimer();
    }
});

resetBtn.addEventListener('click', () => {
    stopTimer();
    if (currentInterval === 'pomodoro') {
        timeLeft = 25 * 60;
    } else if (currentInterval === 'short-break') {
        timeLeft = 5 * 60;
    } else {
        timeLeft = 10 * 60;
    }
    updateTimeLeftTextContent();
    startStopBtn.textContent = 'Start';
});

settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

saveBtn.addEventListener('click', () => {
    const newBackgroundColor = backgroundColorSelect.value;
    const newFontColor = fontColorSelect.value;

    localStorage.setItem('backgroundColor', newBackgroundColor);
    localStorage.setItem('fontColor', newFontColor);

    applyUserPreferences();

    settingsModal.style.display = 'none';
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimeLeftTextContent();
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            if (currentInterval === 'pomodoro') {
                timeLeft = 5 * 60;
                currentInterval = 'short-break';
                startTimer();
            } else if (currentInterval === 'short-break') {
                timeLeft = 10 * 60;
                currentInterval = 'long-break';
                startTimer();
            } else {
                timeLeft = 25 * 60;
                currentInterval = 'pomodoro';
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
}

function updateTimeLeftTextContent() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeLeftEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function applyUserPreferences() {
    const savedBackgroundColor = localStorage.getItem('backgroundColor');
    const savedFontColor = localStorage.getItem('fontColor');

    if (savedBackgroundColor) {
        backgroundColor = savedBackgroundColor;
    }

    if (savedFontColor) {
        fontColor = savedFontColor;
    }

    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = fontColor;
    timeLeftEl.style.color = fontColor;
    const buttons = document.querySelectorAll('.interval-btn, #start-stop-btn, #reset-btn, #settings-btn');
    buttons.forEach((button) => {
        button.style.color = fontColor;
        button.style.backgroundColor = backgroundColor;
        button.style.borderColor = fontColor;
    });
}

applyUserPreferences();