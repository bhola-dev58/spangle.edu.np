// Testimonial MySQL model
const db = require('./db');

const createTable = async () => {
  await db.query(`CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    course_id INT,
    rating INT,
    feedback TEXT,
    status ENUM('pending','approved') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
  )`);
};

const addTestimonial = async (testimonial) => {
  const sql = `INSERT INTO testimonials (student_name, course_id, rating, feedback) VALUES (?, ?, ?, ?)`;
  const values = [testimonial.student_name, testimonial.course_id, testimonial.rating, testimonial.feedback];
  const [result] = await db.query(sql, values);
  return result.insertId;
};

const getTestimonials = async () => {
  const [rows] = await db.query(`
    SELECT t.id, t.student_name, c.title AS course, t.rating, t.feedback, t.status, t.createdAt
    FROM testimonials t
    JOIN courses c ON t.course_id = c.id
    ORDER BY t.createdAt DESC
  `);
  return rows;
};

module.exports = { createTable, addTestimonial, getTestimonials };
