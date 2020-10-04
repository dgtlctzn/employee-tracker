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
      this.connection.query("INSERT INTO department SET ?", {
          name: department,
      }, (err) => {
          if (err) throw err;
      })
  }

  addRole(title, salary, department_id) {
      this.connection.query("INSERT INTO role SET ?", {
          title: title,
          salary: salary,
          department_id: department_id,
      }, (err) => {
          if (err) throw err;
      })
  }

  endConnection() {
    this.connection.end();
}
}

const db = new Database;
db.addRole("Sales Force Specialist", 75000, 1);
