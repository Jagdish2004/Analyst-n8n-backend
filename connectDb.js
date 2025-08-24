require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || '',
  ssl: {
    rejectUnauthorized: false // allow self-signed certs
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
  } catch (err) {
    console.error('Connection error:', err.stack);
  }
}

connectDB();

module.exports = client; 
