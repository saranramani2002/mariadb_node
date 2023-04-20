import React, { useEffect, useState } from "react";
import "./App.css";

function TodoList() {
  const [taskList, setTaskList] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/getAllTasks");
      const data = await response.json();
      setTaskList(data);
    }
    fetchData();
  }, []);

  const addTask = async (e) => {
    // e.preventDefault();
    const input = document.getElementById("inputfield");
    const task = input.value.trim().toLowerCase();

    const response = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: task }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const newTask = [...taskList, data];
      setTaskList(newTask);
      setTaskValue("");
    }
  };

  const editTask = (task) => {
    setSelectedTask(task);
    setTaskValue(task.task_name);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (!selectedTask) {
      return;
    }
    const response = await fetch(
      `http://localhost:8080/tasks?id=${selectedTask._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task_name: taskValue }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      const editedTaskList = taskList.map((task) =>
        task._id === selectedTask._id ? data : task
      );
      setTaskList(editedTaskList);
      setSelectedTask(null);
      setTaskValue("");
    }
  };

  const deleteTask = async (id) => {
    const response = await fetch(`http://localhost:8080/tasks?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const newTaskList = taskList.filter((task) => task._id !== id);
      setTaskList(newTaskList);
    }
  };
    
  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <div className="input">
        <form className="form" onSubmit={selectedTask ? updateTask : addTask}>
          <input
            id="inputfield"
            type="text"
            placeholder="Add New Task"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          />
          <button type="submit" id="addbtn">
            {selectedTask ? "Save" : "Add"}
          </button>
        </form>
      </div>
      <br />
      <div className="insidecontainer">
        <ul id="list">
          {taskList && taskList.length > 0 ? (
            taskList.map((task, index) => (
              <li key={index}>
                <>
                  {task.task_name}
                  <button className="edit" onClick={() => editTask(task)}>
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </>
              </li>
            ))
          ) : (
            <li>No tasks found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
