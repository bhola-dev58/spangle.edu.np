const express = require('express');
const router = express.Router();
const { addStudent, enrollStudent, getEnrollments } = require('../mysql/enrollmentModel');

// Get all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await getEnrollments();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Enroll a student in a course
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, course_id } = req.body;
    if (!name || !email || !course_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const student_id = await addStudent({ name, email, phone });
    const enrollment_id = await enrollStudent(student_id, course_id);
    res.status(201).json({ enrollment_id });
  } catch (err) {
    res.status(400).json({ error: 'Failed to enroll student' });
  }
});

module.exports = router;
