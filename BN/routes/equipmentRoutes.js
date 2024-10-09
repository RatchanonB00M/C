const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

// เส้นทางสำหรับการแสดงครุภัณฑ์ทั้งหมด
router.get('/all', equipmentController.getAllEquipment);

module.exports = router;
