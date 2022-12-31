require("dotenv").config();
const PG = require("pg");

const pool = new PG.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

module.exports = pool;
