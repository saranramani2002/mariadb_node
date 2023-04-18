   const { DefaultDeserializer } = require("v8");
const TaskDetails = require("../model/table");

const getAllTasks = async () => {
  try {
    let response = await TaskDetails.findAll();
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log("Error ", error);
  }
};

const createTask = async (data) => {
  try {
    let response = await TaskDetails.create({ task_name: data });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log("Error ", error);
  }
};

const updateTask = async (id, data) => {
  try {
    let response = await TaskDetails.update(
      { task_name: data },
      {
        where: {
          task_id: id,
        },
      }
    );
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log("Error ", error);
  }
};

const deleteTask = async (id) => {
  try {
    let response = await TaskDetails.destroy({
      where: {
        task_id: id,
      },
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.log("Error ", error);
  }
};

// const getTaskById = async (taskId) => {
//   try {
//     let response = await TaskDetails.findOne({
//       where: {
//         task_id: taskId,
//       },
//     });
//     return JSON.parse(JSON.stringify(response));
//   } catch (error) {
//     console.log("Error ", error);
//   }
// };

module.exports = {
  getAllTasks: getAllTasks,
  createTask: createTask,
  updateTask: updateTask,
  deleteTask: deleteTask,
  
};
