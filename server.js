const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TaskDetails = require("./model/table");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get all tasks API
app.get('/getAllTasks', async (req, res) => {
  try {
    const tasks = await TaskDetails.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while fetching tasks' });
  }
});

// Create a new task API
app.post('/tasks', async (req, res) => {
  const {id:task_id, title: task_name } = req.body;
  console.log(req.body)
  try {
    const task = await TaskDetails.create({ task_name });
    res.status(201).json({ id: task_id, task_name: task.task_name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating task' });
  }
});

// Updating existing task API
app.put("/tasks", async (req, res) => {
  const { task_id, task_name } = req.body;
  try {
    const task = await TaskDetails.findOne({ where: { task_id: task_id } });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      await task.update({ task_name });
      res.json({ message: "Task updated successfully", task: task });
    }
  } catch (err) {
    res.status(500).json({ error: "Unable to update task", message: err });
  }
});

// Deleting existing task API
app.delete("/tasks", async (req, res) => {
  const { task_id } = req.body;
  try {
    const result = await TaskDetails.destroy({ where: { task_id: task_id } });
    if (result === 0) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.json({ message: "Task deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete task" });
  }
});

//Server starting
const server = app.listen(8080, () => {
  console.log('Server listening on port', server.address().port);
});
