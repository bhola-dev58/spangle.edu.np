const express = require('express');
const router = express.Router();
const model = require('../mysql/courseModel');

router.get('/', async (req, res) => {
  try { res.json(await model.getAllCourses()); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await model.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Not found' });
    res.json(course);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

router.post('/', async (req, res) => {
  try {
    const id = await model.createCourse(req.body);
    res.status(201).json({ id });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

router.put('/:id', async (req, res) => {
  try { res.json(await model.updateCourse(req.params.id, req.body)); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

router.delete('/:id', async (req, res) => {
  try { await model.deleteCourse(req.params.id); res.json({ ok: true }); }
  catch (err) { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;