require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

let pool;

// Initialize database and create pool
async function initializeDatabase() {
  try {
    console.log('🔌 Initializing database connection...');
    
    // Connect to MySQL server (without DB)
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT
    });

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\``);
    console.log('✅ Database is created successfully or already exists.');

    // Use the database
    await connection.query(`USE \`${process.env.MYSQL_DATABASE}\``);

    // Read and execute schema.sql to create tables if not exist
    const schemaPath = path.join(__dirname, 'mysql', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      await connection.query(schema);
      console.log('✅ Database schema (tables) are created successfully or already exist.');
    } else {
      console.log('⚠️  schema.sql file not found. Skipping table creation.');
    }

    await connection.end();

    // Create connection pool
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    await pool.query('SELECT 1');
    console.log('✅ Database connected to backend successfully.');
    
    return pool;
  } catch (err) {
    console.error('❌ Error during database initialization:', err.message);
    process.exit(1);
  }
}

// Course Model (inline)
const courseModel = {
  getAllCourses: async () => {
    const [rows] = await pool.query('SELECT * FROM courses');
    return rows;
  },
  
  getCourseById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
  },
  
  createCourse: async (course) => {
    const [result] = await pool.query(
      'INSERT INTO courses (title, description, duration, fee) VALUES (?, ?, ?, ?)',
      [course.title, course.description, course.duration, course.fee]
    );
    return result.insertId;
  },
  
  updateCourse: async (id, course) => {
    await pool.query(
      'UPDATE courses SET title=?, description=?, duration=?, fee=? WHERE id=?',
      [course.title, course.description, course.duration, course.fee, id]
    );
    return courseModel.getCourseById(id);
  },
  
  deleteCourse: async (id) => {
    await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    return true;
  }
};

// Routes
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await courseModel.getAllCourses();
    console.log(`📤 GET /api/courses - Returning ${courses.length} courses`);
    res.json(courses);
  } catch (err) {
    console.error('❌ Error fetching courses:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await courseModel.getCourseById(req.params.id);
    if (!course) {
      console.log(`⚠️  GET /api/courses/${req.params.id} - Not found`);
      return res.status(404).json({ error: 'Not found' });
    }
    console.log(`📤 GET /api/courses/${req.params.id} - Found`);
    res.json(course);
  } catch (err) {
    console.error('❌ Error fetching course by ID:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    const id = await courseModel.createCourse(req.body);
    console.log(`✅ POST /api/courses - Created course ID: ${id}`);
    res.status(201).json({ id, message: 'Course created successfully' });
  } catch (err) {
    console.error('❌ Error creating course:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  try {
    const updated = await courseModel.updateCourse(req.params.id, req.body);
    console.log(`✅ PUT /api/courses/${req.params.id} - Updated`);
    res.json(updated);
  } catch (err) {
    console.error('❌ Error updating course:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await courseModel.deleteCourse(req.params.id);
    console.log(`✅ DELETE /api/courses/${req.params.id} - Deleted`);
    res.json({ ok: true, message: 'Course deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting course:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server after database is initialized
const PORT = process.env.PORT || 5000;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`✅ Server listening on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
    console.log(`📋 Endpoints:`);
    console.log(`   GET    /api/courses`);
    console.log(`   POST   /api/courses`);
    console.log(`   GET    /api/courses/:id`);
    console.log(`   PUT    /api/courses/:id`);
    console.log(`   DELETE /api/courses/:id`);
    console.log('='.repeat(50));
  });
});
