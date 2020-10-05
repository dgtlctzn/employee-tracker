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

  addEmployee(first_name, last_name, role_id, manager_id) {
    this.connection.query("INSERT INTO employee SET ?", {
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id,
    });
  }

  viewTable(table) {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM ??", [table], (err, res) => {
        if (err) {
          reject();
        }
        console.table(res);
        resolve();
      });
    });
  }

  endConnection() {
    this.connection.end();
  }
}

const db = new Database();
db.viewTable("role")
  .then(() => {
    db.endConnection();
  })
  .catch((err) => {
    if (err) console.log(err);
  });
// db.endConnection();
