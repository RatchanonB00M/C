const { sql, connectDB } = require('../dbConfig');

// ฟังก์ชันสำหรับการคืนครุภัณฑ์
exports.returnEquipment = async (req, res) => {
    const { userId, equipmentId } = req.body; // ข้อมูลที่ส่งมาจากฝั่งผู้ใช้

    try {
        const pool = await connectDB(); // เชื่อมต่อฐานข้อมูล

        // ตรวจสอบการยืมครุภัณฑ์ว่ามีการยืมจากผู้ใช้อยู่หรือไม่
        const checkBorrow = await pool.request()
            .input('userId', sql.NVarChar, userId)
            .input('equipmentId', sql.NVarChar, equipmentId)
            .query('SELECT * FROM BorrowRecords WHERE UserId = @userId AND EquipmentId = @equipmentId AND Status = \'Borrowed\'');

        if (checkBorrow.recordset.length === 0) {
            return res.status(404).json({ message: 'ไม่พบการยืมครุภัณฑ์นี้หรือครุภัณฑ์ถูกคืนไปแล้ว' });
        }

        // อัปเดตสถานะเป็น 'Returned' และบันทึกวันที่คืน
        await pool.request()
            .input('userId', sql.NVarChar, userId)
            .input('equipmentId', sql.NVarChar, equipmentId)
            .input('returnDate', sql.DateTime, new Date())
            .query('UPDATE BorrowRecords SET Status = \'Returned\', ReturnDate = @returnDate WHERE UserId = @userId AND EquipmentId = @equipmentId AND Status = \'Borrowed\'');

        // อัปเดตสถานะครุภัณฑ์เป็น 'Available'
        await pool.request()
            .input('equipmentId', sql.NVarChar, equipmentId)
            .query('UPDATE Equipment SET Status = \'Available\' WHERE EquipmentId = @equipmentId');

        return res.status(200).json({ message: 'คืนครุภัณฑ์สำเร็จ' });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการคืนครุภัณฑ์' });
    }
};
