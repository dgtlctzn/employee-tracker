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
          this.connection.end();
      })
  }
}

const db = new Database;
db.addDepartment("HR");
