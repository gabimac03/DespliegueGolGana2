const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const initDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'mysql',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '1908',
            database: process.env.DB_NAME || 'golgana',
            multipleStatements: true  // 👈 ESTA ES LA CLAVE
        });

        const [rows] = await connection.execute("SHOW TABLES");
        if (rows.length === 0) {
            console.log("🛠 Ejecutando script de base de datos...");
            const sqlPath = path.join(__dirname, '../GolGana.sql');
            const sql = fs.readFileSync(sqlPath, 'utf8');
            await connection.query(sql);
            console.log("✅ Tablas creadas correctamente.");
        } else {
            console.log("✅ Las tablas ya existen.");
        }

        await connection.end();
    } catch (err) {
        console.error("❌ Error inicializando la base de datos:", err);
    }
};

module.exports = initDB;
