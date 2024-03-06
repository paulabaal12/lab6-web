import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'mysql',
    port: 3306, 
    user: 'paula',
    database: 'f1_db',
    password: 'f1',
    connectionLimit: 10,
    queueLimit: 0
})


export default pool;