const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

const allEmployees = [];

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(function (err) {
  console.log("inside here connection process..");

  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  //call your new function
  employeeTracker();
});

function employeeTracker() {
  console.log("welcome to employee tracker");
  inputAction();
}

function inputAction() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "actionToPerform",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View All Departments",
          "View All Employees",
          "View All Roles",
          "Update Employee Role",
          // "View All Employees by Department",
          // "View All Employees by Manager",
          // "Remove Employee",
          // "Update Employee",
          // "Update Employee Manager"
          "Exit",
        ],
      },
    ])
    .then((res) => {
      console.log(res);
      if (res.actionToPerform === "Add Employee") {
        addEmp();
      } else if (res.actionToPerform === "View All Departments") {
        viewAllDept();
    } else if (res.actionToPerform === "View All Roles") {
        viewAllRoles();
      } else if (res.actionToPerform === "View All Employees") {
        viewAllEmp();
      } else if (res.actionToPerform === "View All Employees by Manager") {
        viewEmpMngr();
      } else if (res.actionToPerform === "Remove Employee") {
        remEmp();
      } else if (res.actionToPerform === "Update Employee") {
        updateEmp();
      } else if (res.actionToPerform === "Update Employee Role") {
        updateEmpRole();
      } else if (res.actionToPerform === "Update Employee Manager") {
        updateEmpMngr();

      } else {
        console.log("GoodBye!");
        connection.end();
      }
    });
}

function viewAllDept() {
  console.log("Viewing all departments");
  const sqlquery = "SELECT * FROM department";
  connection.query(sqlquery, function (err, res) {
    if (err) throw err;
    console.table(res);
    inputAction();
  });
}

function viewAllRoles() {
    console.log("Viewing all Roles");
    const sqlquery = "SELECT * FROM role";
    connection.query(sqlquery, function (err, res) {
      if (err) throw err;
      console.table(res);
      inputAction();
    });
  }

  function viewAllEmp() {
    console.log("Viewing all employees");
    const sqlquery = "SELECT * FROM EMPLOYEE";
    connection.query(sqlquery, function (err, res) {
      if (err) throw err;
      console.table(res);
      inputAction();
    });
  }

// function addEmp() {
//   console.log("Adding Employee");
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "first_name",
//         message: "What is employee's First Name?",
//       },
//       {
//         type: "input",
//         name: "last_name",
//         message: "What is employee's Last Name?",
//       },
//       {
//         type: "input",
//         name: "role_id",
//         message: "What is employee's Role ID?",
//       },
//       {
//         type: "input",
//         name: "manager_id",
//         message: "What is employee's Manager ID?",
//       },
//     ])
//     .then((data) => {
//       console.log(data);

//       inputAction();
//     });
// }
