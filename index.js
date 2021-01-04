const inquirer = require ("inquirer");
const mysql = require ("mysql");
require ('dotenv').config();

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

function inputEmployee (){
    inquirer.prompt([
        {
        type: "list",
        message: "What would you like to do?",
        name: "actionToPerform",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
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
    if (res.jobTitleInput === "View All Employees"){
    engineerInfo();
    } else if (res.jobTitleInput === "View All Employees by Department"){
    managerInfo();
    }else if (res.jobTitleInput === "View All Employees by Manager")
    internInfo();
    }else if (res.jobTitleInput === "Add Employee")
    internInfo();
    }else if (res.jobTitleInput === "Remove Employee")
    internInfo();
    }else if (res.jobTitleInput === "Update Employee")
    internInfo();
    }else if (res.jobTitleInput === "Update Employee Role")
    internInfo();
    }else if (res.jobTitleInput === "Update Employee Manager")
    internInfo();
    }else if (res.jobTitleInput === "View All Roles")
    internInfo();
    });
}