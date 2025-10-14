// Seed all extracted courses and related data into MySQL
const db = require('../mysql/db');

const categories = [
  'Office Package', 'Advance Office Package', 'Advance Accounting Package', 'Advance Graphics Designing',
  'Diploma in Computer Application', 'Practical Based Accounting Training', 'Web Development', 'Digital Marketing',
  'Social Media Handler', 'Computer Hardworking & Networking', 'Lok Sewa', 'Other Facilities', 'Study Abroad'
];

const courses = [
  {
    title: 'Office Package (Basic Course)',
    description: 'Fundamental of Computer, Typing (English & Nepali), Notepad / Wordpad, MS Paint, MS Word, MS Excel, MS PowerPoint, Email / Internet, Software Installation, Multimedia, Virus and Antivirus, Document Printing & Scanning',
    category: 'Office Package',
    duration_months: 3,
    fee: 3500,
    modules: [
      'Fundamental of Computer', 'Typing (English & Nepali)', 'Notepad / Wordpad', 'MS Paint', 'MS Word', 'MS Excel', 'MS PowerPoint', 'Email / Internet', 'Software Installation', 'Multimedia', 'Virus and Antivirus', 'Document Printing & Scanning'
    ]
  },
  {
    title: 'Advance Office Package',
    description: 'Basic Computer Course, Adobe Photoshop, Corel Draw, Canva (Editing & Presentation), Tally-9 / Tally ERP9 / Tally Prime, Advance Excel, Database Management, Basic Video Editing, Software Installation',
    category: 'Advance Office Package',
    duration_months: 6,
    fee: 10000,
    modules: [
      'Basic Computer Course', 'Adobe Photoshop', 'Corel Draw', 'Canva (Editing & Presentation)', 'Tally-9 / Tally ERP9 / Tally Prime', 'Advance Excel', 'Database Management', 'Basic Video Editing', 'Software Installation'
    ]
  },
  {
    title: 'Advance Accounting Package',
    description: 'Basic Computer Course, Tally-9 / Tally ERP-9 / Tally Prime, Swastik, Advance Excel, Adobe Photoshop, VAT Bill Register Maintain, VCTS Bill, Database Management',
    category: 'Advance Accounting Package',
    duration_months: 6,
    fee: 12000,
    modules: [
      'Basic Computer Course', 'Tally-9 / Tally ERP-9 / Tally Prime', 'Swastik', 'Advance Excel', 'Adobe Photoshop', 'VAT Bill Register Maintain', 'VCTS Bill', 'Database Management'
    ]
  },
  {
    title: 'Advance Graphics Designing',
    description: 'Basic Computer Course, Adobe Photoshop, Adobe Illustrator, Adobe Indesign / Pagemaker, Corel Draw, Advance Excel link with Photoshop, Online Graphic Designing, Canva (Editing & Animation), Email/Internet, Online Graphic Concepts',
    category: 'Advance Graphics Designing',
    duration_months: 4,
    fee: 18000,
    modules: [
      'Basic Computer Course', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Indesign / Pagemaker', 'Corel Draw', 'Advance Excel link with Photoshop', 'Online Graphic Designing', 'Canva (Editing & Animation)', 'Email/Internet', 'Online Graphic Concepts'
    ]
  },
  {
    title: 'Diploma in Computer Application (DCA)',
    description: 'Basic Computer Course, Tally-9 / Tally ERP-9 / Tally Prime, Swastik, Advance Excel, VAT Bill Register Maintain, VCTS Bill, Online form Training, Adobe Photoshop, Adobe Illustrator / Indesign, Corel Draw, Database Management, Basic Video Editing, Hardware and software installation, Online graphic designing, HTML / CSS, C, C++, Java, JavaScript, PHP, Python',
    category: 'Diploma in Computer Application',
    duration_months: 12,
    fee: 18000,
    modules: [
      'Basic Computer Course', 'Tally-9 / Tally ERP-9 / Tally Prime', 'Swastik', 'Advance Excel', 'VAT Bill Register Maintain', 'VCTS Bill', 'Online form Training', 'Adobe Photoshop', 'Adobe Illustrator / Indesign', 'Corel Draw', 'Database Management', 'Basic Video Editing', 'Hardware and software installation', 'Online graphic designing', 'HTML / CSS', 'C, C++, Java, JavaScript, PHP, Python'
    ]
  },
  {
    title: 'Practical Based Accounting Training',
    description: 'Basic Computer Course, Tally and Swastik, Accountant Training, Cashier Training, Store Keeper Training, School Accounting Training, Hotel Accounting Training',
    category: 'Practical Based Accounting Training',
    duration_months: 6,
    fee: 10000,
    modules: [
      'Basic Computer Course', 'Tally and Swastik', 'Accountant Training', 'Cashier Training', 'Store Keeper Training', 'School Accounting Training', 'Hotel Accounting Training'
    ]
  },
  {
    title: 'Web Development Course',
    description: 'HTML, CSS, Java / JavaScript, PHP / Python, Modern web development frameworks',
    category: 'Web Development',
    duration_months: 4,
    fee: 10000,
    modules: [
      'HTML', 'CSS', 'Java / JavaScript', 'PHP / Python', 'Modern web development frameworks'
    ]
  },
  {
    title: 'Digital Marketing Course',
    description: 'Basic Computer Course, SEO, Social Media Advertising, Online Advertising, Facebook Boost, Instagram Boost, Email Marketing / Content Design, Adobe Photoshop / Adobe Illustration',
    category: 'Digital Marketing',
    duration_months: 5,
    fee: 15000,
    modules: [
      'Basic Computer Course', 'SEO', 'Social Media Advertising', 'Online Advertising', 'Facebook Boost', 'Instagram Boost', 'Email Marketing / Content Design', 'Adobe Photoshop / Adobe Illustration'
    ]
  },
  {
    title: 'Social Media Handler Course',
    description: 'Adobe Photoshop, Adobe Illustrator, Facebook Boost, Instagram Boost, Marketing Advertisement, Post Design, Video Editing',
    category: 'Social Media Handler',
    duration_months: 3,
    fee: 6000,
    modules: [
      'Adobe Photoshop', 'Adobe Illustrator', 'Facebook Boost', 'Instagram Boost', 'Marketing Advertisement', 'Post Design', 'Video Editing'
    ]
  },
  {
    title: 'Computer Hardworking & Networking Course',
    description: 'Basic Computer Course, Explain Hardware, Explain Networking, Maintenance and Assembling Computer System, 15 days soft training for Hardware and Networking',
    category: 'Computer Hardworking & Networking',
    duration_months: 3,
    fee: 8000,
    modules: [
      'Basic Computer Course', 'Explain Hardware', 'Explain Networking', 'Maintenance and Assembling Computer System', '15 days soft training for Hardware and Networking'
    ]
  }
];

async function seed() {
  try {
    // Insert categories
    for (const cat of categories) {
      await db.query('INSERT IGNORE INTO categories (name) VALUES (?)', [cat]);
    }
    // Insert courses and modules
    for (const course of courses) {
      const [catRow] = await db.query('SELECT id FROM categories WHERE name = ?', [course.category]);
      const category_id = catRow[0]?.id;
      const [result] = await db.query('INSERT INTO courses (title, description, category_id, duration_months, fee) VALUES (?, ?, ?, ?, ?)', [course.title, course.description, category_id, course.duration_months, course.fee]);
      const course_id = result.insertId;
      for (const mod of course.modules) {
        await db.query('INSERT INTO modules (course_id, name) VALUES (?, ?)', [course_id, mod]);
      }
    }
    console.log('All courses and modules seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
