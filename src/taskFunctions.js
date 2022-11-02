/* eslint-disable import/no-cycle */
import { isThisWeek, isToday, parseISO } from 'date-fns';
import Project from './classes/Project';
import Task from './classes/Task';
import domManipulator from './UI/domManipulator';

const taskFunctions = (() => {
  const projectList = JSON.parse(localStorage.getItem('projectList')) || {
    All: new Project('All', 'All tasks'),
    Week: new Project('This Week', 'Tasks due this week.'),
    Today: new Project('Today', 'Tasks due today.'),
    'Default Project': new Project('Default Project', 'Tasks for home.'),
    'Another Project': new Project('Another Project', 'Another Project for testing purposes'),
    'Empty Project': new Project('Empty Project', 'This is a Demo for an empty project'),
  };

  if (!localStorage.getItem('projectList')) {
    projectList['Default Project'].taskList.push(
      new Task(
        'Get Groceries',
        'Check the list on the refridgerator for more details.',
        new Date(2022, 9, 15),
        'high',
        true,
      ),
      new Task(
        'Call Mom',
        "She's lonely...",
        new Date(2022, 10, 15),
        'medium',
      ),
      new Task(
        'Go To Dentist Appointment',
        'Toothaches hurt.',
        new Date(2022, 9, 17),
        'low',
      ),
      new Task(
        'Pay Electric Bill',
        'Past Due...',
        new Date(2022, 9, 13),
        'high',
      ),
      new Task(
        'Get a job',
        'Past Due...',
        new Date(),
        'high',
      ),
    );
    projectList['Another Project'].taskList.push(
      new Task(
        'Renew Passport',
        "You're going to travel somewhere",
        new Date(2022, 10, 24),
        'high',
      ),
      new Task(
        'Recycle batteries',
        'Yes, you can do that!',
        new Date(2022, 12, 25),
        'low',
      ),
    );
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  let currentProject = 'All';

  function getProjectList() {
    return projectList;
  }

  function getCurrentProject() {
    return currentProject;
  }

  function setCurrentProject(project) {
    currentProject = project;
  }

  function getUserProjects() {
    const userProjects = Object.keys(projectList);
    const allIndex = userProjects.indexOf('All');
    userProjects.splice(allIndex, 1);
    const todayIndex = userProjects.indexOf('Today');
    userProjects.splice(todayIndex, 1);
    const weekIndex = userProjects.indexOf('Week');
    userProjects.splice(weekIndex, 1);
    return userProjects;
  }

  function addProject(title, description) {
    const project = new Project(title, description);
    projectList[title] = project;
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  function addTask(title, description, dueDate, priority) {
    const task = new Task(title, description, new Date(dueDate), priority);
    projectList[currentProject].taskList.push(task);
    localStorage.setItem('projectList', JSON.stringify(projectList));
    domManipulator.renderProject(projectList[currentProject]);
  }

  function removeTask(id) {
    projectList[currentProject].taskList = projectList[currentProject].taskList.filter(
      (task) => task.id !== id,
    );
    localStorage.setItem('projectList', JSON.stringify(projectList));
    domManipulator.renderProject(projectList[currentProject]);
  }

  function editTask(id, title, description, dueDate, priority) {
    const target = projectList[currentProject].taskList.find((task) => task.id === id);
    target.title = title;
    target.description = description;
    target.dueDate = dueDate;
    target.priority = priority;
    localStorage.setItem('projectList', JSON.stringify(projectList));
    domManipulator.renderProject(projectList[currentProject]);
  }

  function toggleCompleteTask(task) {
    // eslint-disable-next-line no-param-reassign
    task.isCompleted = !task.isCompleted; // this should always be a Task() object
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
      domManipulator.updateNav(projectTitle);
    } else if (projectTitle === 'Today') {
      domManipulator.renderTodaysTasks(projectList);
      domManipulator.renderProjectNames(projectList);
      domManipulator.updateNav(projectTitle);
    } else if (projectTitle === 'Week') {
      domManipulator.renderWeeklyTasks(projectList);
      domManipulator.renderProjectNames(projectList);
      domManipulator.updateNav(projectTitle);
    } else {
      const project = projectList[projectTitle];
      domManipulator.renderProject(project);
      domManipulator.renderProjectNames(projectList);
    }
  }

  function getTasksDueThisWeek() {
    const userProjects = getUserProjects();
    const tasksDueThisWeek = [];
    userProjects.forEach((project) => {
      projectList[project].taskList.forEach((task) => {
        if (isThisWeek(parseISO(task.dueDate))) {
          tasksDueThisWeek.push(task);
        }
      });
    });
    return tasksDueThisWeek;
  }

  function getTasksDueToday() {
    const tasksDueToday = [];
    const userProjects = getUserProjects();
    userProjects.forEach((project) => {
      projectList[project].taskList.forEach((task) => {
        if (isToday(parseISO(task.dueDate))) {
          tasksDueToday.push(task);
        }
      });
    });

    return tasksDueToday;
  }

  return {
    getProjectList,
    getCurrentProject,
    setCurrentProject,
    getUserProjects,
    addProject,
    addTask,
    removeTask,
    editTask,
    toggleCompleteTask,
    changeView,
    getTasksDueThisWeek,
    getTasksDueToday,
  };
})();

export default taskFunctions;
