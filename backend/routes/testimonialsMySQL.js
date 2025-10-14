const express = require('express');
const router = express.Router();
const { addTestimonial, getTestimonials } = require('../mysql/testimonialModel');

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await getTestimonials();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Add a testimonial
router.post('/', async (req, res) => {
  try {
    const { student_name, course_id, rating, feedback } = req.body;
    if (!student_name || !course_id || !rating || !feedback) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const id = await addTestimonial({ student_name, course_id, rating, feedback });
    res.status(201).json({ id });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add testimonial' });
  }
});

module.exports = router;
