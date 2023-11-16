
const mysql = require('mysql2');
// creating a database connection for mysql
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'ziggy',
        database: 'employee_db'
    },
    console.log('Connected to employee_db database.')
);

module.exports = db