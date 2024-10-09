const { sql, connectDB } = require('../dbConfig'); // นำเข้า sql และฟังก์ชันการเชื่อมต่อกับฐานข้อมูล

// ฟังก์ชันค้นหาครุภัณฑ์
const searchEquipment = async (req, res) => {
    const { name, category, status } = req.query; // รับค่าค้นหาจาก query parameters

    try {
        const pool = await connectDB();
        let query = `SELECT * FROM Equipment WHERE 1=1`; // เริ่มต้นคำสั่ง SQL

        // เพิ่มเงื่อนไขค้นหาตามที่ผู้ใช้กรอก
        if (name) {
            query += ` AND EquipmentName LIKE @name`;
        }
        if (category) {
            query += ` AND Category = @category`;
        }
        if (status) {
            query += ` AND Status = @status`;
        }

        const request = pool.request();

        // ตั้งค่าพารามิเตอร์สำหรับการค้นหา
        if (name) {
            request.input('name', sql.NVARCHAR, `%${name}%`); // ใช้ LIKE สำหรับชื่อ
        }
        if (category) {
            request.input('category', sql.NVARCHAR, category);
        }
        if (status) {
            request.input('status', sql.NVARCHAR, status);
        }

        const result = await request.query(query);
        res.status(200).json(result.recordset); // ส่งผลลัพธ์กลับ
    } catch (error) {
        console.error('Error searching equipment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    searchEquipment,
};