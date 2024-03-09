const fs = require('fs')
const Task = require('./task.js');
const { Console } = require('console');
const EventEmitter = require('events');

class TaskManager extends EventEmitter{
    tasks = []
/*  
    loadTasks(){
        fs.readFile('./tasks.json','utf8', (err, data) => {
            if (err) {
                console.error('Ошибка чтения файла: ', err)
                return;
            }        
            JSON.parse(data).forEach(task => {
                const { id, description, status } = task;
                const newTask = new Task(id, description, status);
                this.tasks.push(newTask);
            });
        });  
    }
*/
    async loadTasks(){
        try {
            const data = await fs.promises.readFile('./tasks.json', 'utf8');
            const tasks = JSON.parse(data);
            tasks.forEach(task => {
                const { id, description, status } = task;
                const newTask = new Task(id, description, status);
                this.tasks.push(newTask);
            });
        } catch (err) {
            console.error('Ошибка чтения файла: ', err);
        }
    }

    printTasks(){
        this.tasks.forEach(task => {
            console.log(task.toString());
          });
    }

    addTask(task){
        if (task instanceof Task){
            if (this.tasks.some(taskList => taskList.id === task.id)){
                console.error("Повторение id")
            }
            this.tasks.push(task);
            this.saveTasks();
            this.emit('taskAdd',task);
            return;
        }
        else{
            this.emit('taskAdd',null);
        }
    }

    removeTask(id){
        const resIndex = this.tasks.findIndex((task)=>task.id == id)
        if (resIndex != -1){
            this.tasks.splice(resIndex,1);
            this.saveTasks();
            this.emit('taskRemove',resIndex);
        }
        else{
            this.emit('taskRemove',resIndex);
        }
    }

    saveTasks(){
        fs.writeFile('./tasks.json',JSON.stringify(this.tasks),err => {
            if (err) {
              console.error('Ошибка записи файла: ',err);
              return;
            }
            console.log('Запись завершена.')
        });
    }
}

module.exports = TaskManager;