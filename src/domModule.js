// dom functions defined here

const domModule = (() => {
    let taskModal = document.getElementById('task-modal');
    let projectModal = document.getElementById('project-modal');
    let editModal = document.getElementById('edit-modal');
    let taskForm = document.getElementById('new-task-form');
    let projectForm = document.getElementById('new-project-form');
    let editForm = document.getElementById('edit-task-form');

    function openTaskModal() {
        taskModal.classList.add('modal-active');
    }

    function openProjectModal() {
        projectModal.classList.add('modal-active');
    }

    function openEditModal() {
        editModal.classList.add('modal-active');
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
        editModal.classList.remove('modal-active');
    }

    return {
        openTaskModal,
        openProjectModal,
        openEditModal,
        closeTaskModal,
        closeProjectModal,
        closeEditModal
    }
})();

export default domModule;