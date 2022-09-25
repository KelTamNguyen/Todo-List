export default class Project {
    constructor(title) {
        this.taskList = [];
        this.title = title;
    }

    addTask(task) {
        this.taskList.push(task);
    }
}