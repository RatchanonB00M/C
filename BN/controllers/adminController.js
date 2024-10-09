const { sql, connectDB } = require('../dbConfig');

// ดึงข้อมูลอุปกรณ์จากฐานข้อมูล
exports.getAllEquipment = async (req, res) => {
    try {
        const pool = await connectDB();

        // Query to fetch the required columns from the Equipment table
        const result = await pool.request()
            .query(`SELECT EquipmentId, EquipmentName, Description, Status, PurchaseDate, Category, CreatedDate 
                    FROM Equipment`);

        // Check if equipment data exists
        if (result.recordset.length > 0) {
            return res.status(200).json(result.recordset);  // Send the data to the frontend
        } else {
            return res.status(404).json({ message: 'No equipment found' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Error retrieving equipment data' });
    }
};

// ฟังก์ชันเพิ่มครุภัณฑ์
exports.addEquipment = async (req, res) => {
    const { equipmentId, equipmentName, description, status, purchaseDate, category } = req.body;

    try {
        const pool = await connectDB();

        // ตรวจสอบว่ามีครุภัณฑ์ที่มี ID ซ้ำหรือไม่
        const checkExisting = await pool.request()
            .input('equipmentId', sql.NVarChar, equipmentId)
            .query('SELECT * FROM Equipment WHERE EquipmentId = @equipmentId');

        if (checkExisting.recordset.length > 0) {
            return res.status(400).json({ message: 'ครุภัณฑ์นี้มีอยู่แล้ว' });
        }

        // เพิ่มข้อมูลครุภัณฑ์
        await pool.request()
            .input('equipmentId', sql.NVarChar, equipmentId)
            .input('equipmentName', sql.NVarChar, equipmentName)
            .input('description', sql.NVarChar, description)
            .input('status', sql.NVarChar, status)
            .input('purchaseDate', sql.Date, purchaseDate)
            .input('category', sql.NVarChar, category)
            .query(`INSERT INTO Equipment (EquipmentId, EquipmentName, Description, Status, PurchaseDate, Category, CreatedDate) 
                    VALUES (@equipmentId, @equipmentName, @description, @status, @purchaseDate, @category, GETDATE())`);

        return res.status(201).json({ message: 'เพิ่มครุภัณฑ์สำเร็จ' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มครุภัณฑ์' });
    }
};

// ฟังก์ชันลบครุภัณฑ์
exports.deleteEquipment = async (req, res) => {
    const { equipmentId } = req.params;

    try {
        const pool = await connectDB();

        // ตรวจสอบว่ามีครุภัณฑ์นี้หรือไม่
        const checkExisting = await pool.request()
            .input('equipmentId', sql.NVarChar, equipmentId)
            .query('SELECT * FROM Equipment WHERE EquipmentId = @equipmentId');

        if (checkExisting.recordset.length === 0) {
            return res.status(404).json({ message: 'ไม่พบครุภัณฑ์ที่ต้องการลบ' });
        }

        // ลบข้อมูลครุภัณฑ์
        await pool.request()
            .input('equipmentId', sql.NVarChar, equipmentId)
            .query('DELETE FROM Equipment WHERE EquipmentId = @equipmentId');

        return res.status(200).json({ message: 'ลบครุภัณฑ์สำเร็จ' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบครุภัณฑ์' });
    }
};

// ฟังก์ชันแก้ไขครุภัณฑ์
exports.updateEquipment = async (req, res) => {
    const { equipmentId } = req.params;
    const { equipmentName, description, status, purchaseDate, category } = req.body;

    try {
        const pool = await connectDB();

        // ตรวจสอบว่ามีครุภัณฑ์นี้หรือไม่
        const checkExisting = await pool.request()
            .input('equipmentId', sql.NVarChar, equipmentId)
            .query('SELECT * FROM Equipment WHERE EquipmentId = @equipmentId');

        if (checkExisting.recordset.length === 0) {
            return res.status(404).json({ message: 'ไม่พบครุภัณฑ์ที่ต้องการแก้ไข' });
        }

        // แก้ไขข้อมูลครุภัณฑ์
        await pool.request()
            .input('equipmentId', sql.NVarChar, equipmentId)
            .input('equipmentName', sql.NVarChar, equipmentName)
            .input('description', sql.NVarChar, description)
            .input('status', sql.NVarChar, status)
            .input('purchaseDate', sql.Date, purchaseDate)
            .input('category', sql.NVarChar, category)
            .query(`UPDATE Equipment 
                    SET EquipmentName = @equipmentName, 
                        Description = @description, 
                        Status = @status, 
                        PurchaseDate = @purchaseDate, 
                        Category = @category 
                    WHERE EquipmentId = @equipmentId`);

        return res.status(200).json({ message: 'แก้ไขข้อมูลครุภัณฑ์สำเร็จ' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการแก้ไขครุภัณฑ์' });
    }
};
