const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');

// เส้นทางสำหรับการคืนครุภัณฑ์
router.post('/return', returnController.returnEquipment);

module.exports = router;
