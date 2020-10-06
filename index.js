const Database = require("./class");
const inquirer = require("inquirer");

async function init() {
  try {
    const db = new Database();
    let done = false;
    while(!done) {
      const { choice } = await inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View Employees by Department",
          "View Departments",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Exit"
        ],
        name: "choice",
      });
      switch (choice) {
        case "View All Employees":
          await db.viewEmployees();
          break;
        case "View Employees by Department":
          const departments = await db.returnDepartments()
          const {department} = await inquirer.prompt(
          {
            type: "list",
            message: "What department would you like to search by?",
            choices: departments,
            name: "department",
          });
          await db.viewEmployeesByDepartment(department);
          break;
        case "View Departments":
          await db.viewTable("department");
          db.endConnection();
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
          let {name, roleUpdate} = await inquirer.prompt([
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
        case "Remove Employee":
          let employeeList = await db.returnEmployees();
          const {nameToDelete} = await inquirer.prompt(
            {
              type: "list",
              message: "Which employee would you like to remove?",
              name: "nameToDelete",
              choices: employeeList,
            });
          db.removeEmployee(nameToDelete);
        default:
          db.endConnection();
          console.log("Goodbye!")
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
