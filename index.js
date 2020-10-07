const Database = require("./class");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");

// prints 3D message to console
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

// main async function calling Database class methods
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
          "View Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Add Role",
          "View Roles",
          "Remove Role",
          "Add Department",
          "View Departments",
          "Remove Department",
          "Exit",
        ],
        name: "choice",
      });
      // switch case handles all options from main menu
      // default ends sql connection
      switch (choice) {
        case "View All Employees":
          await db.viewEmployees();
          break;
        case "View Employees by Department":
          let departments = await db.returnDepartments();
          const { department } = await inquirer.prompt({
            type: "list",
            message: "What department would you like to search by?",
            choices: departments,
            name: "department",
          });
          await db.viewEmployeesByDepartment(department);
          break;
        case "View Employees by Manager":
          let managers = await db.returnEmployees();
          const { managerPick } = await inquirer.prompt({
            type: "list",
            message: "Which manager would you like to search by?",
            choices: managers,
            name: "managerPick",
          });
          await db.viewEmployeesByManager(managerPick);
          break;
        case "Add Employee":
          let roles = await db.returnRoles();
          let managerList = await db.returnEmployees();
          let {
            first_name,
            last_name,
            role,
            manager,
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
              type: "list",
              message: "Who is the manager of this employee?",
              choices: managerList,
              name: "manager",
            },
          ]);
          db.addEmployee(first_name, last_name, role, manager);
          break;
        case "Update Employee Role":
          const updateRoles = await db.returnRoles();
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
          break;
        case "Add Role":
          const roleDepartments = await db.returnDepartments();
          let { roleTitle, departmentChoice, roleSalary } = await inquirer.prompt([
            {
              type: "input",
              message: "What is the title of this role?",
              name: "roleTitle",
            },
            {
              type: "list",
              message: "Which department is this role under?",
              name: "departmentChoice",
              choices: roleDepartments,
            },
            {
              type: "input",
              message: "What is the salary of this role?",
              name: "roleSalary",
            }]);
          db.addRole(roleTitle, roleSalary, departmentChoice);
          break;
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
        case "View Roles":
          await db.viewRoles();
          break;
        case "Remove Role":
          let roleList = await db.returnRoles();
          const { roleToDelete } = await inquirer.prompt({
            type: "list",
            message: "Which role would you like to remove?",
            name: "roleToDelete",
            choices: roleList,
          });
          db.removeRole(roleToDelete);
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
        case "Remove Department":
          availDept = await db.returnDepartments();
          let { deptToDelete } = await inquirer.prompt({
            type: "list",
            message:
              "What is the name of the department you would like to delete?",
            choices: availDept,
            name: "deptToDelete",
          });
          db.removeDepartment(deptToDelete);
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
// main call
init();
