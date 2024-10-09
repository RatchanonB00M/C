const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const { verifyToken, isAdminOrStaff } = require('../middleware/authMiddleware');

// เส้นทาง API สำหรับจัดการครุภัณฑ์ (เฉพาะ Admin หรือ Staff เท่านั้น)
router.post('/', verifyToken, isAdminOrStaff, equipmentController.addEquipment); // เพิ่มครุภัณฑ์
router.put('/:id', verifyToken, isAdminOrStaff, equipmentController.updateEquipment); // แก้ไขครุภัณฑ์
router.delete('/:id', verifyToken, isAdminOrStaff, equipmentController.deleteEquipment); // ลบครุภัณฑ์

module.exports = router;
