// Define UI Variables
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskFilter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load Events
loadEventListeners();
// Initializing Local Storage
const tasks = initLocalStorage();
updateTasks(tasks);

function loadEventListeners() {
    // Add a Task
    taskForm.addEventListener('submit', addTask);
    // Remove a Task
    taskList.addEventListener('click', removeTask);
    // Clear All Tasks
    clearBtn.addEventListener('click', clearAllTasks);
    // Filter Tasks
    taskFilter.addEventListener('keyup', filterTasks);
}

/* Tasks Functions */

// Add A Task

function addTask(e) {
    if(taskInput.value === ""){
        alert('Add a Task');
    } else {
        // Create Task Item in the view
        createTaskItem(taskInput.value);
        // Store Task Item in Local Storage
        storeTaskInLocalStorage(taskInput.value);
        // Clear Task Input
        taskInput.value = '';
    }
    e.preventDefault();
}

function createTaskItem(task) {
    // Create A Task Li
    const taskLiTemplate = `
        <li class="collection-item">
            ${task}
            <a href="#" class="delete-item secondary-content">
                <i class="fa fa-remove"></i>
            </a>
        </li>
    `;

    taskList.insertAdjacentHTML('beforeend', taskLiTemplate);
}

function updateTasks(tasks) {
    tasks.forEach(function (task) {
        createTaskItem(task);
    })
}

// Removing Task

function removeTask(e) {
    const deleteBtn = e.target.parentElement;
    const taskLi = deleteBtn.parentElement;
    if (deleteBtn.classList.contains('delete-item')) {
        if (confirm('The task will be deleted, Do you want to continue?')) {
            taskLi.remove();
            // Remove Task Item from Local Storage
            removeTaskInLocalStorage(taskLi.innerText);
        }
    }

    e.preventDefault();
}

// Clearing All Tasks

function clearAllTasks() {
    if(confirm('All Tasks will be deleted, do you want to continue?')) {
        // taskList.innerHTML = '';
        // Faster by 98% !!
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        // Clear Tasks in Local Storage
        updateLocalStorage([]);
    }
}

// Filter Tasks

function filterTasks(e) {
    const filterInputVal = e.target.value.toLowerCase();
    const taskItems = document.querySelectorAll('.collection-item');
    taskItems.forEach(function(taskItem) {
        const taskItemText = taskItem.textContent.toLowerCase();

        if(taskItemText.indexOf(filterInputVal) != -1) {
            taskItem.classList.remove('hide');
        } else {
            taskItem.classList.add('hide');
        }
    });
}

/* Local Storage Functions */

// Initializing Local Storage

function initLocalStorage() {
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
        updateLocalStorage(tasks);
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Update Local Storage

function updateLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Storing a Task in Local Storage

function storeTaskInLocalStorage(task) {
    tasks.push(task);
    updateLocalStorage(tasks);
}

function removeTaskInLocalStorage(task) {
    const taskIndex = tasks.indexOf(task.trim());
    console.log(task.trim());
    console.log(tasks);
    if (taskIndex != -1) {
        tasks.splice(taskIndex, 1);
        updateLocalStorage(tasks);
    }
}