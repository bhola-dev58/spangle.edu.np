// Script to migrate hardcoded team data to Firebase
import { addTeam } from '../firebase/firestoreService';

const teamData = [
  {
    name: 'Jabbar Ali',
    position: 'Founder & Lead Instructor',
    department: 'M.B.S Account',
    experience: 15,
    rating: 5,
    image: '/assets/our_experts/kk sir.jpg',
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
  },
];

export const migrateTeamData = async () => {
  console.log('🚀 Starting team migration to Firebase...');
  
  let successCount = 0;
  let failCount = 0;

  for (const member of teamData) {
    try {
      await addTeam(member);
      successCount++;
      console.log(`✅ Added: ${member.name}`);
    } catch (error) {
      failCount++;
      console.error(`❌ Failed to add ${member.name}:`, error.message);
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`✅ Successfully added: ${successCount} members`);
  console.log(`❌ Failed: ${failCount} members`);
  console.log(`📝 Total: ${teamData.length} members`);
  
  return { successCount, failCount, total: teamData.length };
};
