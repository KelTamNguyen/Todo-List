export default class Project {
    constructor(title, description) {
        this.taskList = [];
        this.title = title;
        this.description = description;
    }

    addTask(task) {
        this.taskList.push(task);
    }
}