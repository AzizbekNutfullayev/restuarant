require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: `postgresql://restarant:hLTNOPzMvobTg8u1s3K06qPSduNQCmCP@dpg-d1fun2umcj7s73c4uvag-a.oregon-postgres.render.com/restarant_mjcv`,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

