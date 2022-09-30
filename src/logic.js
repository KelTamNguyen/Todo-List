import Project from './classes/Project';
import Task from './classes/Task';
import {format} from 'date-fns';

const logic = (() => {
    const task = new Task(
        'Find a Job',
        'Go and get a job',
        new Date(),
        'high'
    );
    
    console.log(task);
    
    const p1 = new Project('first project');
    p1.addTask(task);
    console.log(p1);
})();

export default logic;