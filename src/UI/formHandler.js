/* eslint-disable import/no-cycle */
import domManipulator from './domManipulator';
import taskFunctions from '../taskFunctions';

const formHandler = (() => {
  const taskModal = document.getElementById('task-modal');
  const projectModal = document.getElementById('project-modal');
  const editModal = document.getElementById('edit-modal');
  const detailsModal = document.getElementById('details-modal');
  const taskForm = document.getElementById('new-task-form');
  const projectForm = document.getElementById('new-project-form');
  const editForm = document.getElementById('edit-task-form');

  function openTaskModal() {
    taskModal.classList.add('modal-active');
  }

  function openProjectModal() {
    projectModal.classList.add('modal-active');
  }

  function openEditModal(task) {
    const {
      title, description, dueDate, priority,
    } = task;
    editForm.task.value = title;
    editForm.task.dataset.id = task.id;
    editForm['task-description'].value = description;
    console.log(dueDate);
    console.log(typeof dueDate);
    editForm.priority.value = priority;
    editModal.classList.add('modal-active');
  }

  function openDetailsModal(task) {
    const {
      title, description, dueDate, priority,
    } = task;
    document.getElementById('task-info__title').textContent = title;
    document.getElementById('task-info__description').textContent = description;
    document.getElementById('task-info__duedate').textContent = dueDate;
    document.getElementById('task-info__priority').textContent = priority;
    detailsModal.classList.add('modal-active');
  }

  function closeTaskModal() {
    taskForm.reset();
    taskModal.classList.remove('modal-active');
  }

  function closeProjectModal() {
    projectForm.reset();
    projectModal.classList.remove('modal-active');
  }

  function closeEditModal() {
    editForm.reset();
    editForm.task.dataset.id = '';
    editModal.classList.remove('modal-active');
  }

  function closeDetailsModal() {
    detailsModal.classList.remove('modal-active');
  }

  function handleNewProjectSubmit(e) {
    e.preventDefault();
    const title = projectForm['project-title'].value;
    const desc = projectForm['project-description'].value;
    taskFunctions.addProject(title, desc);
    domManipulator.renderProjectNames();
    closeProjectModal();
  }

  function handleNewTask(e) {
    e.preventDefault();
    taskFunctions.addTask(
      taskForm.task.value,
      taskForm['task-description'].value,
      taskForm['due-date'].value,
      taskForm.priority.value,
    );
    closeTaskModal();
  }

  function handleEdit(e) {
    e.preventDefault();
    taskFunctions.editTask(
      editForm.task.dataset.id,
      editForm.task.value,
      editForm['task-description'].value,
      editForm['due-date'].value,
      editForm.priority.value,
    );
    closeEditModal();
  }

  return {
    openTaskModal,
    openProjectModal,
    openEditModal,
    openDetailsModal,
    closeTaskModal,
    closeProjectModal,
    closeEditModal,
    closeDetailsModal,
    handleNewProjectSubmit,
    handleNewTask,
    handleEdit,
  };
})();

export default formHandler;
