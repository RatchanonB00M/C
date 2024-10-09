const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// นำเข้าเส้นทาง (Routes)

const userRoutes = require("./routes/users");
const borrowRoutes = require('./routes/borrowRoutes');
const returnRoutes = require('./routes/returnRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const adminRoutes = require('./routes/adminRoutes'); // เพิ่มเส้นทางของ Admin

dotenv.config(); // โหลดค่าตัวแปรสภาพแวดล้อมจากไฟล์ .env
app.use(express.json()); // สำหรับรองรับ JSON body

// Middleware
app.use(cors());
app.use(bodyParser.json());

// กำหนดเส้นทางสำหรับผู้ใช้
app.use("/api/users", userRoutes);

// ใช้เส้นทาง API
app.use('/borrow', borrowRoutes);
app.use('/api', returnRoutes);
app.use('/equipment', equipmentRoutes);

//admin
app.use('/admin', adminRoutes);

// เส้นทางพื้นฐานเพื่อตรวจสอบว่าเซิร์ฟเวอร์ทำงาน
app.get("/", (req, res) => {
  res.send("เซิร์ฟเวอร์กำลังทำงาน");
});

// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend กำลังทำงานที่พอร์ต ${PORT}`);
});
