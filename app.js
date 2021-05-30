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
    // Remove a Task
    taskList.addEventListener('click', removeTask);
    // Clear All Tasks
    clearBtn.addEventListener('click', clearAllTasks);
}

function addTask(e) {
    if(taskInput.value === ""){
        alert('Add a Task');
    } else {
        // Create A Task Li
        const taskLiTemplate = `
            <li class="collection-item">
                ${taskInput.value}
                <a href="#" class="delete-item secondary-content">
                    <i class="fa fa-remove"></i>
                </a>
            </li>
        `;

        taskList.insertAdjacentHTML('beforeend',taskLiTemplate);
    }
    e.preventDefault();
}

function removeTask(e) {
    const deleteBtn = e.target.parentElement;
    const taskLi = deleteBtn.parentElement;
    if (deleteBtn.classList.contains('delete-item')) {
        if (confirm('The task will be deleted, Do you want to continue?')) {
            taskLi.remove();
        }
    }

    e.preventDefault();
}

function clearAllTasks() {
    if(confirm('All Tasks will be deleted, do you want to continue?')) {
        // taskList.innerHTML = '';

        // Faster by 98% !!
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }
}