const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
console.log(error);
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server!');

  connection.query('CREATE DATABASE IF NOT EXISTS contacts_db', (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists!', result.find);

    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) throw err;

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(255),
          last_name VARCHAR(255),
          email VARCHAR(255),
          mobile_number VARCHAR(15)
        )
      `;

      connection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table created or already exists!', result.affectedRows);
        connection.end();
      });
    });
  });
});
