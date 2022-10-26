import './todoFunctions';
import domModule from './domModule';
import todoFunctions from './todoFunctions';
import Project from './classes/Project';
import Task from './classes/Task';
import renderer from './renderer';

var addProjectBtn = document.getElementById('add-project-btn');
var closeTaskBtn = document.getElementById('close-task');
var closeProjectBtn = document.getElementById('close-project');
var closeEditBtn = document.getElementById('close-edit');
var closeDetailsBtn = document.getElementById('close-details');
var nav = document.getElementById('nav');

// forms 
var newProjectForm = document.getElementById('new-project-form');
var newTaskForm = document.getElementById('new-task-form');
var editForm = document.getElementById('edit-task-form');

const projectList = JSON.parse(localStorage.getItem('projectList')) || {
    "All": new Project("All", "All tasks"),
    "Week": new Project("This Week", "Tasks due this week."),
    "Today": new Project("Today", "Tasks due today."),
    "Default Project": new Project("Default Project", "Tasks for home."),
    "Another Project": new Project("Another Project", "Another Project for testing purposes"),
    "Empty Project": new Project("Empty Project", "This is a Demo for an empty project")
};

if (!localStorage.getItem('projectList')) {
    projectList["Default Project"].addTask(
        new Task(
            "Get Groceries",
            "Check the list on the refridgerator for more details.",
            new Date(2022, 9, 15),
            "high",
            true
        )
    );
    projectList["Default Project"].addTask(
        new Task(
            "Call Mom",
            "She's lonely...",
            new Date(2022, 10, 15),
            "medium",
        )
    );
    projectList["Default Project"].addTask(
        new Task(
            "Go To Dentist Appointment",
            "Toothaches hurt.",
            new Date(2022, 9, 17),
            "low"
        )
    );
    projectList["Default Project"].addTask(
        new Task(
            "Pay Electric Bill",
            "Past Due...",
            new Date(2022, 9, 13),
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
addProjectBtn.addEventListener('click', domModule.openProjectModal)

closeTaskBtn.addEventListener('click', domModule.closeTaskModal);
closeProjectBtn.addEventListener('click', domModule.closeProjectModal);
closeEditBtn.addEventListener('click', domModule.closeEditModal);
closeDetailsBtn.addEventListener('click', domModule.closeDetailsModal);

newProjectForm.addEventListener('submit', domModule.handleNewProjectSubmit);
newTaskForm.addEventListener('submit', domModule.handleNewTask);
editForm.addEventListener('submit', (e) => domModule.handleEdit(e));

// initial load
// renderer.renderProject(projectList[todoFunctions.getCurrentProject()]);
renderer.renderAllTasks(projectList);
renderer.renderProjectNames(projectList);

export {projectList};