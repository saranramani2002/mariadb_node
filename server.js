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
app.post("/task", async (req, res) => {
  const newTask = req.body;
  try {
<<<<<<< HEAD
    const task = await taskDetails.createTask(newTask);
    res.status(201).json(task);
=======
    let addTask = req.query.addTask;
    let tasks = await taskDetails.createTask(addTask);
    if (tasks) {
      response = {
        data: tasks,
        message: "task was created successfully",
        code: 200,
      };
    } else {
      response = {
        data: null,
        message: "Error while creating task",
        code: 500,
      };
    }
    // console.log(tasks);
    res.send(response);
  } catch (error) {
    response = {
      data: null,
      message: "Error while creating task",
      code: 500,
    };
    res.send(response);
    console.log("Error..", error);
  }
});

app.post("/tasks", async (req, res) => {
  const newTask = req.body;
  try {
    const task = await taskDetails.createTask(newTask);
    res.status(201).json(task);
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Error while creating task" });
  }
});

//update existing task into DB API
app.get("/updateTask", async (req, res) => {
  let response = {
    data: null,
    message: "",
    code: 200,
  };
  try {
    let taskId = req.query.taskId;
    let updatedTask = req.query.updatedTask;
    let tasks = await taskDetails.updateTask(taskId, updatedTask);
    if (tasks) {
      response = {
        data: tasks,
        message: "updated task successfully",
        code: 200,
      };
    } else {
      response = {
        data: null,
        message: "Error while updating task",
        code: 500,
      };
    }
    // console.log(tasks);
    res.send(response);
>>>>>>> b8795525bcacd36b501e6d957cdfe5264ad6e076
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Error while creating task" });
  }
});
<<<<<<< HEAD
//Update task to DB API
app.put("/updateTask/:id", async (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
=======

app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  try {
    const task = await taskDetails.updateTask(taskId, updatedTask);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Error while updating task" });
  }
});

//delete existing task into DB API
app.get("/deleteTask", async (req, res) => {
  let response = {
    data: null,
    message: "",
    code: 200,
  };
>>>>>>> b8795525bcacd36b501e6d957cdfe5264ad6e076
  try {
    const task = await taskDetails.updateTask(taskId, updatedTask);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Error while updating task" });
  }
});
<<<<<<< HEAD
//delete task to DB API
app.delete("/deleteTask/:id", async (req, res) => {
=======

app.delete("/tasks/:id", async (req, res) => {
>>>>>>> b8795525bcacd36b501e6d957cdfe5264ad6e076
  const taskId = req.params.id;
  try {
    const task = await taskDetails.deleteTask(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({ message: "Error while deleting task" });
  }
});

//get task by Id in DB API
// app.get("/getTaskById", async (req, res) => {
//   let response = {
//     data: null,
//     message: "",
//     code: 200,
//   };
//   try {
//     let taskId = req.query.taskId;
//     let tasks = await taskDetails.getTaskById(taskId);
//     if (tasks) {
//       response = {
//         data: tasks,
//         message: "Task fetched by Id successfully",
//         code: 200,
//       };
//     } else {
//       response = {
//         data: null,
//         message: "Error while fetching task by id",
//         code: 500,
//       };
//     }
//     // console.log(tasks);
//     res.send(response);
//   } catch (error) {
//     console.log("Error ", error);
//     response = {
//       data: null,
//       message: "Error while fetching task by id",
//       code: 500,
//     };
//     res.send(response);
//   }
// });

const server = app.listen(8080, function () {
  console.log("Listening on port ", server.address().port);
});
