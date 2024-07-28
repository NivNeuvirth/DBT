require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    require: true, // Enforce SSL connection
    rejectUnauthorized: false, // For development purposes, set this to false. In production, you should use a valid certificate.
  },
});

module.exports = pool;
