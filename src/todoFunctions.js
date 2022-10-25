import Project from './classes/Project';
import Task from './classes/Task';
import {format} from 'date-fns';
import { projectList } from './index';
import renderer from './renderer';

const todoFunctions = (() => {
    // let currentProject = "today";
    let currentProject = "Default Project";

    function getCurrentProject() {
        return currentProject;
    }

    function setCurrentProject(project) {
        currentProject = project;
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
        // renderer.renderProject(projectList[currentProject]);
    }

    function changeView(projectTitle) {
        // console.log(currentProject.taskList);
        todoFunctions.setCurrentProject(projectTitle);
        // console.log(todoFunctions.getCurrentProject());
        if (projectTitle === 'All') {
            renderer.renderAllTasks();
        }
        else {
            let project = projectList[projectTitle]
            console.log(project);
            renderer.renderProject(project);
            renderer.renderProjectNames(projectList)
        }
    }
    
    return {
        getCurrentProject,
        setCurrentProject,
        addProject,
        addTask,
        removeTask,
        editTask,
        toggleCompleteTask,
        changeView
    };
})();

export default todoFunctions;