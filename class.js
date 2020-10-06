const mysql = require("mysql");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "katsu",
      database: "employee_db",
    });
    this.connection.connect(function (err) {
      if (err) throw err;
    });
  }

  addDepartment(department) {
    this.connection.query(
      "INSERT INTO department SET ?",
      {
        name: department,
      },
      (err) => {
        if (err) throw err;
      }
    );
  }

  addRole(title, salary, department) {
    this.connection.query(
      "SELECT id FROM department WHERE name = ?",
      [department],
      (err, res) => {
        // console.log(res[0].id)
        this.connection.query("INSERT INTO role SET ?", {
          title: title,
          salary: salary,
          department_id: res[0].id,
        });
      }
    );
  }

  addEmployee(first_name, last_name, role, manager_id) {
    this.connection.query(
      "SELECT id FROM role WHERE title = ?",
      [role],
      (err, res) => {
        this.connection.query("INSERT INTO employee SET ?", {
          first_name: first_name,
          last_name: last_name,
          role_id: res[0].id,
          manager_id: manager_id,
        });
      }
    );
  }

  viewEmployees() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name
      FROM employee
      INNER JOIN role ON role.id = employee.role_id
      INNER JOIN department on department.id = role.department_id;`,
        (err, res) => {
          if (err) {
            reject();
          }
          console.table("\x1b[32m", res);
          resolve();
        }
      );
    });
  }

  viewDepartments() {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM department", (err, res) => {
        if (err) {
          reject();
        }
        console.table("\x1b[32m", res);
        resolve();
      });
    });
  }

  returnRoles(column, table) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT ?? FROM ??",
        [column, table],
        (err, res) => {
          if (err) {
            reject();
          }
          resolve(res.map((item) => item.title));
        }
      );
    });
  }

  returnEmployees() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT first_name, last_name FROM employee",
        (err, res) => {
          if (err) {
            reject();
          }
          resolve(res.map((item) => `${item.first_name} ${item.last_name}`));
        }
      );
    });
  }

  returnDepartments() {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT name FROM department", (err, res) => {
        if (err) {
          reject();
        }
        resolve(res.map((item) => item.name));
      });
    });
  }

  viewEmployeesByDepartment(department) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT id FROM department WHERE name = ?",
        [department],
        (err, resOne) => {
          if (err) {
            reject();
          }
          this.connection.query(
            "SELECT id FROM role WHERE department_id = ?",
            [resOne[0].id],
            (err, resTwo) => {
              if (err) {
                reject();
              }
              this.connection.query(
                `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name
          FROM employee
          INNER JOIN role ON role.id = employee.role_id
          INNER JOIN department on department.id = role.department_id
          WHERE employee.role_id = ?`,
                [resTwo[0].id],
                (err, resThree) => {
                  if (err) {
                    reject();
                  }
                  console.table("\x1b[32m", resThree);
                  resolve();
                }
              );
            }
          );
        }
      );
    });
  }

  updateEmployeeRole(name, role) {
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    this.connection.query(
      "SELECT id FROM role WHERE title = ?",
      [role],
      (err, res) => {
        this.connection.query(
          "UPDATE employee SET ? WHERE ? AND ?",
          [
            {
              role_id: res[0].id,
            },
            {
              first_name: firstName,
            },
            {
              last_name: lastName,
            },
          ],
          (err, res) => {
            if (err) throw err;
          }
        );
      }
    );
  }

  removeEmployee(name) {
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    this.connection.query(
      "DELETE FROM employee WHERE ?",
      [
        {
          first_name: firstName,
        },
        {
          last_name: lastName,
        },
      ],
      (err, res) => {
        if (err) throw err;
      }
    );
  }

  endConnection() {
    this.connection.end();
  }
}

module.exports = Database;

// const db = new Database();
// db.addRole("Planter", 20000, "Farming");
// db.viewDepartments().then(console.log("ok"));
// db.returnDepartments().then((res) => {console.log(res)});
// db.removeEmployee("Albert Einstien")
// db.returnEmployees().then((res) => {
//   console.log(res)
// });
// db.viewEmployees().then((res) => {
//   console.log("done")
// });
// db.viewEmployeesByDepartment("Farming").then((res) => {
//   console.log("done");
// });
// db.addEmployee("Johnny", "Appleseed", "Farmer", 5);
// db.endConnection();
