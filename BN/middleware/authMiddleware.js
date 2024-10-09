const jwt = require('jsonwebtoken');

// Middleware ตรวจสอบการมี Token
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization'); // ดึง Token จากส่วนหัวของการร้องขอ (Request)

    if (!token) {
        return res.status(401).json({ message: 'ไม่พบ Token' }); // หากไม่มี Token ส่งสถานะ 401 กลับพร้อมข้อความว่า "ไม่พบ Token"
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // ตรวจสอบความถูกต้องของ Token และถอดรหัสข้อมูล
        req.user = decoded; // เก็บข้อมูลผู้ใช้ที่ถอดรหัสจาก Token ไว้ใน req.user
        next(); // ทำงานต่อไปยังฟังก์ชันถัดไป
    } catch (err) {
        return res.status(401).json({ message: 'Token ไม่ถูกต้องหรือหมดอายุ' }); // หาก Token ไม่ถูกต้องหรือหมดอายุ ให้ส่งสถานะ 401 กลับพร้อมข้อความ
    }
};

// Middleware สำหรับตรวจสอบว่าเป็น Admin หรือ Staff
exports.isAdminOrStaff = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Staff')) {
        next(); // หากเป็น Admin หรือ Staff ให้ผ่านไปยังฟังก์ชันถัดไป
    } else {
        return res.status(403).json({ message: 'คุณไม่มีสิทธิ์เข้าถึงฟังก์ชันนี้' }); // หากไม่ใช่ ให้ส่งสถานะ 403 กลับพร้อมข้อความ "คุณไม่มีสิทธิ์เข้าถึงฟังก์ชันนี้"
    }
};
