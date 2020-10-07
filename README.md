[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  # Employee Management System

  ![e.m.s.](./images/ems-pic.png)

  ## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  * [License](#license)

  ## Description
  Employee management is an important tool for the workforce. I was tasked with building out a command line application that creates an employee database. The command line application uses Inquirer to prompt the user and store values in a MySQL database. The three tables `employee`, `role`, and `department` comprise the `employee_db` database. This information is not only stored but is accessible and mutable with use of the CLI. The schema of the SQL database is as follows: 

  ### department
  * id
  * name

  ### role
  * id
  * title
  * salary
  * department_id

  ### employee
  * id
  * first_name
  * last_name
  * role_id
  * manager_id

  ## Installation
  The necessary packages are included in a package.json file stored in this repository. Run `npm i` to install all necessary dependencies.
  ## Usage
  The following is a link to the walkthrough of the E.M.S. application:
  
  [link.com](screencastify)
  ## Contributing
  The E.M.S. application relies on the Inquirer package to handle CLI prompts, figlet for the logo generation, console.table for the custom table printing in the console, and mysql to handle the JavaScript and MySQL connection.
  ## Tests
  N/A
  ## Questions
  Github profile: [dgtlctzn](https://github.com/dgtlctzn)
  
  If you have any questions about the project please contact josephperry720@gmail.com
  ## License
  This project is covered under the MIT license
