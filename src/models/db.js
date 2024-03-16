// src/models/db.js

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
