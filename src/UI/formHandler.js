// dom functions defined here
import domManipulator from './domManipulator';
import taskFunctions from '../taskFunctions';

const formHandler = (() => {
    let taskModal = document.getElementById('task-modal');
    let projectModal = document.getElementById('project-modal');
    let editModal = document.getElementById('edit-modal');
    let detailsModal = document.getElementById('details-modal');
    let taskForm = document.getElementById('new-task-form');
    let projectForm = document.getElementById('new-project-form');
    let editForm = document.getElementById('edit-task-form');
    let projects = document.getElementById('projects');

    function openTaskModal() {
        taskModal.classList.add('modal-active');
    }

    function openProjectModal() {
        projectModal.classList.add('modal-active');
    }

    function openEditModal(task) {
        const { title, description, dueDate, priority} = task;
        editForm["task"].value = title;
        editForm["task"].dataset.id = task.id;
        editForm["task-description"].value = description;
        console.log(dueDate);
        console.log(typeof dueDate);
        editForm["priority"].value = priority;
        editModal.classList.add('modal-active');
    }

    function openDetailsModal(task) {
        const { title, description, dueDate, priority } = task;
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
        editForm["task"].dataset.id = "";
        editModal.classList.remove('modal-active');
    }

    function closeDetailsModal() {
        detailsModal.classList.remove('modal-active');
    }

    function handleNewProjectSubmit(e) {
        e.preventDefault();
        let title = projectForm["project-title"].value;
        let desc = projectForm["project-description"].value;
        let newProject = document.createElement('li');
        newProject.textContent = title;
        projects.appendChild(newProject);
        newProject.addEventListener('click', () => {
            newProject.classList.add('active');
        });
        taskFunctions.addProject(title, desc);
        closeProjectModal();
    }

    function handleNewTask(e) {
        e.preventDefault();
        taskFunctions.addTask(
            taskForm["task"].value,
            taskForm["task-description"].value,
            taskForm["due-date"].value,
            taskForm["priority"].value
        );
        closeTaskModal();
    }

    function handleEdit(e) {
        e.preventDefault();
        taskFunctions.editTask(
            editForm["task"].dataset.id,
            editForm["task"].value,
            editForm["task-description"].value,
            editForm["due-date"].value,
            editForm["priority"].value
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
        handleEdit
    }
})();

export default formHandler;