// MySQL Course Model (basic CRUD)
const db = require('./db');

const table = 'courses';

const createTable = async () => {
  await db.query(`CREATE TABLE IF NOT EXISTS ${table} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    level VARCHAR(50),
    weeks INT,
    hoursPerWeek INT,
    feeAmount DECIMAL(10,2),
    feeCurrency VARCHAR(10),
    installmentAvailable BOOLEAN,
    instructorName VARCHAR(100),
    instructorBio TEXT
  )`);
};

const addCourse = async (course) => {
  const sql = `INSERT INTO ${table} (title, description, category, level, weeks, hoursPerWeek, feeAmount, feeCurrency, installmentAvailable, instructorName, instructorBio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [course.title, course.description, course.category, course.level, course.weeks, course.hoursPerWeek, course.feeAmount, course.feeCurrency, course.installmentAvailable, course.instructorName, course.instructorBio];
  const [result] = await db.query(sql, values);
  return result.insertId;
};

const getCourses = async () => {
  const [rows] = await db.query(`SELECT * FROM ${table}`);
  return rows;
};

module.exports = { createTable, addCourse, getCourses };
