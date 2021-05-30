// Define UI Variables
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskFilter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load Events
loadEventListeners();


function loadEventListeners() {
    // Add a Task
    taskForm.addEventListener('submit', addTask);
}