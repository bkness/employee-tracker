DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY, -- AUTO_INCREMENT makes ids
    name VARCHAR(30)  
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, -- id is always primary key in this instance 
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
     id INT AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(30),
     last_name VARCHAR(30),
     role_id INT,
     manager_id INT,
     FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,
     FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);