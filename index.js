const Task = require('./task.js')
const task1 = new Task(tasks[0]['id'],tasks[0]['title'],tasks[0]['status']);
const task2 = new Task(tasks[1]['id'],tasks[1]['title'],tasks[1]['status']);
const task3 = new Task(tasks[2]['id'],tasks[2]['title'],tasks[2]['status']);

console.log(task1.toString())
console.log(task2.toString())
console.log(task3.toString())