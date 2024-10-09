const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route for adding equipment
router.post('/add-equipment', adminController.addEquipment);

// Route for deleting equipment
router.delete('/delete-equipment/:equipmentId', adminController.deleteEquipment);

// Route for updating equipment
router.put('/update-equipment/:equipmentId', adminController.updateEquipment);

// Route to fetch all equipment
router.get('/get-all-equipment', adminController.getAllEquipment);
module.exports = router;
