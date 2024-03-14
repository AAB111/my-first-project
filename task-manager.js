const fs = require('fs')
const { Console } = require('console');
const EventEmitter = require('events');
const TaskModel = require('./taskModel.js');
const { default: mongoose } = require('mongoose');
class TaskManager extends EventEmitter{
    tasks = []

    async loadTasks(){
        try 
        {
            const data = await fs.promises.readFile('./tasks.json', 'utf8');
            const tasksJSON = JSON.parse(data);
            this.tasks = tasksJSON.map((task) => {
                const newTask = new TaskModel(task);
                newTask.save();
                return newTask;
            });
        }
        catch (err) {
            console.error('Ошибка чтения файла: ', err);
        }
    }

    printTasks(){
        this.tasks.forEach(task => {
            console.log(task.toString());
          });
    }

    addTask(task){
        if (task instanceof TaskModel){
            if (this.tasks.some(taskList => taskList.id === task.id)){
                console.error("Повторение id")
            }
            this.tasks.push(task);
            console.log(task)
            task.save();
            this.emit('taskAdd',task);
            return;
        }
        else{
            this.emit('taskAdd',null);
        }
    }

    async removeTask(id){
        // const resIndex = this.tasks.findIndex((task)=>task.id == id)
        const res = await TaskModel.findOneAndDelete({'id':id})
        console.log(res)
        this.emit('taskRemove',res);
        // if (res['acknowledged'] != true){
        //     this.tasks.splice(resIndex,1);
        //     // this.saveTasks();
        // }
        // else{
        //     this.emit('taskRemove',resIndex);
        // }
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