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

// Digital Clock
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

// Hold functionality for increment and decrement
let sessionIncrementInterval;
let sessionDecrementInterval;
// let totalSessionsIncrementInterval;
// let totalSessionsDecrementInterval;

function clearSessionInterval() {
    clearInterval(sessionIncrementInterval);
    clearInterval(sessionDecrementInterval);
}

// function clearTotalSessionsInterval() {
//     clearInterval(totalSessionsIncrementInterval);
//     clearInterval(totalSessionsDecrementInterval);
// }

document.getElementById('session-increment').addEventListener('mousedown', function() {
    let input = document.getElementById('session-length');
    let value = parseInt(input.value);
    if (value < 180) { // Changed max value to 180
        input.value = value + 1;
    }
    sessionIncrementInterval = setInterval(function() {
        value = parseInt(input.value);
        if (value < 180) {
            input.value = value + 1;
        }
    }, 100); // Increase every 200 ms
});

document.getElementById('session-decrement').addEventListener('mousedown', function() {
    let input = document.getElementById('session-length');
    let value = parseInt(input.value);
    if (value > 1) { // Changed min value to 1
        input.value = value - 1;
    }
    sessionDecrementInterval = setInterval(function() {
        value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
        }
    }, 100); // Decrease every 200 ms
});

document.getElementById('session-increment').addEventListener('mouseup', clearSessionInterval);
document.getElementById('session-increment').addEventListener('mouseleave', clearSessionInterval);
document.getElementById('session-decrement').addEventListener('mouseup', clearSessionInterval);
document.getElementById('session-decrement').addEventListener('mouseleave', clearSessionInterval);

// document.getElementById('sessions-increment').addEventListener('mousedown', function() {
//     let input = document.getElementById('total-sessions');
//     let value = parseInt(input.value);
//     if (value < 24) { // Changed max value to 24
//         input.value = value + 1;
//     }
//     totalSessionsIncrementInterval = setInterval(function() {
//         value = parseInt(input.value);
//         if (value < 24) {
//             input.value = value + 1;
//         }
//     }, 100); // Increase every 200 ms
// });

// document.getElementById('sessions-decrement').addEventListener('mousedown', function() {
//     let input = document.getElementById('total-sessions');
//     let value = parseInt(input.value);
//     if (value > 1) { // Changed min value to 1
//         input.value = value - 1;
//     }
//     totalSessionsDecrementInterval = setInterval(function() {
//         value = parseInt(input.value);
//         if (value > 1) {
//             input.value = value - 1;
//         }
//     }, 100); // Decrease every 200 ms
// });

// document.getElementById('sessions-increment').addEventListener('mouseup', clearTotalSessionsInterval);
// document.getElementById('sessions-increment').addEventListener('mouseleave', clearTotalSessionsInterval);
// document.getElementById('sessions-decrement').addEventListener('mouseup', clearTotalSessionsInterval);
// document.getElementById('sessions-decrement').addEventListener('mouseleave', clearTotalSessionsInterval);


let timerMinutes;
let timerMinutesPrev;
let timerSeconds;
var PomodoroStartButton = document.querySelector('.pomodoro-button');
var PomodoroForm  = document.querySelector('#number-form');

