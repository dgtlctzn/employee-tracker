const Database = require("./class");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");

function printEMS(text, style) {
  return new Promise((resolve, reject) => {
    figlet.text(
      text,
      {
        font: style,
        horizontalLayout: "default",
        verticalLayout: "default",
        width: "300",
        whitespaceBreak: true,
      },
      function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          reject();
        }
        console.log(data);
        resolve();
      }
    );
  });
}

async function init() {
  try {
    await printEMS("E.M.S.", "DOS Rebel");
    const db = new Database();
    let done = false;
    while (!done) {
      const { choice } = await inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View Employees by Department",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Add Role",
          "Add Department",
          "View Departments",
          "Exit",
        ],
        name: "choice",
      });
      switch (choice) {
        case "View All Employees":
          await db.viewEmployees();
          break;
        case "View Employees by Department":
          const departments = await db.returnDepartments();
          const { department } = await inquirer.prompt({
            type: "list",
            message: "What department would you like to search by?",
            choices: departments,
            name: "department",
          });
          await db.viewEmployeesByDepartment(department);
          break;
        case "Add Employee":
          const roles = await db.returnRoles("title", "role");
          const {
            first_name,
            last_name,
            role,
            manager_id,
          } = await inquirer.prompt([
            {
              type: "input",
              message: "What is the employee's first name?",
              name: "first_name",
            },
            {
              type: "input",
              message: "What is the employee's last name?",
              name: "last_name",
            },
            {
              type: "list",
              message: "What is the employee's role?",
              name: "role",
              choices: roles,
            },
            {
              type: "input",
              message: "What is the manager's id of this employee?",
              name: "manager_id",
            },
          ]);
          db.addEmployee(first_name, last_name, role, manager_id);
          // db.endConnection();
          break;
        case "Update Employee Role":
          const updateRoles = await db.returnRoles("title", "role");
          let employees = await db.returnEmployees();
          let { name, roleUpdate } = await inquirer.prompt([
            {
              type: "list",
              message: "Which employee would you like to update?",
              name: "name",
              choices: employees,
            },
            {
              type: "list",
              message: "What is the employee's new role?",
              choices: updateRoles,
              name: "roleUpdate",
            },
          ]);
          db.updateEmployeeRole(name, roleUpdate);
        case "Add Role":
          
        case "Remove Employee":
          let employeeList = await db.returnEmployees();
          const { nameToDelete } = await inquirer.prompt({
            type: "list",
            message: "Which employee would you like to remove?",
            name: "nameToDelete",
            choices: employeeList,
          });
          db.removeEmployee(nameToDelete);
          break;
        case "Add Department":
          const { deptName } = await inquirer.prompt({
            type: "input",
            message:
              "What is the name of the department you would like to add?",
            name: "deptName",
          });
          db.addDepartment(deptName);
          break;
        case "View Departments":
          await db.viewDepartments();
          break;
        default:
          db.endConnection();
          await printEMS("Goodbye!", "Dr Pepper");
          done = true;
      }
    }
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
}

init();
