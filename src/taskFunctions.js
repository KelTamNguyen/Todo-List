import Project from './classes/Project';
import Task from './classes/Task';
import {isThisWeek, isToday, parseISO } from 'date-fns';
import { projectList } from './index';
import domManipulator from './UI/domManipulator';

const taskFunctions = (() => {
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
    }
    
    function addTask(title, description, dueDate, priority) {
        let task = new Task(title, description, new Date(dueDate), priority);
        projectList[currentProject].taskList.push(task);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        domManipulator.renderProject(projectList[currentProject]);
    }
    
    function removeTask(id) {
        projectList[currentProject].taskList = projectList[currentProject].taskList.filter(task => task.id !== id);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        domManipulator.renderProject(projectList[currentProject]);
    }
    
    function editTask(id, title, description, dueDate, priority) {
        let target = projectList[currentProject].taskList.find(task => task.id === id);
        target.title = title;
        target.description = description;
        target.dueDate = dueDate;
        target.priority = priority;
        localStorage.setItem('projectList', JSON.stringify(projectList));
        domManipulator.renderProject(projectList[currentProject]);
    }

    function toggleCompleteTask(task) {
        let taskDOM = document.querySelector(`[data-id="${task.id}"]`);
        task.isCompleted = !task.isCompleted;
        taskDOM.classList.toggle('completed');
        localStorage.setItem('projectList', JSON.stringify(projectList));
    }

    function changeView(projectTitle) {
        // This is a backend function because the frontend needs the backend to change the current
        // project. Then, the backend will call make the proper calls to the renderer to change the
        // frontend
        setCurrentProject(projectTitle);
        if (projectTitle === 'All') {
            domManipulator.renderAllTasks(projectList);
            domManipulator.renderProjectNames(projectList);
            domManipulator.updateNav(projectTitle)
        } 
        else if (projectTitle === 'Today') {
            domManipulator.renderTodaysTasks(projectList);
            domManipulator.renderProjectNames(projectList);
            domManipulator.updateNav(projectTitle);
        }
        else if (projectTitle === 'Week') {
            domManipulator.renderWeeklyTasks(projectList);
            domManipulator.renderProjectNames(projectList);
            domManipulator.updateNav(projectTitle);
        }
        else {
            let project = projectList[projectTitle]
            domManipulator.renderProject(project);
            domManipulator.renderProjectNames(projectList);
        }
    }

    function getTasksDueThisWeek() {
        let customProjects = getCustomProjects();
        let tasksDueThisWeek = [];
        for (let project in customProjects) {
            customProjects[project].taskList.forEach(task => {
                if (isThisWeek(parseISO(task.dueDate))) {
                    tasksDueThisWeek.push(task);
                }
            })
        }
        return tasksDueThisWeek;
    }

    function getTasksDueToday() {
        let customProjects = getCustomProjects();
        let tasksDueToday = [];
        for (let project in customProjects) {
            customProjects[project].taskList.forEach(task => {
                if (isToday(parseISO(task.dueDate))) {
                    tasksDueToday.push(task);
                }
            })
        }
        return tasksDueToday;
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
        changeView,
        getTasksDueThisWeek,
        getTasksDueToday
    };
})();

export default taskFunctions;