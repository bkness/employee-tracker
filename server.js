// here i am using inquirer db util a query and console table to make my data table look a little more clean
const inquirer = require('inquirer');
const db = require('./db/connection.js');
const util = require('util');
require('console.table');
db.query = util.promisify(db.query);

// menu for viewing employee role and department data 
async function menu() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
            'View all departments', 
            'View all roles',
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee',
            'Update an employee role', 
            'Quit']
        }
    ])
    // if statements to call on function if string is chosen from menu 
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
    }  else if (answer.choice === 'Add a employee') {
        addEmployee();
    }else if (answer.choice === 'Update an employee role') {
        updateRole();
    } else { db.end() }

}
menu();
// multiple functions depending on menu selection also using asynchronous functions.
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

async function viewEmployees() {
    const employees = await db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title, department.name AS department, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id');
    console.table(employees);
    menu();
}

async function addDepartment() {
    const departmentData = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
        }
    ]);

    await db.query(`
        INSERT INTO department (name)
        VALUES (?)
    `, [departmentData.name]);

    console.log(`Department added successfully!`);
    menu();
}

// adding list and input prompt for a role selection to be added to the database 
async function addRole() {
    const departments = await db.query('SELECT id, name FROM department');
    console.log('View departments')
    const departmentChoices = departments.map(department => ({
        value: department.id,
        name: department.name
    }));

    const roleData = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Select the title of the new role:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the new role:',
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for the new role:',
            choices: departmentChoices,
        },
    ]);

    await db.query(`
        INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)
    `, [roleData.title, roleData.salary, roleData.departmentId]);
    console.log(`Role added successfully!`);
    menu();
}

