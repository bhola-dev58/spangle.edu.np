// User MySQL model
const db = require('./db');

const createTable = async () => {
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','student','instructor') DEFAULT 'student',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
};

const addUser = async (user) => {
  const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  const values = [user.name, user.email, user.password, user.role || 'student'];
  const [result] = await db.query(sql, values);
  return result.insertId;
};

const getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

module.exports = { createTable, addUser, getUserByEmail };
