require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: `postgresql://restarant:86FXP40bpZMUg8L3DP3C0HNKxl3cINPT@dpg-d0hed0p5pdvs73eehud0-a.oregon-postgres.render.com/restarant_2uuc`,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
