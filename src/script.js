const video_itr = [1, 2, 3, 4, 5];
let i = 0;
var TodoForm = document.querySelector('#todo-form');
var TodoFormInput = document.querySelector('#todo-input');
var TaskList = document.querySelector('#task-list');

// Add Task Event Listener
TodoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    var TodoInput = TodoFormInput.value.trim();
    
    if (TodoInput !== '') {
        let taskId = 'task-' + new Date().getTime(); // Generate a unique ID for the task button

        // Create task item with a button and a task text
        let task = document.createElement('div');
        task.classList.add('flex', 'items-center', 'justify-start', 'mb-4');
        
        // Add button and task text
        task.innerHTML = `
            <button class="task-complete-button border-white w-6 h-6 border-2 rounded-full mr-4"></button>
            <span class="task-text">${TodoInput}</span>
        `;

        // Append the new task to the task list
        TaskList.appendChild(task);

        // Attach event listener for task completion (using delegation)
        let taskCompleteButton = task.querySelector('.task-complete-button');
        let taskText = task.querySelector('.task-text');

        taskCompleteButton.addEventListener('click', function() {
            // Toggle the completion style (strikethrough and button style)
            if (taskCompleteButton.classList.contains('bg-white')) {
                taskCompleteButton.classList.remove('bg-white'); // Mark as incomplete
                taskText.classList.remove('line-through'); // Remove strikethrough
            } else {
                taskCompleteButton.classList.add('bg-white'); // Mark as complete
                taskText.classList.add('line-through'); // Add strikethrough
            }
        });

        TodoFormInput.value = ''; // Clear the input after task addition
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
