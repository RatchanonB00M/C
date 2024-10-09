const { sql, connectDB } = require('../dbConfig');

// ฟังก์ชันสำหรับการยืมครุภัณฑ์
exports.borrowEquipment = async (req, res) => {
    const { userId, equipmentId, borrowDate, purpose, location } = req.body;

    try {
        const pool = await connectDB();
        
        // ตรวจสอบสถานะครุภัณฑ์
        const checkStatus = await pool.request()
            .input('equipmentId', sql.NVarChar, equipmentId)
            .query('SELECT Status FROM Equipment WHERE EquipmentId = @equipmentId');
        
        if (checkStatus.recordset.length === 0) {
            return res.status(404).json({ message: 'ไม่พบครุภัณฑ์ที่ต้องการยืม' });
        }

        if (checkStatus.recordset[0].Status !== 'Available') {
            return res.status(400).json({ message: 'ครุภัณฑ์ไม่พร้อมใช้งาน' });
        }

        // เรียกใช้ Stored Procedure สำหรับการยืมครุภัณฑ์
        const result = await pool.request()
            .input('userId', sql.NVarChar, userId)
            .input('equipmentId', sql.NVarChar, equipmentId)
            .input('borrowDate', sql.DateTime, borrowDate)
            .input('purpose', sql.NVarChar, purpose)
            .input('location', sql.NVarChar, location)
            .output('DueDate', sql.DateTime)  // เอา DueDate ออกมาจากการ execute
            .execute('spBorrowEquipment');

        return res.status(200).json({ 
            message: 'ยืมครุภัณฑ์สำเร็จ', 
            dueDate: result.output.DueDate,  // แสดง DueDate ที่ได้จากการ execute
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
};
