const db = require('./db');

async function getAllCourses() {
  const [rows] = await db.query('SELECT * FROM courses');
  return rows;
}

async function getCourseById(id) {
  const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
  return rows[0];
}

async function createCourse(course) {
  const [result] = await db.query(
    'INSERT INTO courses (title, description, duration, fee) VALUES (?, ?, ?, ?)',
    [course.title, course.description, course.duration, course.fee]
  );
  return result.insertId;
}

async function updateCourse(id, course) {
  await db.query(
    'UPDATE courses SET title=?, description=?, duration=?, fee=? WHERE id=?',
    [course.title, course.description, course.duration, course.fee, id]
  );
  return getCourseById(id);
}

async function deleteCourse(id) {
  await db.query('DELETE FROM courses WHERE id = ?', [id]);
  return true;
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };