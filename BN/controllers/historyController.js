const { sql, connectDB } = require('../dbConfig');

// ฟังก์ชันสำหรับดึงประวัติการยืม-คืน
exports.getUserHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('UserCode', sql.NVarChar, id)
            .query('SELECT * FROM BorrowReturnHistory WHERE UserCode = @UserCode');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'ไม่พบประวัติการยืม-คืน' });
        }

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงประวัติการยืม-คืน' });
    }
};
