import Project from './classes/Project';
import Task from './classes/Task';
import {format} from 'date-fns';
import { projectList } from './index';
import renderer from './renderer';

const todoFunctions = (() => {
    let currentProject = "All";

    function getCurrentProject() {
        return currentProject;
    }

    function setCurrentProject(project) {
        currentProject = project;
    }

    function getCustomProjects() {
        let customProjects = Object.assign({}, projectList);
        delete customProjects["All"];
        delete customProjects["Today"];
        delete customProjects["Week"];
        return customProjects;
    }

    function addProject(title, description) {
        let project = new Project(title, description);
        projectList[title] = project;
        localStorage.setItem('projectList', JSON.stringify(projectList));
        console.log(projectList);
    }
    
    function addTask(title, description, dueDate, priority) {
        let task = new Task(title, description, new Date(dueDate), priority);
        projectList[currentProject].taskList.push(task);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        renderer.renderProject(projectList[currentProject]);
    }
    
    function removeTask(id) {
        projectList[currentProject].taskList = projectList[currentProject].taskList.filter(task => task.id !== id);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        renderer.renderProject(projectList[currentProject]);
    }
    
    function editTask(id, title, description, dueDate, priority) {
        let target = projectList[currentProject].taskList.find(task => task.id === id);
        target.title = title;
        target.description = description;
        target.dueDate = dueDate;
        target.priority = priority;
        localStorage.setItem('projectList', JSON.stringify(projectList));
        renderer.renderProject(projectList[currentProject]);
    }

    function toggleCompleteTask(task) {
        let taskDOM = document.querySelector(`[data-id="${task.id}"]`);
        task.isCompleted = !task.isCompleted;
        taskDOM.classList.toggle('completed');
        localStorage.setItem('projectList', JSON.stringify(projectList));
    }

    function changeView(projectTitle) {
        setCurrentProject(projectTitle);
        if (projectTitle === 'All') {
            renderer.renderAllTasks(projectList);
            renderer.renderProjectNames(projectList);
        } 
        else if (projectTitle === 'Today') {
            renderer.renderTodaysTasks(projectList);
            renderer.renderProjectNames(projectList);
        }
        else if (projectTitle === 'Week') {
            renderer.renderWeeklyTasks(projectList);
            renderer.renderProjectNames(projectList);
        }
        else {
            let project = projectList[projectTitle]
            renderer.renderProject(project);
            renderer.renderProjectNames(projectList);
        }
    }
    
    return {
        getCurrentProject,
        setCurrentProject,
        getCustomProjects,
        addProject,
        addTask,
        removeTask,
        editTask,
        toggleCompleteTask,
        changeView
    };
})();

export default todoFunctions;