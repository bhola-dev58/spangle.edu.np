// Standalone script to manually insert team members into Firebase
// Run with: node src/scripts/insertTeamManually.js
// Make sure to set environment variables or have .env file in the project root

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Error: Firebase configuration is missing!');
  console.error('Please ensure your .env file exists and contains all required REACT_APP_FIREBASE_* variables.');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Team members data
const teamMembers = [
  {
    name: 'Jabbar Ali',
    position: 'Founder & Lead Instructor',
    department: 'M.B.S Account',
    experience: 15,
    rating: 5,
    image: '/assets/our_experts/Jabbar_Ali.jpg',
    quote: 'Transforming learners into skilled professionals with real-world accounting expertise.'
  },
  {
    name: 'Amit Parjapati (M.D)',
    position: 'Managing Director',
    department: 'Office Management',
    experience: 8,
    rating: 4,
    image: '/assets/our_experts/Amit_parjapati.jpg',
    quote: 'Leading with vision and efficiency to create a culture of excellence in management.'
  },
  {
    name: 'Rohit Yadav (O.A)',
    position: 'Opthalmic Assistant',
    department: 'Bridge Course',
    experience: 8,
    rating: 4,
    image: '/assets/our_experts/Rohit_yadav.jpg',
    quote: 'Dedicated to enhancing vision and knowledge for a brighter future.'
  },
  {
    name: 'Dr. Kushal Gautam (Ph.D.)',
    position: 'English Lecturer',
    department: 'Bridge Course',
    experience: 12,
    rating: 5,
    image: '/assets/our_experts/Kushal_gautam.jpg',
    quote: 'Empowering students to express their thoughts with confidence and clarity through language.'
  },
  {
    name: 'Jatish Chaudahry (M.Ed)',
    position: 'Math Lecturer',
    department: 'Bridge Course',
    experience: 12,
    rating: 4,
    image: '/assets/our_experts/Jatish_chaudahry.jpg',
    quote: 'Inspiring logical thinking and problem-solving through the beauty of mathematics.'
  },
  {
    name: 'Bharat Giri (M.Sc)',
    position: 'Chemistry Lecturer',
    department: 'Bridge Course',
    experience: 15,
    rating: 4,
    image: '/assets/our_experts/Bharat_Giri.jpg',
    quote: 'Exploring the wonders of chemistry to understand the world at its core.'
  },
  {
    name: 'Ashfaq hussein (M.Sc)',
    position: 'Biology Lecturer',
    department: 'Bridge Course',
    experience: 11,
    rating: 4,
    image: '/assets/our_experts/Ashfaq_hussein.jpg',
    quote: 'Connecting students with the science of life through curiosity and discovery.'
  },
  {
    name: 'Sakcham Tripathi (M.B.B.S)',
    position: 'Biology Lecturer',
    department: 'Bridge Course',
    experience: 12,
    rating: 4,
    image: '/assets/our_experts/Sakcham_tripathi.jpg',
    quote: 'Bridging medicine and biology to inspire future healthcare professionals.'
  },
  {
    name: 'Bibash Dungana (B.V.Sc. Veterinary Doctor)',
    position: 'Biology Teacher',
    department: 'Bridge Course',
    experience: 8,
    rating: 4,
    image: '/assets/our_experts/Bibash_Dungana.png',
    quote: 'Teaching the harmony of life through biological science and animal care.'
  },
  {
    name: 'Shailendra Yadav (B.Sc)',
    position: 'Physics Teacher',
    department: 'Bridge Course',
    experience: 10,
    rating: 4,
    image: '/assets/our_experts/Sailendra_yadav.jpg',
    quote: 'Unveiling the laws of the universe to spark scientific curiosity in every learner.'
  }
];

// Function to insert team members
async function insertTeamMembers() {
  console.log('🚀 Starting manual team insertion into Firebase...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const member of teamMembers) {
    try {
      const teamData = {
        ...member,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'team'), teamData);
      successCount++;
      console.log(`✅ Successfully added: ${member.name}`);
    } catch (error) {
      failCount++;
      console.error(`❌ Failed to add ${member.name}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 INSERTION SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successfully added: ${successCount} members`);
  console.log(`❌ Failed: ${failCount} members`);
  console.log(`📝 Total attempted: ${teamMembers.length} members`);
  console.log('='.repeat(50) + '\n');
  
  if (successCount === teamMembers.length) {
    console.log('🎉 All team members inserted successfully!');
  }
  
  process.exit(0);
}

// Run the insertion
insertTeamMembers().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
