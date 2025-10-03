
// script.js

// Wait for the DOM to load 
document.addEventListener('DOMContentLoaded', function () {
    // -------------------------
    // Step 1: Selecting DOM Elements
    // -------------------------
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // -------------------------
    // In-memory tasks array
    // -------------------------
    let tasks = [];

    // -------------------------
    // Save tasks array to Local Storage
    // -------------------------
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // -------------------------
    // Creating a task <li> element with a Remove button
    // -------------------------
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        // creating a text node for the task text so the button can be appended after it
        const textNode = document.createTextNode(taskText);
        li.appendChild(textNode);

        // creating a remove button and styling it via classList
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // ✅ using classList.add

        // Attach event listener to remove the task from DOM and Local Storage
        removeButton.addEventListener('click', function () {
            // Remove li from DOM
            if (li.parentElement === taskList) {
                taskList.removeChild(li);
            }

            // Remove the task from the tasks array (removes the first matching occurrence)
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        // Append the remove button to the list item
        li.appendChild(removeButton);

        return li;
    }

    // -------------------------
    // addTask: Add a new task to the list and optionally save it
    // -------------------------
    function addTask(taskText, save = true) {
        
        if (typeof taskText === 'undefined' || taskText === null) {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskText).trim();
        }

        // Validate non-empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create DOM element and append
        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        // If we're saving (normal user-add flow), update tasks array & Local Storage
        if (save) {
            tasks.push(taskText);
            saveTasks();
            // Clear input after successful add
            taskInput.value = '';
        }
    }

    // -------------------------
    // loadTasks: Load tasks from Local Storage and render them
    // -------------------------
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Ensure we have an array
        tasks = Array.isArray(storedTasks) ? storedTasks : [];

        // Clear current displayed list (in case)
        taskList.innerHTML = '';

        // Render each stored task without saving again
        tasks.forEach(taskText => addTask(taskText, false));
    }

    // Add Task button click
    addButton.addEventListener('click', function () {
        addTask(); // reads from input and saves
    });

    // Allow pressing Enter in the input field to add the task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // -------------------------
    // Initialize: load tasks on DOMContentLoaded
    // -------------------------
    loadTasks();
});
