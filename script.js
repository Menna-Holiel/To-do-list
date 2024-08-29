const words = ["Do", "More", "Great", "Work"];
const textContainer = document.getElementById('dynamic-text');
let wordIndex = 0;

function showNextWord() {
    if (wordIndex < words.length) {
        textContainer.innerHTML += words[wordIndex] + " ";
        wordIndex++;
        setTimeout(showNextWord, 1000); 
    }
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.checked);
    });
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(taskDiv => {
        const taskText = taskDiv.querySelector('span').textContent;
        const isChecked = taskDiv.querySelector('.check-btn').disabled;
        tasks.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task to DOM
function addTaskToDOM(taskValue, isChecked) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    taskDiv.innerHTML = `
        <span style="${isChecked ? 'text-decoration: line-through;' : ''}">${taskValue}</span>
        <div>
            <button class="delete-btn">Delete</button>
            <button class="check-btn" ${isChecked ? 'disabled' : ''}>Check</button>
        </div>
    `;

    tasksDiv.appendChild(taskDiv);

    // Delete task functionality
    taskDiv.querySelector('.delete-btn').addEventListener('click', () => {
        tasksDiv.removeChild(taskDiv);
        saveTasks(); // Update local storage
    });

    // Check task functionality
    taskDiv.querySelector('.check-btn').addEventListener('click', () => {
        taskDiv.querySelector('span').style.textDecoration = 'line-through';
        taskDiv.querySelector('.check-btn').disabled = true;
        saveTasks(); // Update local storage
    });
}

// JavaScript for adding tasks
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const tasksDiv = document.getElementById('tasks');

function addTask() {
    const taskValue = taskInput.value;
    if (taskValue) {
        addTaskToDOM(taskValue, false);
        saveTasks(); // Save tasks to local storage
        taskInput.value = ''; // Clear the input field
    }
}

addTaskBtn.addEventListener('click', addTask);

// Add event listener for Enter key
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action (e.g., form submission)
        addTask();
    }
});

// Call the function for the first time after the page loads
window.onload = () => {
    showNextWord();
    loadTasks(); // Load tasks from local storage
};
