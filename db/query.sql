SELECT role.title, department.name, role.salary
FROM role 
JOIN department 
ON role.department_id = department.id 

SELECT 