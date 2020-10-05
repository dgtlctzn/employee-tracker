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

  addRole(title, salary, department_id) {
    this.connection.query(
      "INSERT INTO role SET ?",
      {
        title: title,
        salary: salary,
        department_id: department_id,
      },
      (err) => {
        if (err) throw err;
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

  endConnection() {
    this.connection.end();
  }
}

module.exports = Database;

// const db = new Database();
// db.returnEmployees().then((res) => {
//   console.log(res)
// });
// db.addEmployee("Albert", "Einstien", "Scientist", 2);
// db.endConnection();
