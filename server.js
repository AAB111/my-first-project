const TaskManager = require('./task-manager');
const express = require('express');
const TaskModel = require('./taskModel');
const mongo = require('./index')
const validateTaskData = require('./middlewares/validateTaskData');
const cors = require('cors')
const taskManager = new TaskManager();
// taskManager.loadTasks();
mongo();
const app = express();
const corsOptions = {
    origin: 'http://127.0.0.1:5501',
    method: ['GET','POST','DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    preflightContinue: true
  }
app.use([express.json(),cors(corsOptions)]);

const PORT = process.env.PORT || 3000;

const taskRouter = express.Router();
app.use('/tasks',taskRouter);

taskRouter.get('/', async (req,res)=>{
    try{
        const tasks = await TaskModel.find();
        res.json(tasks);
    }
    catch (err){
        res.status(500).send(err.message);
    }
});

taskRouter.post('/',validateTaskData,async (req,res)=>{
    try
    {
        taskManager.once('taskAdd',(result)=>{
            res.status(201).json(result);
        });
        const newTask = new TaskModel(req.body);
        await taskManager.addTask(newTask)
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

// taskRouter.delete('/:id',async (req,res)=>{
//     try
//     {
//         taskManager.once('taskRemove',(result)=>{
//             if (result != null)
//             {
//                 res.status(200).json(result);
//             }
//             else{
//                 res.status(404).send("Not found");
//             }
//         });
//         await taskManager.removeTaskById(req.params.id);
//     }
//     catch (err){
//         res.status(500).send(err.message);
//     }
// });
taskRouter.delete('/:status',async (req,res)=>{
    try{
        taskManager.once('taskRemoveByStatus',(result)=>{
            res.status(200).json(result);
        });
        await taskManager.removeTaskByStatus(req.params.status.toLowerCase());
    }
    catch (err){
        res.status(500).send(err.message);
    }
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});