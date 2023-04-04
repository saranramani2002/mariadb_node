const express = require('express');
const app = express();
const taskDetails = require('../Mariadb/dao/daofile');

app.get("/getAllTasks",async (req, res) => {
    try {
        let tasks = await taskDetails.getAllTasks();
        console.log("tasks", tasks);
        res.send({
            data: tasks,
            message: "Task fetched succefully",
            code: 200,
          });
    } catch (err) {
        console.log("err..: ",err);
    }
});

const server = app.listen(8080, function () {
    console.log("Listening on port ", server.address().port);
})