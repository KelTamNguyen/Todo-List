import './styles/style.css';
import './logic';
import domModule from './domModule';

console.log('Logging from index.js!');
var recurring = document.getElementById('recurring');
var projects = document.getElementById('projects');
var todoList = document.getElementById('todo-list');
var addTaskBtn = document.getElementById('add-btn');
var addProjectBtn = document.getElementById('add-project-btn');
var closeTaskBtn = document.getElementById('close-task');
var closeProjectBtn = document.getElementById('close-project');
var editBtns = document.getElementsByClassName('edit');

console.log(recurring);
console.log(projects);
console.log(todoList);
console.log(addTaskBtn);

// add event listeners here
addTaskBtn.addEventListener('click', domModule.openTaskModal);
addProjectBtn.addEventListener('click', domModule.openProjectModal)

closeTaskBtn.addEventListener('click', domModule.closeTaskModal);
closeProjectBtn.addEventListener('click', domModule.closeProjectModal);

for (let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener('click', domModule.openEditModal);
}