const Database = require("./class");
const inquirer = require("inquirer");

async function init() {
  try {
    const db = new Database();
    const { choice } = await inquirer.prompt({
      type: "list",
      message: "What would you like to do?",
      choices: ["View Departments", "Add Employee"],
      name: "choice",
    });
    switch (choice) {
      case "View Departments":
        await db.viewTable("department");
        db.endConnection();
        break;
      case "Add Employee":
        db.endConnection();
        break;
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
