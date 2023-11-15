const mysql = require('mysql2');

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