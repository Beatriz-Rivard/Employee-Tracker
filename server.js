const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// create the connection to database to my sql
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'mypassword.db_2023',
  database: 'company_db'
});

// initial questions that will will when the app starts 
const initialPrompt = [
  {
    type: 'list',
    name: 'options',
    message: 'Please choose one of the following:',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add A Department',
      'Add A Role',
      'Add An Employee',
      'Update An Employee Role',
      'Exit'
    ]
  }
];

// question for adding role, employee and department 
const addRolePrompt = [
  {
    type: 'input',
    name: 'role',
    message: 'What is the role title?'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'What is the role salary?'
  },
  {
    type: 'input',
    name: 'department',
    message: "What is the role's department ID?"
  }
];

const addEmpPrompt = [
  {
    type: 'input',
    name: 'firstName',
    message: "What is the employee's first name?"
  },
  {
    type: 'input',
    name: 'lastName',
    message: "What is the employee's last name?"
  },
  {
    type: 'input',
    name: 'role',
    message: "What is the employee's role ID?"
  },
  {
    type: 'input',
    name: 'manager',
    message: "What is the manager ID of the employee's manager?"
  }
];

const addDeptPrompt= [
  {
    type: 'input',
    name: 'department',
    message: 'What is the name of the department you would like to add?'
  }
];

// // question for adding the employee Id number and new Id role
const addEmpId = [
  {
    type: 'input',
    name: 'empId',
    message: "What is the employee's ID number?"
  },
  {
    type: 'input',
    name: 'newRole',
    message: "What is the employee's new role ID?"
  }
];

//function to add role to table
function addRoleToTable() {
  inquirer.prompt(addRolePrompt).then((answers) => {
    const query =
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const  values = [answers.role, answers.salary, answers.department];

    connection.query(query, values, (err, results, fields) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Role successful added to the table.");
      }
    });
  });
}

// adding employee to the table
function addEmp(){
  inquirer
    .prompt(addEmpPrompt)
    .then((answers) => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const values = [answers.firstName, answers.lastName, answers.role, answers.manager];

      connection.query(query, values, function(err, results) {
        if(err) {
          console.log(err);
        } else {
          console.log("Employee successful added to the table.");
        }
      });
    });
}

// adding departament to the table
function addDept(){
  inquirer
    .prompt(whichDept)
        .then((answers) => {
          connection.query(
            `INSERT INTO department (name)  VALUES (?)`,
            [answers.department],
            function(err, results) {
              if(err) {
                console.log(err)
              } else {
              console.log("Department added to the table.")
              }; 
            }
            );
        })
};

// update an employees role in the employee table
function updateRole(){
        inquirer
        .prompt(updateEmployQ)
        .then((answers) =>{
            connection.query(
                `UPDATE employee SET role_id = ? WHERE id = ?`,
                    [answers.currentIdQ, answers.newIDQ],
                (err, results) => { 
                    err
                    ? console.log(err)
                    : viewEmployFunc();
                }
            );
        })
      };

// displays the department table
function viewDept(){
  connection.query(
    `SELECT department.name AS 'Department',
        department.id AS 'Department ID'
     FROM department`,
    (err, results) => {
      if(err) {
        console.log(err)
      } else {
      console.table(results)
      
      };
  });
};

//displays the role table
function viewRoles(){
  connection.query(
    `SELECT role.title AS 'Role Title',
        role.id AS 'Role ID', 
        department.id AS 'Department ID',
        role.salary AS 'Salary'
     FROM role 
        LEFT JOIN department ON role.department_id = department.id`,
    function(err, results) {
        if(err) {
          console.log(err)
        } else {
        console.table(results)
        }; 
    }
    );
}

// displays the employee table
function viewEmpPrompt(){
  connection.query(
    `SELECT 
        employee.id AS 'Employee ID',
        employee.first_name AS 'First Name',
        employee.last_name AS 'Last Name',
        role.title AS 'Title',
        role.department_id AS 'Department',
        role.salary AS 'Salary',
        CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
     FROM employee 
        LEFT JOIN role ON employee.role_id = role.id
          LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager on manager.id = employee.manager_id`,

    function(err, results) {
      if(err) {
        console.log(err)
      } else {
      console.table(results)
      }; 
    }
    );
}

// initial prompts
function init() {
    inquirer
      .prompt(initialPrompt)
        .then((answers) => {
          handleChoice(answers)
        });
  
  }
  // function call
  init();
