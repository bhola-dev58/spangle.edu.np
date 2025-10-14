const express = require('express');
const router = express.Router();
const db = require('../mysql/db');

// Get all courses with modules and category
router.get('/', async (req, res) => {
  try {
    const [courses] = await db.query(`
      SELECT c.id, c.title, c.description, c.duration_months, c.fee, cat.name AS category
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
    `);
    for (const course of courses) {
      const [modules] = await db.query('SELECT name FROM modules WHERE course_id = ?', [course.id]);
      course.modules = modules.map(m => m.name);
    }
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Add a new course
router.post('/', async (req, res) => {
  try {
    const { title, description, category, duration_months, fee, modules } = req.body;
    // Find or create category
    let [catRows] = await db.query('SELECT id FROM categories WHERE name = ?', [category]);
    let category_id = catRows[0]?.id;
    if (!category_id) {
      const [catResult] = await db.query('INSERT INTO categories (name) VALUES (?)', [category]);
      category_id = catResult.insertId;
    }
    // Insert course
    const [result] = await db.query('INSERT INTO courses (title, description, category_id, duration_months, fee) VALUES (?, ?, ?, ?, ?)', [title, description, category_id, duration_months, fee]);
    const course_id = result.insertId;
    // Insert modules
    if (modules && Array.isArray(modules)) {
      for (const mod of modules) {
        await db.query('INSERT INTO modules (course_id, name) VALUES (?, ?)', [course_id, mod]);
      }
    }
    res.status(201).json({ id: course_id });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add course' });
  }
});

// Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const course_id = req.params.id;
    await db.query('DELETE FROM modules WHERE course_id = ?', [course_id]);
    await db.query('DELETE FROM courses WHERE id = ?', [course_id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Update a course
router.put('/:id', async (req, res) => {
  try {
    const course_id = req.params.id;
    const { title, description, category, duration_months, fee, modules } = req.body;
    let [catRows] = await db.query('SELECT id FROM categories WHERE name = ?', [category]);
    let category_id = catRows[0]?.id;
    if (!category_id) {
      const [catResult] = await db.query('INSERT INTO categories (name) VALUES (?)', [category]);
      category_id = catResult.insertId;
    }
    await db.query('UPDATE courses SET title=?, description=?, category_id=?, duration_months=?, fee=? WHERE id=?', [title, description, category_id, duration_months, fee, course_id]);
    await db.query('DELETE FROM modules WHERE course_id = ?', [course_id]);
    if (modules && Array.isArray(modules)) {
      for (const mod of modules) {
        await db.query('INSERT INTO modules (course_id, name) VALUES (?, ?)', [course_id, mod]);
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update course' });
  }
});

module.exports = router;
