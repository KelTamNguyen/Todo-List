import taskFunctions from './taskFunctions';
import formHandler from './UI/formHandler';
import domManipulator from './UI/domManipulator';

// buttons on the modals
const addProjectBtn = document.getElementById('add-project-btn');
const closeTaskBtn = document.getElementById('close-task');
const closeProjectBtn = document.getElementById('close-project');
const closeEditBtn = document.getElementById('close-edit');
const closeDetailsBtn = document.getElementById('close-details');

// forms
const newProjectForm = document.getElementById('new-project-form');
const newTaskForm = document.getElementById('new-task-form');
const editForm = document.getElementById('edit-task-form');

// navigation links
const all = document.getElementById('all');
const today = document.getElementById('today');
const week = document.getElementById('week');

// add event listeners here
addProjectBtn.addEventListener('click', formHandler.openProjectModal);

closeTaskBtn.addEventListener('click', formHandler.closeTaskModal);
closeProjectBtn.addEventListener('click', formHandler.closeProjectModal);
closeEditBtn.addEventListener('click', formHandler.closeEditModal);
closeDetailsBtn.addEventListener('click', formHandler.closeDetailsModal);

newProjectForm.addEventListener('submit', formHandler.handleNewProjectSubmit);
newTaskForm.addEventListener('submit', formHandler.handleNewTask);
editForm.addEventListener('submit', (e) => formHandler.handleEdit(e));

// navigation
all.addEventListener('click', () => taskFunctions.changeView('All'));
today.addEventListener('click', () => taskFunctions.changeView('Today'));
week.addEventListener('click', () => taskFunctions.changeView('Week'));

// Initialize the application showing all tasks
all.classList.add('active');
const projectList = taskFunctions.getProjectList();
domManipulator.renderAllTasks(projectList);
domManipulator.renderProjectNames(projectList);
taskFunctions.getUserProjects();
