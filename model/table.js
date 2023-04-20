const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/database");  

const TaskDetails = sequelize.define(
  "TaskDetails",
  {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task_name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "task_details",
    timestamps: false,
  }
);

module.exports = TaskDetails;
