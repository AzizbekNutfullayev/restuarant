const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const toyxonaRoutes = require("./routes/toyxonaRoutes");
const adminRoutes = require("./routes/adminRoutes");
const usersRoutes = require("./routes/usersRoutes");
const bronRoutes = require("./routes/bronRoutes");

const app = express();

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, './uploads')));

//  Auth: login / register
app.use("/auth", authRoutes);

//  Toyxona CRUD
app.use("/toyxonalar", toyxonaRoutes);

//  Admin panel route
app.use("/admin", adminRoutes);

//  Foydalanuvchilar route
app.use("/user", usersRoutes);

//  Bron qilish route
app.use("/api/bron", bronRoutes);

//  Serverni ishga tushurish
const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
