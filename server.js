const TaskManager = require('./task-manager');
const express = require('express');
const TaskModel = require('./taskModel');
const mongo = require('./index')
const validateTaskData = require('./middlewares/validateTaskData');

const taskManager = new TaskManager();
// taskManager.loadTasks();
mongo();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const taskRouter = express.Router();
app.use('/tasks',taskRouter);

taskRouter.get('/', async(req,res)=>{
    try{
        const tasks = await TaskModel.find();
        res.json(tasks);
    }
    catch (err){
        res.status(500).send(err.message);
    }
});

taskRouter.post('/',validateTaskData,async (req,res)=>{
    try{
        const newTask = new TaskModel(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

taskRouter.delete('/:id',async (req,res)=>{
    taskManager.once('taskRemove',(result)=>{
        if (result != null)
        {
            res.status(200).json(result);
        }
        else{
            res.status(400).send("Not found");
        }
    });
    await taskManager.removeTask(req.params.id);
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});