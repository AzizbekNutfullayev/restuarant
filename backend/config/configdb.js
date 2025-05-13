const { Pool} = require("pg");

const pool = new Pool({
  user: "restarant",
  host: "localhost",
  database: "restarant_2uuc",
  password: "1234",
  port: 5432,
});

module.exports = pool;