const Sequelize = require('sequelize');

const sequelize = new Sequelize("todo","root", "root@12", {
    host: "localhost",
    dialect: 'mariadb'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('DB connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database', err);
    });

module.exports = sequelize;