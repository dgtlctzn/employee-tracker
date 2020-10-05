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

  updateEmployeeRole(name, role) {
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    this.connection.query(
      "UPDATE employee SET ? WHERE ? AND ?",
      [
        {
          role_id: role,
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

  endConnection() {
    this.connection.end();
  }
}

const db = new Database();
// db.viewTable("employee");
db.updateEmployeeRole("Joseph Perry", 5);
db.viewTable("employee");
//   .then(() => {
db.endConnection();
//   })
//   .catch((err) => {
//     if (err) console.log(err);
//   });
// db.endConnection();
