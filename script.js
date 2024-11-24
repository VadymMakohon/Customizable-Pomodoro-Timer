let timer;
let workDuration = 25 * 60;
let breakDuration = 5 * 60;
let isWorkSession = true;
let timeLeft = workDuration;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const motivationalQuote = document.getElementById('motivational-quote');

const quotes = [
    "Stay focused and never give up!",
    "You can do it, one step at a time.",
    "Small steps lead to big achievements.",
    "Believe in yourself and keep going!",
];

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            timeLeft -= 1;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = null;
                isWorkSession = !isWorkSession;
                timeLeft = isWorkSession ? workDuration : breakDuration;

                alert(isWorkSession ? "Time to work!" : "Take a break!");
                motivationalQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeLeft = isWorkSession ? workDuration : breakDuration;
    updateDisplay();
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
}

document.getElementById('apply-settings').addEventListener('click', () => {
    workDuration = parseInt(document.getElementById('work-duration').value) * 60;
    breakDuration = parseInt(document.getElementById('break-duration').value) * 60;
    resetTimer();
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
addTaskButton.addEventListener('click', addTask);

updateDisplay();
