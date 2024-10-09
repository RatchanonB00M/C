const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// เส้นทาง API สำหรับการเข้าสู่ระบบและออกจากระบบ
router.post('/login', authController.login);  // ใช้สำหรับ login
router.post('/logout', authController.logout);  // ใช้สำหรับ logout

module.exports = router;
