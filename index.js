const Database = require("./class");
const inquirer = require("inquirer");

async function init() {
  try {
    const db = new Database();
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
        console.log("here");
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
    }

    //   const db = new Database();

    //   const {department} = await inquirer.prompt({
    //     type: "input",
    //     message: "What department would you like to add?",
    //     name: "department",
    //   });
    //   db.addDepartment(department);
    //   await db.viewTable("department");
    //   const {role, salary, id} = await inquirer.prompt([
    //     {
    //       type: "input",
    //       message: "What role would you like to add?",
    //       name: "role",
    //     },
    //     {
    //       type: "input",
    //       message: "What is the salary of this role?",
    //       name: "salary",
    //     },
    //     { type: "input", message: "What is the department id?", name: "id" },
    //   ]);
    //   db.addRole(role, salary, id);
    //   await db.viewTable("role");
    //   db.endConnection();
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
}

init();
