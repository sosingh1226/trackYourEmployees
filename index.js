const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //   user: "root",
  //   password: "your_current_password",
  //   database: "employeesDB"
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
      if (res.actionToPerform === "Add Department") {
        addDept();
      } else if (res.actionToPerform === "Add Role") {
        addRole();
      } else if (res.actionToPerform === "Add Employee") {
        addEmp();
      } else if (res.actionToPerform === "View All Departments") {
        viewAllDept();
      } else if (res.actionToPerform === "View All Roles") {
        viewAllRoles();
      } else if (res.actionToPerform === "View All Employees") {
        viewAllEmp();
      // } else if (res.actionToPerform === "Update Department") {
      //   updateDept();
      // } else if (res.actionToPerform === "Update Role") {
      //   updateRole();
      } else if (res.actionToPerform === "Update Employee Role") {
        updateERole();
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

function addDept() {
  console.log("Adding a new Department");
  inquirer
    .prompt({
      type: "input",
      name: "Department_Name",
      message: "Which Department you'd like to add?",
    })
    .then((data) => {
      console.log(data);
      const sqlquery = `INSERT INTO department (name) VALUES ('${data.Department_Name}')`;
      connection.query(sqlquery, function (err, res) {
        if (err) throw err;
        console.log ("Department Added Successfully!")
        inputAction();
      });
    });
}

function addRole() {
  console.log("Adding a New Role");
  inquirer
    .prompt([{
      type: "input",
      name: "title",
      message: "Which Role you'd like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is department ID?",
      },
    ])
    .then((data) => {
      console.log(data);
      const sqlquery = `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}', '${data.salary}', '${data.department_id}')`;
      connection.query(sqlquery, function (err, res) {
        if (err) throw err;
        console.log ("Role Added Successfully!")
        inputAction();
      });
    });
}

function addEmp() {
  console.log("Adding Employee");
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is employee's First Name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is employee's Last Name?",
      },
      {
        type: "input",
        name: "dept_id",
        message: "What is employee's Dept ID?",
      },
      // {
      //   type: "input",
      //   name: "manager_id",
      //   message: "What is employee's Manager ID?",
      // },
    ])
    .then((data) => {
      console.log(data);
      const sqlquery = `INSERT INTO employee (first_name, last_name, role_id) SELECT '${data.first_name}', '${data.last_name}', r.id FROM role r where r.department_id = ${data.dept_id}`;
      connection.query(sqlquery, function (err, res) {
        if (err) throw err;
        console.log ("Employee Added Successfully!")
        inputAction();
      });
    });
}

function addDept() {
  console.log("Adding a new Department");
  inquirer
    .prompt({
      type: "input",
      name: "Department_Name",
      message: "Which Department you'd like to add?",
    })
    .then((data) => {
      console.log(data);
      const sqlquery = `INSERT INTO department (name) VALUES ('${data.Department_Name}')`;
      connection.query(sqlquery, function (err, res) {
        if (err) throw err;
        console.log ("Department Added Successfully!")
        inputAction();
      });
    });
}
