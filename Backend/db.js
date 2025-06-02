const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blogwebsite",
  password: "123",
  port: 5432, // Default PostgreSQL port
});

pool.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the psql database...");
  }
});

module.exports = { pool };
