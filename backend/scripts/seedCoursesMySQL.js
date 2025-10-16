require('dotenv').config();
const db = require('../mysql/db');

async function seed() {
  await db.query('DELETE FROM courses');
  await db.query(
    'INSERT INTO courses (title, description, duration, fee) VALUES (?, ?, ?, ?), (?, ?, ?, ?)',
    [
      'Office Package (Basic Course)',
      'Fundamental of Computer, Typing (English & Nepali), Notepad / Wordpad, MS Paint, MS Word, MS Excel, MS PowerPoint, Email / Internet, Software Installation, Multimedia, Virus and Antivirus, Document Printing & Scanning',
      '3 Month',
      '3500',
      'Advance Office Package',
      'Basic Computer Course, Adobe Photoshop, Corel Draw, Canva (Editing & Presentation), Tally-9 / Tally ERP9 / Tally Prime, Advance Excel, Database Management, Basic Video Editing, Software Installation',
      '6 Month',
      '10,000'
    ]
  );
  console.log('Seeded courses!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });