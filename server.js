const TaskManager = require('./task-manager');
const express = require('express');
const TaskModel = require('./taskModel');
const mongo = require('./index')

const taskManager = new TaskManager();
// taskManager.loadTasks();
mongo();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get('/add/:desc',(req,res)=>
{
    const desc = req.params.desc;
    taskManager.once('taskAdd',(task)=>{
        if(task != null)
            res.send("Add task\n" + task.toString());
        else
            res.send('Неверные входные данные');
    });
    const jsonTask = {'id':Date.now().toString(),'description':desc,'status':'backlog'};
    taskManager.addTask(new TaskModel(jsonTask));
});

app.get('/remove/:id',(req,res)=>{
    const id = req.params.id;
    taskManager.once('taskRemove',(resIndex)=>{
        if (resIndex != null){
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