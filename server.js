const inquirer = require('inquirer');
const db = require('./db/connection.js');
const util = require('util');
require('console.table');
db.query = util.promisify(db.query);

async function menu() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Update an employee role', 'Quit']
        }
    ])
    if (answer.choice === 'View all departments') {
        viewDepartments();
    } else if (answer.choice === 'View all roles') {
        viewRoles();
    } else if (answer.choice === 'View all employees') {
        viewEmployees();
    } else if (answer.choice === 'Add a department') {
        addDepartment();
    } else if (answer.choice === 'Add a role') {
        addRole();
    } else if (answer.choice === 'Update an employee role') {
        updateRole();
    } else { db.end() }

}

menu();

async function viewDepartments() {
    const departments = await db.query('SELECT * FROM department')
    console.table(departments);
    menu();
}

async function viewRoles() {
    const roles = await db.query('SELECT role.title, department.name, role.salary FROM role JOIN department ON role.department_id = department.id ')
    console.table(roles);
    menu();
}

//  async function viewEmployees {
    // const employees = await db.query('SELECT * ')
// }
