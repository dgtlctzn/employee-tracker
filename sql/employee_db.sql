DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

use employee_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (30) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30)NOT NULL ,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;
-- SELECT * FROM employee WHERE first_name = "Joseph" AND last_name = "Perry";
-- SELECT id from role WHERE title = "Cook";

-- INSERT INTO employee(first_name, last_name, role_id, manager_id)
-- VALUE ("Greg", "Turkington", 4, 1);

-- SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name
-- FROM employee
-- INNER JOIN role ON role.id = employee.role_id
-- INNER JOIN department on department.id = role.department_id
-- WHERE employee.role_id = 3;

-- SELECT id FROM department WHERE name = "Farming";
-- SELECT id FROM role WHERE department_id = 7;
-- SELECT * FROM employee WHERE role_id = 3;