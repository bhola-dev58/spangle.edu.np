// Test script to verify all API endpoints are working
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Backend API Endpoints\n');
  console.log('API URL:', API_URL);
  console.log('=' .repeat(50));

  try {
    // Test 1: GET /api/courses
    console.log('\n1️⃣ Testing GET /api/courses');
    const getResponse = await axios.get(`${API_URL}/courses`);
    console.log('✅ Status:', getResponse.status);
    console.log('✅ Courses found:', getResponse.data.length);
    console.log('   Courses:', getResponse.data.map(c => ({ id: c.id, title: c.title })));

    // Test 2: POST /api/courses
    console.log('\n2️⃣ Testing POST /api/courses');
    const newCourse = {
      title: 'Test Course API',
      description: 'This is a test course created via API',
      duration: '2 Months',
      fee: 'Rs. 5,000'
    };
    const postResponse = await axios.post(`${API_URL}/courses`, newCourse);
    console.log('✅ Status:', postResponse.status);
    console.log('✅ Created course ID:', postResponse.data.id);
    const createdId = postResponse.data.id;

    // Test 3: GET /api/courses/:id
    console.log('\n3️⃣ Testing GET /api/courses/:id');
    const getOneResponse = await axios.get(`${API_URL}/courses/${createdId}`);
    console.log('✅ Status:', getOneResponse.status);
    console.log('✅ Course:', getOneResponse.data);

    // Test 4: PUT /api/courses/:id
    console.log('\n4️⃣ Testing PUT /api/courses/:id');
    const updatedCourse = {
      title: 'Test Course API (Updated)',
      description: 'This is an updated test course',
      duration: '3 Months',
      fee: 'Rs. 7,500'
    };
    const putResponse = await axios.put(`${API_URL}/courses/${createdId}`, updatedCourse);
    console.log('✅ Status:', putResponse.status);
    console.log('✅ Updated course:', putResponse.data);

    // Test 5: DELETE /api/courses/:id
    console.log('\n5️⃣ Testing DELETE /api/courses/:id');
    const deleteResponse = await axios.delete(`${API_URL}/courses/${createdId}`);
    console.log('✅ Status:', deleteResponse.status);
    console.log('✅ Response:', deleteResponse.data);

    // Final check
    console.log('\n6️⃣ Final GET /api/courses');
    const finalResponse = await axios.get(`${API_URL}/courses`);
    console.log('✅ Courses after deletion:', finalResponse.data.length);

    console.log('\n' + '='.repeat(50));
    console.log('✅ ALL TESTS PASSED! API is working correctly! 🎉');
    console.log('='.repeat(50) + '\n');
    
  } catch (error) {
    console.error('\n❌ TEST FAILED!');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    process.exit(1);
  }
}

testAPI();
