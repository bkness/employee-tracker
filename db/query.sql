-- query for vieing employees and departments
SELECT role.title, department.name, role.salary
FROM role 
JOIN department 
ON role.department_id = department.id 
-- querie for selecting employee id, names department and slary 
SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title AS role_title,
    department.name AS department, 
    role.salary
FROM 
    employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;

INSERT INTO role (title, salary, department_id)
VALUES ('YourRoleTitle');