const http = require('http');
const fs = require('fs');
const TaskManager = require('./task-manager');
const Task = require('./task');
const express = require('express');
const taskManager = new TaskManager();
taskManager.loadTasks();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>
{
    taskManager.once('taskAdd',(task)=>{
        if(task != null)
            res.send("Add task\n" + task.toString());
        else
            res.send('Неверные входные данные');
    });
    taskManager.addTask(new Task(Date.now(),'learn China','backlog'));
});
app.get('/remove/:id',(req,res)=>{
    const id = req.params.id;
    taskManager.once('taskRemove',(resIndex)=>{
        if (resIndex != -1){
            res.send("Remove task\n" + id.toString());
        }
        else
            res.send('Id not found')
    });
    taskManager.removeTask(id)
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})