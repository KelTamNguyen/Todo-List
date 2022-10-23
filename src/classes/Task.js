import { v4 as uuidv4 } from 'uuid';
export default class Task {
    constructor(title, description, dueDate, priority, isCompleted = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = isCompleted;
        this.id = uuidv4()
    }
}