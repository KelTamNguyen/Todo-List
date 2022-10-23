import { projectList } from "./index";
import todoFunctions from "./todoFunctions";
import domModule from "./domModule";

const renderer = (() => {
    var main = document.querySelector('main');
    function renderProject(currentProject) {
        // const currentProject = projectList[todoFunctions.getCurrentProject()];
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
            let todo = document.createElement('div');
            todo.classList.add('todo', `priority-${task.priority}`);
            todo.dataset.id = task.id;
            if (task.isCompleted) todo.classList.add('completed');
            let taskLabel = document.createElement('div');
            taskLabel.classList.add('task');
            taskLabel.innerHTML = `
                <div class="task__checkbox"></div>
                <p class="task__title">${task.title}</p>
            `;
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
            todo.append(taskLabel, actions);
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

    function renderProjectNames() {
        
    }

    return {
        renderProject
    }
})();

export default renderer;