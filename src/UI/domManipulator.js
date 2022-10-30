import taskFunctions from "../taskFunctions";
import formHandler from "./formHandler";

const domManipulator = (() => {
    var main = document.querySelector('main');

    function createTask(task) {
        let taskDOM = document.createElement('div');
        taskDOM.classList.add('todo', `priority-${task.priority}`);
        taskDOM.dataset.id = task.id;
        if (task.isCompleted) taskDOM.classList.add('completed');
        let taskLabel = document.createElement('div');
        taskLabel.classList.add('task');
        let checkBox = document.createElement('div');
        checkBox.classList.add('task__checkbox');
        checkBox.addEventListener('click', () => taskFunctions.toggleCompleteTask(task));
        let taskTitle = document.createElement('p');
        taskTitle.classList.add('task__title');
        taskTitle.textContent = task.title;
        taskLabel.append(checkBox, taskTitle);
        let actions = document.createElement('div');
        actions.classList.add('actions');
        let deadline = document.createElement('p');
        deadline.textContent = task.dueDate;
        let details = document.createElement('span');
        details.classList.add('material-symbols-outlined', 'info');
        details.textContent = 'info';
        details.addEventListener('click', () => formHandler.openDetailsModal(task));
        let editTask = document.createElement('span');
        editTask.classList.add('material-symbols-outlined', 'edit');
        editTask.textContent = 'edit';
        editTask.addEventListener('click', () => formHandler.openEditModal(task));
        let deleteTask = document.createElement('span');
        deleteTask.classList.add('material-symbols-outlined', 'delete');
        deleteTask.textContent = 'delete';
        deleteTask.addEventListener('click', () => taskFunctions.removeTask(task.id));
        actions.append(details, deadline, editTask, deleteTask);
        taskDOM.append(taskLabel, actions);
        return taskDOM;
    }

    function renderProject(currentProject) {
        main.innerHTML = '';
        let projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');
        projectTitle.innerHTML= `
            <h2>${currentProject.title}</h2>
            <p>${currentProject.description}</p>
        `;
        let divider = document.createElement('div');
        divider.classList.add('divider');
        let todoList = document.createElement('div');
        todoList.classList.add('todo-list');
        todoList.id = 'todo-list';
        currentProject.taskList.forEach(task => {
            let todo = createTask(task);
            todoList.appendChild(todo);
        });

        let addTaskBtn = document.createElement('button');
        addTaskBtn.classList.add('add-btn');
        addTaskBtn.innerHTML = `
            <span class="material-symbols-outlined">add</span>
            Add New Task
        `;
        addTaskBtn.addEventListener('click', formHandler.openTaskModal);

        main.append(projectTitle, divider, todoList, addTaskBtn);
    }

    
    function renderAllTasks(projectList) {
        main.innerHTML = '';
        let projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');
        projectTitle.innerHTML= `
        <h2>${projectList["All"].title}</h2>
        <p>${projectList["All"].description}</p>
        `;
        let divider = document.createElement('div');
        divider.classList.add('divider');
        let customProjects = taskFunctions.getCustomProjects();
        let todoList = document.createElement('div');
        todoList.classList.add('todo-list');
        todoList.id = 'todo-list';
        for (let project in customProjects) {
            projectList[project].taskList.forEach(task => {
                let todo = createTask(task);
                todoList.appendChild(todo);
            });
        }
        
        let addTaskBtn = document.createElement('button');
        addTaskBtn.classList.add('add-btn');
        addTaskBtn.innerHTML = `
            <span class="material-symbols-outlined">add</span>
            Add New Task
        `;
        addTaskBtn.addEventListener('click', formHandler.openTaskModal);
        
        main.append(projectTitle, divider, todoList, addTaskBtn);
    }
    
    function renderTodaysTasks(projectList) {
        main.innerHTML = '';
        let projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');
        projectTitle.innerHTML= `
        <h2>${projectList["Today"].title}</h2>
        <p>${projectList["Today"].description}</p>
        `;
        let divider = document.createElement('div');
        divider.classList.add('divider');
        let todoList = document.createElement('div');
        todoList.classList.add('todo-list');
        todoList.id = 'todo-list';
        let tasksDueToday = taskFunctions.getTasksDueToday();
        tasksDueToday.forEach(task => {
            let todo = createTask(task);
            todoList.appendChild(todo);
        })

        main.append(projectTitle, divider, todoList);
    }
    
    function renderWeeklyTasks(projectList) {
        main.innerHTML = '';
        let projectTitle = document.createElement('div');
        projectTitle.classList.add('project-title');
        projectTitle.innerHTML= `
        <h2>${projectList["Week"].title}</h2>
        <p>${projectList["Week"].description}</p>
        `;
        let divider = document.createElement('div');
        divider.classList.add('divider');
        let todoList = document.createElement('div');
        todoList.classList.add('todo-list');
        todoList.id = 'todo-list';
        let tasksDueThisWeek = taskFunctions.getTasksDueThisWeek();
        tasksDueThisWeek.forEach(task => {
            let todo = createTask(task);
            todoList.appendChild(todo);
        })

        main.append(projectTitle, divider, todoList);
    }
    
    function renderProjectNames() {
        let projects = document.getElementById('projects');
        let customProjects = taskFunctions.getCustomProjects();
        projects.innerHTML = '';

        for (let project in customProjects) {
            let item = document.createElement('li');
            item.textContent = project;
            item.addEventListener('click', () => taskFunctions.changeView(project));
            if (project === taskFunctions.getCurrentProject()) {
                // there is probably a better way to handle changing the sidebar than this
                for (let i = 0; i < nav.children.length; i++) {
                    nav.children[i].classList.remove('active');
                }
                item.classList.add('active')
            }
            projects.append(item);
        }
    }

    function updateNav(projectTitle) {
        let nav = document.getElementById('nav');
        let destination = document.getElementById(projectTitle.toLowerCase());
        for (let i = 0; i < nav.children.length; i++) {
            nav.children[i].classList.remove('active');
        }
        destination.classList.add('active');
    }

    return {
        renderProject,
        renderAllTasks,
        renderTodaysTasks,
        renderWeeklyTasks,
        renderProjectNames,
        updateNav
    }
})();

export default domManipulator;