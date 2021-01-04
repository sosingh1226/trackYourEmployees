const inquirer = require ("inquirer");
const mysql = require ("mysql");
require ('dotenv').config();

const allEmployees = [];

const connection = mysql.createConnection({
    host: "localhost",
    // user: process.env.DB_USER,
    user: "root",
    // password: process.env.DB_PASSWORD,
    password: "your_current_password",
    // database: process.env.DB_NAME,
    database: "employeesDB"
});

connection.connect(function (err) {
    console.log("inside here connection process..");

    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
   //call your new function
   employeeTracker();
});

function employeeTracker() {
 console.log ("welcome to employee tracker")
}

function inputAction (){
    inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        name: "actionToPerform",
        choices: [
            "Add Employee",
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Remove Employee",
            "Update Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Update Employee Role",
            "View All Roles"
        ]
        },
    ])
    .then((res) => {
    console.log(res);
    if (res.jobTitleInput === "Add Employee"){
    addEmp();
    if (res.jobTitleInput === "View All Employees"){
    viewAllEmp();
    } else if (res.jobTitleInput === "View All Employees by Department"){
    viewEmpDept();
    } else if (res.jobTitleInput === "View All Employees by Manager"){
    viewEmpMngr();
    } else if (res.jobTitleInput === "Remove Employee"){
    remEmp();
    } else if (res.jobTitleInput === "Update Employee"){
    updateEmp();
    } else if (res.jobTitleInput === "Update Employee Role"){
    updateEmpRole();
    } else if (res.jobTitleInput === "Update Employee Manager"){
    updateEmpMngr();
    } else if (res.jobTitleInput === "View All Roles"){
    viewAllRoles();
    };
}

inputAction();

function addEmp () {
    console.log ("Adding Employee")
    inquirer.prompt([
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
            name: "role_id",
            message: "What is employee's Role ID?",
        },
            {
            type: "input",
            name: "manager_id",
            message: "What is employee's Manager ID?",
        },
    ])
    .then (data =>{
        console.log (data);
        const employee = new Employee(data.first_name, data.last_name, data.role_id, data.manager_id)
        allEmployees.push(employee);

        console.log(allEmployees)

        addMore();
        output();
    })
};


function addMore () {
    inquirer.prompt([
    {
    type: "confirm",
    message: "add more employees?",
    name: "confirmEmployee",
    default: true
    }])
    .then((ans) => {
    // console.log(yes);
    if (ans.confirmEmployee === true){
    inputEmployee();
    } else {
    output();
    return "done";
    }
})
}

// addMore()