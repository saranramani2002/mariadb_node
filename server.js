const express = require("express");
const app = express();
const taskDetails = require("../mariadb_node/dao/daofile");

//get all tasks from DB API
app.get("/getAllTasks", async (req, res) => {
  let response = {
    data: null,
    message: "",
    code: 200,
  };
  try {
    let tasks = await taskDetails.getAllTasks();
    if (tasks) {
      response = {
        data: tasks,
        message: "Task fetched successfully",
        code: 200,
      };
    } else {
      response = {
        data: null,
        message: "Error while fetching all tasks",
        code: 500,
      };
    }
    res.send(response);
    console.log("tasks", tasks);
  } catch (error) {
    response = {
      data: null,
      message: "Error while fetching all tasks",
      code: 500,
    };
    res.send(response);
    console.log("Error ", error);
  }
});

//create new task into DB API
app.get("/createTask", async (req, res) => {
  let response = {
    data: null,
    message: "",
    code: 200,
  };
  try {
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
  } catch (error) {
    console.log("Error ", error);
    response = {
      data: null,
      message: "Error while updating task",
      code: 500,
    };
    res.send(response);
  }
});

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
  try {
    let taskId = req.query.taskId;
    let tasks = await taskDetails.deleteTask(taskId);
    if (tasks) {
      response = {
        data: tasks,
        message: "Task deleted successfully",
        code: 200,
      };
    } else {
      response = {
        data: null,
        message: "Error while deleting task",
        code: 500,
      };
    }
    // console.log(tasks);
    res.send(response);
  } catch (error) {
    console.log("Error ", error);
    response = {
      data: null,
      message: "Error while deleting task",
      code: 500,
    };
    res.send(response);
  }
});

app.delete("/tasks/:id", async (req, res) => {
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