PomodoroStartButton.addEventListener('click', function(e) {
    e.preventDefault();

    timerMinutes = parseInt(document.querySelector('#session-length').value);
    timerMinutesPrev = timerMinutes; 
    timerSeconds = 0;
    PomodoroForm.style.display = 'none'; 

    document.querySelector('#pomodoro-timer-container').innerHTML = `
    <div class="timer">
      <div class="relative flex flex-col items-center justify-between h-full py-4">
        <div class="pomodoro-complete-count w-full h-1 rounded-full overflow-hidden">
          <div id="progress-bar" class="h-full bg-slate-100 rounded-full transition-all ease-in-out" style="width: 0%;"></div>
        </div>
        <div class="main-timer bg-white bg-opacity-5 backdrop-blur-md w-[9.6rem] h-[9.6rem] rounded-full flex items-center justify-center mt-6">
          <h1 id="pomodoro-timer-h1" class="text-3xl"></h1>
        </div>
        <div class="mt-6 flex ">
          <button class="pomodoro-reset flex items-center justify-center m-2 h-8 w-24 bg-slate-600 bg-opacity-45 border border-white border-opacity-20 backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-20 hover:scale-105">
                Reset
          </button>
            <button class="pomodoro-back flex items-center justify-center  m-2 h-8 w-24 bg-slate-600 bg-opacity-45 border border-white border-opacity-20 backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-20 hover:scale-105">
                Back
          </button>
        </div>
      </div>
    </div> 
    `;

    document.querySelector('.pomodoro-reset').addEventListener('click', function(e) {
      console.log("EST");
  
      timerMinutes = timerMinutesPrev;
      totalTimeInSeconds = timerMinutesPrev * 60;
      timerSeconds = 0;
  
      // Reset the progress bar width
      const progressBar = document.getElementById('progress-bar');
      progressBar.style.width = '0%';
  });
  


    document.querySelector('.pomodoro-back').addEventListener('click',function(e){

        PomodoroForm.style.display = 'none'; 
        

        document.querySelector('#pomodoro-timer-container').innerHTML = `
                <form id="number-form" class="flex flex-col justify-between items-center h-full">


      <!-- <div class="flex justify-evenly w-full"> -->
        <!-- <div class="number-input flex flex-col justify-between place-items-center mb-4"> -->

          <button type="button" id="session-increment" class="mb-2 w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z">
              </path>
            </svg>
          </button>
          <input type="number" id="session-length" name="session-length" min="25" max="180" value="25" readonly
            class="mb-2 w-full  text-center text-2xl  h-14  bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-20 shadow-lg ">
          <button type="button" id="session-decrement" class="w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z">
              </path>
            </svg></button>
          <label for="session-length" class="font-medium mb-4">Session Length (min)</label>
        <!-- </div> -->


        <!-- <div class="number-input flex flex-col items-center mb-4">

          <button type="button" id="sessions-increment" class="mb-2 h-6 w-6"><svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z">
              </path>
            </svg>
          </button></button>
          <input type="number" id="total-sessions" name="total-sessions" min="1" max="24" value="1" readonly
            class="mb-2 leading-loose w-full text-center text-2xl  bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-20 shadow-lg h-14">
          <button type="button" id="sessions-decrement" class="w-6 h-6"><svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z">
              </path>
            </svg></button>
          <label for="total-sessions" class="font-medium  mb-4"> Total Sessions</label>
        </div> -->
      <!-- </div> -->

      <button type="submit"
        class="pomodoro-button  font-semibold text-white bg-slate-600 bg-opacity-45 border border-white border-opacity-20 backdrop-blur-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-opacity-20 hover:scale-105">
        Start focusing....
      </button>

    </form>

        `;
        
    })


    // Add the event listener for the "Done" button after it's created

    startTimer(); // Start the timer with the global variables
});



function startTimer(){
    var ProgressBar = document.querySelector('#progress-bar');
    
    // Calculate the total time in seconds for the current session
    var totalTimeInSeconds = timerMinutes * 60;
    var remainingTimeInSeconds = timerMinutes * 60;;

    var interval = setInterval(() => {
        if(timerSeconds === 0){
            if(timerMinutes === 0){
                clearInterval(interval);
                
                return;
            }
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }

        // Update the remaining time
        remainingTimeInSeconds--;

        // Calculate the percentage of time elapsed
        var percentageComplete = ((totalTimeInSeconds - remainingTimeInSeconds) / totalTimeInSeconds) * 100;
        
        // Update the progress bar width
        ProgressBar.style.width = `${percentageComplete}%`;

        // Update the timer display
        document.querySelector('#pomodoro-timer-h1').textContent = `${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;
        
    }, 1000);
}


var musicPlayer = document.querySelector('.music-player');
var musicPlayerForm = document.querySelector('.music-form');
var musicPlayerInput = document.querySelector('.playlist-input');

document.querySelector('.playlist-input-button').addEventListener('click' , function(e){
    var playlistlink = musicPlayerInput.value;
    musicPlayerForm.style.display = 'none';
    musicPlayer.innerHTML = `
      ${playlistlink}
    `

    var iframe = document.getElementsByTagName('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';

})




