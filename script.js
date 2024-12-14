let list = document.getElementById('list');
let addBtn = document.getElementById('create');
let taskInput = document.getElementById('task'); 
let count =
document.getElementById('count');
let body = 
document.querySelector('body');
let taskZone = 
document.getElementById('task-box')

let listTask = [
  { 
    content: '',
    status: '' 
  }
];

let taskCount = listTask.length;

// Load tasks from local storage
if (localStorage.getItem('listTask') !== null) {
  listTask = JSON.parse(localStorage.getItem('listTask'));
  taskCount = listTask.length;
}


// Save tasks to local storage
function saveLocalStorage() {
  localStorage.setItem('listTask', JSON.stringify(listTask));
  localStorage.setItem('taskCount', JSON.stringify(taskCount));
}

// Render tasks to HTML
function addTaskToHTML() {
  list.innerHTML = '';
  count.textContent = taskCount;
  listTask.forEach((task, index) => {
    let newTask = document.createElement('div');
    newTask.classList.add(task.status);
    newTask.innerHTML = `
      <div class="ctask" id="ctask">
        <i class="fa-regular fa-check-circle completei" id="complete" onclick="completeTask(${index})"></i>
        <div class="task" id="task" contenteditable = "true" onInput = editTask(${index})>${task.content}</div>
        <i class="fa-regular fa-trash-can deletei" id="delete" onclick="deleteTask(${index})"></i>
      </div>
    `;
    list.appendChild(newTask);
  });
}

function editTask(index) {
    let taskText = document.querySelectorAll('.task')[index].innerText;
    listTask[index].content = taskText;
    saveLocalStorage();
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let content = taskInput.value;
  if (content !== '') {
    listTask.unshift({ content, status: 'doing' });
    taskCount++;
    addTaskToHTML();
    taskInput.value = '';
    saveLocalStorage();
  }
});


addTaskToHTML();

function completeTask(index) {
  listTask[index].status = 'complete';
  addTaskToHTML();
  saveLocalStorage();
}


function deleteTask(index) {
  listTask = listTask.filter((task, newIndex) => newIndex !== index);
  taskCount--;
  addTaskToHTML();
  saveLocalStorage();
}






