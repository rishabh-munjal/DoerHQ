const video_itr = [1, 2, 3, 4, 5];
let i = 1;
var TodoForm = document.querySelector('#todo-form');
var TodoFormInput = document.querySelector('#todo-input');
var TaskList = document.querySelector('#task-list');

// Load sound files
const taskCompleteSound = new Audio('/assets/Sound Effects/TaskComplete.mp3');
const taskDeleteSound = new Audio('/sounds/delete.mp3');

// Add Task Event Listener
TodoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    var TodoInput = TodoFormInput.value.trim();
    
    if (TodoInput !== '') {
        let taskId = 'task-' + new Date().getTime(); // Generate a unique ID for the task button

        // Create task item with a button and a task text
        let task = document.createElement('div');
        task.classList.add('flex', 'align-middle', 'justify-between', 'mb-4');
        
        // Add button and task text
        task.innerHTML = `
        <div class="flex align-middle">
          <button class="task-complete-button border-white w-6 h-6 border-2 rounded-full mr-4"></button>
          <span class="task-text">${TodoInput}</span>
        </div>
        <button class="task-delete-button w-5 h-5 mr-4 float-right">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"></path></svg>
        </button>
        `;

        // Append the new task to the task list
        TaskList.appendChild(task);

        // Attach event listener for task completion (using delegation)
        let taskCompleteButton = task.querySelector('.task-complete-button');
        let taskText = task.querySelector('.task-text');

        taskCompleteButton.addEventListener('click', function() {
            // Play sound on completion
            taskCompleteSound.play();
            
            // Toggle the completion style (strikethrough and button style)
            if (taskCompleteButton.classList.contains('bg-white')) {
                taskCompleteButton.classList.remove('bg-white'); // Mark as incomplete
                taskText.classList.remove('line-through'); // Remove strikethrough
            } else {
                taskCompleteButton.classList.add('bg-white'); // Mark as complete
                taskText.classList.add('line-through'); // Add strikethrough
            }
        });

        // Attach event listener for task deletion
        let taskDeleteButton = task.querySelector('.task-delete-button');
        taskDeleteButton.addEventListener('click', function() {
            // Play sound on deletion
            taskDeleteSound.play();
            
            // Remove the task from the DOM
            task.remove();
        });

        // Clear the input after task addition
        TodoFormInput.value = '';
    }
});

// Background video change function
function ChangeVideo() {
    const video = document.getElementById('background-video');
    const source = video.querySelector('source');
    const newVideoSource = `/assets/${video_itr[i]}.mp4`;
    source.setAttribute('src', newVideoSource);
    video.load();
    i++;
    if (i > 4) {
        i = 0;
    }


}
//Digital Clock
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    let ampm = "AM";
    
    if (hours >= 12) {
        ampm = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    } else if (hours === 0) {
        hours = 12;
    }

    hours = String(hours).padStart(2, '0');
    clock.innerHTML = `${hours}:${minutes} <span class="text-yellow-500 text-sm font-bold"> ${ampm} </span>`;
}

setInterval(updateClock, 1000);
updateClock();



