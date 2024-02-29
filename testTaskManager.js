const Task = require('./task');
const TaskManager = require('./task-manager');

const taskManager = new TaskManager();
taskManager.loadTasks();

setTimeout(function(){
    taskManager.addTask(new Task(2,'Выучить китайский','backlog'))
    taskManager.printTasks();

},600)