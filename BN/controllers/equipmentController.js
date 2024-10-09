const { sql, connectDB } = require('../dbConfig');

// ฟังก์ชันแสดงครุภัณฑ์ทั้งหมดไม่ว่าจะมีสถานะใด
exports.getAllEquipment = async (req, res) => {
    try {
        // เชื่อมต่อฐานข้อมูล
        const pool = await connectDB();

        // Query ค้นหาครุภัณฑ์ทั้งหมด
        const result = await pool.request()
            .query('SELECT * FROM Equipment');

        // ส่งข้อมูลกลับไป
        if (result.recordset.length > 0) {
            return res.status(200).json(result.recordset);
        } else {
            return res.status(404).json({ message: 'ไม่พบครุภัณฑ์' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' });
    }
};
