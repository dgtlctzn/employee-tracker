const Database = require("./class")

const db = new Database();
db.viewTable("role");
db.endConnection();