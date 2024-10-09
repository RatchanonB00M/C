const express = require('express');
const router = express.Router();
const { connectDB } = ('../dbconfig');

// ลงทะเบียนผู้ใช้ใหม่
router.post('/register', async (req, res) => {
    const { UserName, UserEmail, UserPassword } = req.body;
    try {
        let pool = await connectDB();
        await pool.request()
            .input('UserName', UserName)
            .input('UserEmail', UserEmail)
            .input('UserPassword', UserPassword)
            .query('INSERT INTO Users (UserName, UserEmail, UserPassword) VALUES (@UserName, @UserEmail, @UserPassword)');
        res.send('ลงทะเบียนผู้ใช้สำเร็จ');
    } catch (err) {
        res.status(500).send('เกิดข้อผิดพลาดในการลงทะเบียนผู้ใช้');
    }
});

// ดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/', async (req, res) => {
    try {
        let pool = await connectDB();
        let users = await pool.request().query('SELECT * FROM Users');
        res.json(users.recordset);
    } catch (err) {
        res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
    }
});

module.exports = router;