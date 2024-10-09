const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController'); // นำเข้า historyController
const { verifyToken, isAdminOrStaff } = require('../middleware/authMiddleware'); // นำเข้า middleware สำหรับตรวจสอบสิทธิ์

// เส้นทาง API สำหรับดูประวัติการยืม-คืน (Admin หรือ Staff เท่านั้น)
router.get('/:id', verifyToken, isAdminOrStaff, historyController.getUserHistory); 

module.exports = router;
