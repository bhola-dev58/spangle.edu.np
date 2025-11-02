/**
 * Helper function to get the correct image path for team members
 * Handles both old database paths and new paths
 */
export const getTeamImagePath = (imagePath) => {
  if (!imagePath) {
    return 'https://via.placeholder.com/400x450/6366f1/white?text=No+Image';
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Extract filename from various possible formats
  let filename = imagePath;
  
  // Remove leading slashes and "assets/" prefix
  filename = filename.replace(/^\/+/, '').replace(/^assets\/+/, '');
  
  // If it's from our_experts folder, extract just the filename
  if (filename.includes('our_experts/')) {
    filename = filename.split('our_experts/')[1];
  }
  
  // Map common name variations to actual filenames
  const filenameMap = {
    'kk sir.jpg': 'Jabbar_Ali.jpg',
    'Amit_parjapati.jpg': 'Amit_parjapati.jpg',
    'Rohit_yadav.jpg': 'Rohit_yadav.jpg',
    'Sakcham_tripathi.jpg': 'Sakcham_tripathi.jpg',
    'Muarli.jpg': 'Muarli.jpg',
    'Kushal_gautam.jpg': 'Kushal_gautam.jpg',
    'Sailendra_yadav.jpg': 'Sailendra_yadav.jpg',
    'Shailendra_yadav.jpg': 'Sailendra_yadav.jpg', // Alternative spelling
    'Ashfaq_hussein.jpg': 'Ashfaq_hussein.jpg',
    'Bibash_Dungana.png': 'Bibash_Dungana.png',
    'Bibash Dungana.png': 'Bibash_Dungana.png', // Handle space
    'Bharat_Giri.jpg': 'Bharat_Giri.jpg',
    'Jatish_chaudahry.jpg': 'Jatish_chaudahry.jpg',
    'Jatish chaudahry.jpg': 'Jatish_chaudahry.jpg', // Handle space
    'Jabbar_Ali.jpg': 'Jabbar_Ali.jpg'
  };

  // Get the actual filename
  const actualFilename = filenameMap[filename] || filename;

  try {
    // Use require to import the image from assets
    return require(`../assets/our_experts/${actualFilename}`);
  } catch (error) {
    console.warn(`Image not found: ${actualFilename}`, error);
    return 'https://via.placeholder.com/400x450/6366f1/white?text=Image+Not+Found';
  }
};
