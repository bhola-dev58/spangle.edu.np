const express = require('express');
const router = express.Router();
const { addContact, getContacts } = require('../mysql/contactModel');

// Get all contact submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await getContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Submit a new contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const id = await addContact({ name, email, phone, subject, message });
    res.status(201).json({ id });
  } catch (err) {
    res.status(400).json({ error: 'Failed to submit contact form' });
  }
});

module.exports = router;
