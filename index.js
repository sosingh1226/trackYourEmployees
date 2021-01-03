const inquirer = require ("inquirer");
const mysql = require ("mysql");
require ('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
   //call your new function
   employeeTracker();
});

function employeeTracker() {
 console.log ("welcome to employee tracker")
}