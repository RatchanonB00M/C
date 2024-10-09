const express = require('express');
const router = express.Router();
const searchEquipmentController = require('../controllers/searchEquipmentController');

// กำหนดเส้นทางสำหรับการค้นหาครุภัณฑ์
router.get('/search', searchEquipmentController.searchEquipment);

module.exports = router;
