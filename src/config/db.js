require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "EP4_IA"
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Se establecio la conexion correctamente');

});

module.exports = db;
