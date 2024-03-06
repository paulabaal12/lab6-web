import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    //port: 33069, 
    user: 'paula',
    database: 'f1_db',
    password: 'f1',
    waitForConnections: true,

    connectionLimit: 10,
    queueLimit: 0
})

pool.getConnection()
  .then((connection) => {
    console.log('Connected to the database');

    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

export default pool;