// Contact form MySQL model
const db = require('./db');

const createTable = async () => {
  await db.query(`CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending','responded') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
};

const addContact = async (contact) => {
  const sql = `INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`;
  const values = [contact.name, contact.email, contact.phone, contact.subject, contact.message];
  const [result] = await db.query(sql, values);
  return result.insertId;
};

const getContacts = async () => {
  const [rows] = await db.query('SELECT * FROM contacts ORDER BY createdAt DESC');
  return rows;
};

module.exports = { createTable, addContact, getContacts };
