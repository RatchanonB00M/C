const { sql, connectDB } = require('../dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_here'; // ใส่ secret key ที่คุณต้องการ

// ฟังก์ชัน login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // เชื่อมต่อฐานข้อมูล
        const pool = await connectDB();

        // ค้นหาผู้ใช้โดยใช้อีเมล
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE Email = @email');

        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้นี้' });
        }

        // ตรวจสอบรหัสผ่านที่เก็บในฐานข้อมูล
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
        }

        // สร้าง JWT Token
        const token = jwt.sign({ userId: user.UserId, role: user.Role }, JWT_SECRET, {
            expiresIn: '1h' // กำหนดให้ Token หมดอายุใน 1 ชั่วโมง
        });

        // ส่ง Token กลับไปพร้อมข้อมูลผู้ใช้บางส่วน
        return res.status(200).json({
            token,
            user: {
                userId: user.UserId,
                firstName: user.FirstName,
                lastName: user.LastName,
                role: user.Role
            }
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
};

// ฟังก์ชัน logout
exports.logout = (req, res) => {
    // ระบบนี้สามารถแค่ส่งข้อความว่า logout สำเร็จ
    return res.status(200).json({ message: 'ออกจากระบบสำเร็จ' });
};
