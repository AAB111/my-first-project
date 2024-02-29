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
    taskManager.on('taskAdd',(task)=>{
        res.send("Add task\n" + task.toString());
    });
    taskManager.on('taskRemove',(task)=>{
        res.send("Remove task\n" + task.toString());
    });
    taskManager.addTask(new Task(Date.now(),'learn China','backlog'));
    // taskManager.removeTask(id=1709238999044)
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})