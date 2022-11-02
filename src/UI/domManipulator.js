/* eslint-disable import/no-cycle */
import taskFunctions from '../taskFunctions';
import formHandler from './formHandler';

const domManipulator = (() => {
  const main = document.querySelector('main');

  function createTask(task) {
    const taskDOM = document.createElement('div');
    taskDOM.classList.add('todo', `priority-${task.priority}`);
    taskDOM.dataset.id = task.id;
    if (task.isCompleted) taskDOM.classList.add('completed');
    const taskLabel = document.createElement('div');
    taskLabel.classList.add('task');
    const checkBox = document.createElement('div');
    checkBox.classList.add('task__checkbox');
    checkBox.addEventListener('click', () => {
      taskDOM.classList.toggle('completed');
      taskFunctions.toggleCompleteTask(task);
    });
    const taskTitle = document.createElement('p');
    taskTitle.classList.add('task__title');
    taskTitle.textContent = task.title;
    taskLabel.append(checkBox, taskTitle);
    const actions = document.createElement('div');
    actions.classList.add('actions');
    const deadline = document.createElement('p');
    deadline.textContent = task.dueDate;
    const details = document.createElement('span');
    details.classList.add('material-symbols-outlined', 'info');
    details.textContent = 'info';
    details.addEventListener('click', () => formHandler.openDetailsModal(task));
    const editTask = document.createElement('span');
    editTask.classList.add('material-symbols-outlined', 'edit');
    editTask.textContent = 'edit';
    editTask.addEventListener('click', () => formHandler.openEditModal(task));
    const deleteTask = document.createElement('span');
    deleteTask.classList.add('material-symbols-outlined', 'delete');
    deleteTask.textContent = 'delete';
    deleteTask.addEventListener('click', () => taskFunctions.removeTask(task.id));
    actions.append(details, deadline, editTask, deleteTask);
    taskDOM.append(taskLabel, actions);
    return taskDOM;
  }

  function renderProject(currentProject) {
    main.innerHTML = '';
    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-title');
    projectTitle.innerHTML = `
            <h2>${currentProject.title}</h2>
            <p>${currentProject.description}</p>
        `;
    const divider = document.createElement('div');
    divider.classList.add('divider');
    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');
    todoList.id = 'todo-list';
    currentProject.taskList.forEach((task) => {
      const todo = createTask(task);
      todoList.appendChild(todo);
    });

    const addTaskBtn = document.createElement('button');
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
    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-title');
    projectTitle.innerHTML = `
        <h2>${projectList.All.title}</h2>
        <p>${projectList.All.description}</p>
        `;
    const divider = document.createElement('div');
    divider.classList.add('divider');
    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');
    todoList.id = 'todo-list';
    const userProjects = taskFunctions.getUserProjects();
    userProjects.forEach((userProject) => {
      projectList[userProject].taskList.forEach((task) => {
        const todo = createTask(task);
        todoList.appendChild(todo);
      });
    });

    const addTaskBtn = document.createElement('button');
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
    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-title');
    projectTitle.innerHTML = `
        <h2>${projectList.Today.title}</h2>
        <p>${projectList.Today.description}</p>
        `;
    const divider = document.createElement('div');
    divider.classList.add('divider');
    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');
    todoList.id = 'todo-list';
    const tasksDueToday = taskFunctions.getTasksDueToday();
    tasksDueToday.forEach((task) => {
      const todo = createTask(task);
      todoList.appendChild(todo);
    });

    main.append(projectTitle, divider, todoList);
  }

  function renderWeeklyTasks(projectList) {
    main.innerHTML = '';
    const projectTitle = document.createElement('div');
    projectTitle.classList.add('project-title');
    projectTitle.innerHTML = `
        <h2>${projectList.Week.title}</h2>
        <p>${projectList.Week.description}</p>
        `;
    const divider = document.createElement('div');
    divider.classList.add('divider');
    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');
    todoList.id = 'todo-list';
    const tasksDueThisWeek = taskFunctions.getTasksDueThisWeek();
    tasksDueThisWeek.forEach((task) => {
      const todo = createTask(task);
      todoList.appendChild(todo);
    });

    main.append(projectTitle, divider, todoList);
  }

  function renderProjectNames() {
    const projects = document.getElementById('projects');
    projects.innerHTML = '';
    const userProjects = taskFunctions.getUserProjects();
    userProjects.forEach((userProject) => {
      const item = document.createElement('li');
      item.textContent = userProject;
      item.addEventListener('click', () => taskFunctions.changeView(userProject));
      if (userProject === taskFunctions.getCurrentProject()) {
        const nav = document.getElementById('nav');
        Array.from(nav.children).forEach((child) => {
          child.classList.remove('active');
        });
        item.classList.add('active');
      }
      projects.append(item);
    });
  }

  function updateNav(projectTitle) {
    const nav = document.getElementById('nav');
    const destination = document.getElementById(projectTitle.toLowerCase());
    Array.from(nav.children).forEach((child) => {
      child.classList.remove('active');
    });
    destination.classList.add('active');
  }

  return {
    renderProject,
    renderAllTasks,
    renderTodaysTasks,
    renderWeeklyTasks,
    renderProjectNames,
    updateNav,
  };
})();

export default domManipulator;
