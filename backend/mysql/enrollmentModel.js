// Enrollment MySQL model
const db = require('./db');

const createTable = async () => {
  await db.query(`CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  await db.query(`CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending','approved','completed') DEFAULT 'pending',
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
  )`);
};

const addStudent = async (student) => {
  const sql = `INSERT INTO students (name, email, phone) VALUES (?, ?, ?)`;
  const values = [student.name, student.email, student.phone];
  const [result] = await db.query(sql, values);
  return result.insertId;
};

const enrollStudent = async (student_id, course_id) => {
  const sql = `INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)`;
  const [result] = await db.query(sql, [student_id, course_id]);
  return result.insertId;
};

const getEnrollments = async () => {
  const [rows] = await db.query(`
    SELECT e.id, s.name AS student, c.title AS course, e.status, e.enrolled_at
    FROM enrollments e
    JOIN students s ON e.student_id = s.id
    JOIN courses c ON e.course_id = c.id
    ORDER BY e.enrolled_at DESC
  `);
  return rows;
};

module.exports = { createTable, addStudent, enrollStudent, getEnrollments };
