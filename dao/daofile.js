const TaskDetails = require('../model/table')

const getAllTasks = async () => {
    try {
        let response =  await TaskDetails.findAll({
        })
        return JSON.parse(JSON.stringify(response));
    } catch (err) {
        console.log("Error..: ", err);
    }
}

module.exports = {
    getAllTasks: getAllTasks 
}