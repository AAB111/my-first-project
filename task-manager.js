const fs = require('fs')
const EventEmitter = require('events');
const TaskModel = require('./taskModel.js');

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

    async addTask(task){
        const res = await task.save();
        this.emit('taskAdd',res);
    }

    async removeTaskById(id){
        const res = await TaskModel.findOneAndDelete({'_id':id});
        this.emit('taskRemove',res);
    }
    async removeTaskByStatus(status){
        let res = {}
        let count_delete = 0
        while(res != null){
            res = await TaskModel.findOneAndDelete({'status':status});
            count_delete += 1;
        }
        this.emit('taskRemove',count_delete);
    }

    async saveTasks(){
        try{
            await fs.promises.writeFile('./tasks.json',JSON.stringify(this.tasks))
            console.log('Запись завершена.')
        }
        catch (err) 
        {
            console.error('Ошибка записи файла: ',err);    
        }
    }
}

module.exports = TaskManager;