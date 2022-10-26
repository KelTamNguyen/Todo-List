import todoFunctions from "./todoFunctions";
import domModule from "./domModule";

const renderer = (() => {
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
        checkBox.addEventListener('click', () => todoFunctions.toggleCompleteTask(task));
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
        details.addEventListener('click', () => domModule.openDetailsModal(task));
        let editTask = document.createElement('span');
        editTask.classList.add('material-symbols-outlined', 'edit');
        editTask.textContent = 'edit';
        editTask.addEventListener('click', () => domModule.openEditModal(task));
        let deleteTask = document.createElement('span');
        deleteTask.classList.add('material-symbols-outlined', 'delete');
        deleteTask.textContent = 'delete';
        deleteTask.addEventListener('click', () => todoFunctions.removeTask(task.id));
        actions.append(details, deadline, editTask, deleteTask);
        taskDOM.append(taskLabel, actions);
        return taskDOM;
    }

    function renderProject(currentProject) {
        console.log(currentProject);

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
        addTaskBtn.addEventListener('click', domModule.openTaskModal);

        main.append(projectTitle, divider, todoList, addTaskBtn);
    }

    function renderProjectNames(projectList) {
        let recurring = document.getElementById('nav');
        let all = document.getElementById('all');
        let today = document.getElementById('today');
        let week = document.getElementById('week');
        let projects = document.getElementById('projects');

        all.addEventListener('click', () => todoFunctions.changeView('All'));
        today.addEventListener('click', () => todoFunctions.changeView('Today'));
        week.addEventListener('click', () => todoFunctions.changeView('Week'));

        let customProjects = todoFunctions.getCustomProjects();
        projects.innerHTML = '';

        for (let project in customProjects) {
            let item = document.createElement('li');
            item.textContent = project;
            item.addEventListener('click', () => todoFunctions.changeView(project));
            if (project === todoFunctions.getCurrentProject()) {
                item.classList.add('active')
            }
            projects.append(item);
        }
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
        let customProjects = todoFunctions.getCustomProjects();
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
        addTaskBtn.addEventListener('click', domModule.openTaskModal);

        main.append(projectTitle, divider, todoList, addTaskBtn);
    }

    function renderTodaysTasks(projectList) {

    }

    function renderWeeklyTasks(projectList) {

    }

    return {
        renderProject,
        renderProjectNames,
        renderAllTasks,
        renderTodaysTasks,
        renderWeeklyTasks
    }
})();

export default renderer;