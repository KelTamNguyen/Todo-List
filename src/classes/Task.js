import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
export default class Task {
    constructor(title, description, dueDate, priority, isCompleted = false) {
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, 'yyyy-MM-dd');
        this.priority = priority;
        this.isCompleted = isCompleted;
        this.id = uuidv4()
    }
}