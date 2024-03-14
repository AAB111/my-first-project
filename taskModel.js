const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    id: String,
    description: String,
    status: String
});

const TaskModel = mongoose.model('Task',taskSchema);
module.exports = TaskModel;