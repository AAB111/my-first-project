const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: String,
    status: String
},{
    versionKey: false
});

const TaskModel = mongoose.model('Task',taskSchema);
module.exports = TaskModel;