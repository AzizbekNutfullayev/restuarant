const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const toyxonaRoutes = require("./routes/toyxonaRoutes");
const adminRoutes = require("./routes/adminRoutes");
const usersRoutes = require("./routes/usersRoutes");
const bronRoutes = require('./routes/bronRoutes');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use('/uploads', express.static('uploads'));
// login and register
app.use("/auth", authRoutes);

// resturant 
app.use("/toyxonalar", toyxonaRoutes); 
//admin
app.use('/admin',adminRoutes)
//user
app.use('/user',usersRoutes)


// bron
app.use('/api/bron', bronRoutes);

// bronlar
app.listen(1111, () => {
  console.log("Server is running on port 1111");
});
