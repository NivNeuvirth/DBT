const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432, // default PostgreSQL port
});

const query = async (text, params) => {
    const { rows } = await pool.query(text, params);
    return rows;
};

module.exports = {
    query,
};