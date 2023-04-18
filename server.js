const express = require("express");
const app = express();
const taskDetails = require("./dao/daofile");

//get all tasks from DB API
app.get("/getAllTasks", async (req, res) => {
  try {
    let tasks = await taskDetails.getAllTasks();
    let response = {
      data: tasks,
      message: "Task fetched successfully",
      code: 200,
      };
    res.send(response);
    console.log("tasks", tasks);  
  } catch (error) {
    console.log("Error ", error);
  }
});

//post task to DB API
app.post("/tasks", async (req, res) => {
  const newTask = req.body;
  try {
    const task = await taskDetails.createTask(newTask);
    res.status(201).json(task);
    console.log("task",task)
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Error while creating task" });
  }
});

//Update task to DB API
app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  try {
    const task = await taskDetails.updateTask(taskId, updatedTask);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
    console.log("task",task)
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Error while updating task" });
  }
  });

//delete task to DB API
app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await taskDetails.deleteTask(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
    console.log("task",task)
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Error while deleting task" });
  }
});

const server = app.listen(8080, function () {
  console.log("Listening on port ", server.address().port);
});
