const video_itr = [1 , 2 , 3 , 4 ,5];
let i = 0;
var TodoForm = document.querySelector('#todo-form')
var TodoFormInput = document.querySelector('#todo-input')
var TodoFormItemAddButton = document.querySelector('#todo-item-add')
var TaskList = document.querySelector('#task-list')

TodoFormItemAddButton.addEventListener('click' , function(e){
    var TodoInput = TodoFormInput.value;
    if (TodoInput.trim() != '') {
        let task = document.createElement('div')
        task.innerHTML = `<div class="flex items-center justify-start mb-4">
        <button id="task1" class="border-white w-6 h-6 border-2 rounded-full mr-4"></button>
        <span>${TodoInput}</span>
      </div>`
      TaskList.appendChild(task)
      TodoFormInput.value = ''

    }
})

document.querySelector('#task1').addEventListener('click',function(e){
    TaskList.removeChild(child)
})



function ChangeVideo(){
    const video = document.getElementById('background-video');
    const source = video.querySelector('source');
    const newVideoSource = `/assets/${video_itr[i]}.mp4`;
    source.setAttribute('src' , newVideoSource);
    video.load();
    i++;
    if(i > 4){
        i = 0;
    }
}




