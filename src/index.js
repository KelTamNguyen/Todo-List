import './taskFunctions';
import formHandler from './UI/formHandler';
import taskFunctions from './taskFunctions';
import Project from './classes/Project';
import Task from './classes/Task';
import domManipulator from './UI/domManipulator';

// buttons on the modals
var addProjectBtn = document.getElementById('add-project-btn');
var closeTaskBtn = document.getElementById('close-task');
var closeProjectBtn = document.getElementById('close-project');
var closeEditBtn = document.getElementById('close-edit');
var closeDetailsBtn = document.getElementById('close-details');

// forms 
var newProjectForm = document.getElementById('new-project-form');
var newTaskForm = document.getElementById('new-task-form');
var editForm = document.getElementById('edit-task-form');

// navigation links
let all = document.getElementById('all');
let today = document.getElementById('today');
let week = document.getElementById('week');

const projectList = JSON.parse(localStorage.getItem('projectList')) || {
    "All": new Project("All", "All tasks"),
    "Week": new Project("This Week", "Tasks due this week."),
    "Today": new Project("Today", "Tasks due today."),
    "Default Project": new Project("Default Project", "Tasks for home."),
    "Another Project": new Project("Another Project", "Another Project for testing purposes"),
    "Empty Project": new Project("Empty Project", "This is a Demo for an empty project")
};

if (!localStorage.getItem('projectList')) {
    projectList["Default Project"].taskList.push(
        new Task(
            "Get Groceries",
            "Check the list on the refridgerator for more details.",
            new Date(2022, 9, 15),
            "high",
            true
        ),
        new Task(
            "Call Mom",
            "She's lonely...",
            new Date(2022, 10, 15),
            "medium",
        ),
        new Task(
            "Go To Dentist Appointment",
            "Toothaches hurt.",
            new Date(2022, 9, 17),
            "low"
        ),
        new Task(
            "Pay Electric Bill",
            "Past Due...",
            new Date(2022, 9, 13),
            "high",
        ),
        new Task(
            "Get a job",
            "Past Due...",
            new Date(),
            "high",
        )
    );
    projectList["Another Project"].taskList.push(
        new Task(
            "Renew Passport",
            "You're going to travel somewhere",
            new Date(2022, 10, 24),
            "high"
        ),
        new Task(
            "Recycle batteries",
            "Yes, you can do that!",
            new Date(2022, 12, 25),
            "low"
        )
    );
    localStorage.setItem('projectList', JSON.stringify(projectList));
}

// add event listeners here
addProjectBtn.addEventListener('click', formHandler.openProjectModal)

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

// initial load
all.classList.add('active');
domManipulator.renderAllTasks(projectList);
domManipulator.renderProjectNames(projectList);

export {projectList};