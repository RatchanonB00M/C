const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

// เส้นทางสำหรับการยืมครุภัณฑ์
router.post('/', borrowController.borrowEquipment);

module.exports = router;
