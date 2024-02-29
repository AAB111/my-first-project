const { table } = require('console');
const EventEmitter = require('events');

class TodoList extends EventEmitter{
    constructor(){
        super();
        this.tasks = [];
    }
    addTask(description){
        const task = {
            id:Date.now,
            description,
            completed: false
        };
        this.tasks.push(task);
        this.emit('taskAdd',task);
    }
}
const todoList = new TodoList();
todoList.on('taskAdd', (task)=>{
    console.log(`New task created: ${task.description}`);
});
todoList.addTask('Выучить Node.js');