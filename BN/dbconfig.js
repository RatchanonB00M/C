const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'Boomdod#1998',
    server: 'DESKTOP-SQQRBBC',
    database: 'pov',
    options: {
        encrypt: true, 
        trustServerCertificate: true
    }
};

async function connectDB() {
    try {
        let pool = await sql.connect(config);
        console.log('เชื่อมต่อกับ SQL Server สำเร็จ');
        return pool;
    } catch (err) {
        console.log('การเชื่อมต่อฐานข้อมูลล้มเหลว:', err);
    }
}

module.exports = { connectDB, sql };