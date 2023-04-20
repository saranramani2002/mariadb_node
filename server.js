const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TaskDetails = require("./model/table");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get all tasks
app.get('/getAllTasks', async (req, res) => {
  try {
    const tasks = await TaskDetails.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while fetching tasks' });
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  try {
    const task = await TaskDetails.create({ task_name: title });
    const id = task.id;
    res.status(201).json({ id: id, task_name: title });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating task' });
  }
});


// Updating existing task
app.put("/tasks", async (req, res) => {
  const { id } = req.query;
  const { task_name } = req.body;
  try {
    const result = await Task.findByIdAndUpdate(
      { _id: id },
      { task_name },
      { new: true }
    );
    res.json({ message: "Task updated successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Unable to update task", message: err });
  }
});

// Deleting existing task
app.delete("/tasks", async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Task.deleteOne({ _id: id });
    res.json({ message: "Task deleted successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Unable to delete task", message: err });
  }
});

//Server starting
const server = 
app.listen(8080, () => {
  console.log('Server listening on port',server.address().port);
});
