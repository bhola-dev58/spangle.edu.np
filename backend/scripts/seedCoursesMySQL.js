// Seed courses into MySQL
const { createTable, addCourse } = require('../mysql/courseModel');

const courses = [
  {
    title: 'Web Development Bootcamp',
    description: 'Learn HTML, CSS, JS, and React.',
    category: 'Web Development',
    level: 'Beginner',
    weeks: 8,
    hoursPerWeek: 6,
    feeAmount: 12000,
    feeCurrency: 'NPR',
    installmentAvailable: true,
    instructorName: 'John Doe',
    instructorBio: 'Senior Web Developer.'
  },
  {
    title: 'Digital Marketing Essentials',
    description: 'SEO, SEM, Social Media, and Analytics.',
    category: 'Digital Marketing',
    level: 'Intermediate',
    weeks: 6,
    hoursPerWeek: 4,
    feeAmount: 9000,
    feeCurrency: 'NPR',
    installmentAvailable: false,
    instructorName: 'Jane Smith',
    instructorBio: 'Marketing Expert.'
  }
];

(async () => {
  try {
    await createTable();
    for (const course of courses) {
      await addCourse(course);
    }
    console.log('Courses seeded to MySQL!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
