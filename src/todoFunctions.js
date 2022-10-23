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

    function addProject(title, description) {
        let project = new Project(title, description);
        projectList[title] = project;
        localStorage.setItem('projectList', JSON.stringify(projectList));
        console.log(projectList);
    }
    
    function addTask(title, description, dueDate, priority) {
        let task = new Task(title, description, dueDate, priority);
        projectList[currentProject].taskList.push(task);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        renderer.renderProject(projectList[currentProject]);
    }
    
    function removeTask(id) {
        projectList[currentProject].taskList = projectList[currentProject].taskList.filter(task => task.id !== id);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        renderer.renderProject(projectList[currentProject]);
    }
    
    function editTask(title, description, dueDate, priority) {
        let id = projectList[currentProject].taskList.find(task => task.title === title).id;
        console.log(id);
    }
    
    return {
        addProject,
        getCurrentProject,
        editTask,
        removeTask,
        addTask
    };
})();

export default todoFunctions;