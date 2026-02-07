import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getAllCourses, addEnrollment } from '../firebase/firestoreService';
import LoadingSpinner from '../components/LoadingSpinner';
import EnrollmentForm from '../components/EnrollmentForm';
import Notification from '../components/Notification';

const staticCourses = [
  // Computer Courses
  {
    id: 1,
    title: 'Office Package (Basic Course)',
    description: 'Fundamental of Computer, Typing (English & Nepali), MS Office Suite, Email/Internet, Document printing & scanning',
    instructor: 'Expert Instructor',
    level: 'Beginner',
    price: 3500,
    rating: 4.8,
    reviews: 245,
    category: 'Computer Courses',
    skillLevel: 'Beginner',
    image: '💼',
    isBestSeller: true,
    duration: '3 months',
    syllabus: ['Fundamental of Computer', 'Typing (English & Nepali)', 'Notepad / Wordpad', 'Ms-paint', 'Ms-word', 'Ms-Excel', 'Ms-Powerpoint', 'Email / Internet', 'Software Installation', 'Multimedia', 'Virus and Antiviruses', 'Document printing & scanning']
  },
  {
    id: 2,
    title: 'Advance Office Package',
    description: 'Advanced MS Office, Adobe Photoshop, Corel Draw, Canva, Tally, Database Management, Basic Video Editing',
    instructor: 'Expert Instructor',
    level: 'Intermediate',
    price: 10000,
    rating: 4.7,
    reviews: 198,
    category: 'Computer Courses',
    skillLevel: 'Intermediate',
    image: '📊',
    isBestSeller: true,
    duration: '6 months',
    syllabus: ['Basic Computer Course', 'Adobe Photoshop', 'Corel Draw', 'Canva (Editing & Presentation)', 'Tally-9 / Tally ERP-9 / Tally Prime', 'Advance Excel', 'Database Management', 'Basic Video Editing', 'Software Installation']
  },
  {
    id: 3,
    title: 'Advance Accounting Package',
    description: 'Comprehensive accounting with Tally, SwaStik, VAT Bill Register, VCTS Bill, Advanced Excel & Photoshop',
    instructor: 'CA Expert',
    level: 'Intermediate',
    price: 10000,
    rating: 4.9,
    reviews: 176,
    category: 'Accounting',
    skillLevel: 'Intermediate',
    image: '📈',
    isBestSeller: false,
    duration: '6 months',
    syllabus: ['Basic Computer Course', 'Tally-9 / Tally ERP-9 / Tally Prime', 'SwaStik', 'Advance Excel', 'Adobe Photoshop', 'VAT Bill Register Maintain', 'VCTS Bill', 'Database Management']
  },
  {
    id: 4,
    title: 'Advance Graphics Designing',
    description: 'Professional graphic design with Adobe Suite, Corel Draw, Online Graphic Designing, Canva Animation',
    instructor: 'Design Expert',
    level: 'Intermediate',
    price: 18000,
    rating: 4.8,
    reviews: 234,
    category: 'Design',
    skillLevel: 'Intermediate',
    image: '🎨',
    isBestSeller: true,
    duration: '4 months',
    syllabus: ['Basic Computer Course', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Indesign / Pagemaker', 'Corel Draw', 'Advance Excel link with Photoshop', 'Online Graphic Designing', 'Canva (Editing & Animation)', 'Email / Internet', 'Online Graphic Concepts']
  },
  {
    id: 5,
    title: 'Diploma in Computer Application (DCA)',
    description: 'Complete diploma covering accounting, graphic design, web development, database management and programming',
    instructor: 'Senior Faculty',
    level: 'All Levels',
    price: 18000,
    rating: 4.9,
    reviews: 312,
    category: 'Computer Courses',
    skillLevel: 'All Levels',
    image: '🎓',
    isBestSeller: true,
    duration: '1 year',
    syllabus: ['Basic Computer Course', 'Tally / SwaStik', 'Advance Excel', 'VAT Bill / VCTS Bill', 'Online Form Training', 'Adobe Photoshop / Illustrator / Indesign', 'Corel Draw', 'Database Management', 'Basic Video Editing', 'Hardware and Software Installation', 'Online Graphic Designing', 'HTML / CSS', 'C, C++, Java, JavaScript, PHP, Python']
  },
  {
    id: 6,
    title: 'Practical Based Accounting Training',
    description: 'Hands-on accounting training for various sectors: Cashier, Store Keeper, School & Hotel Accounting',
    instructor: 'Accounting Professional',
    level: 'Intermediate',
    price: 10000,
    rating: 4.7,
    reviews: 145,
    category: 'Accounting',
    skillLevel: 'Intermediate',
    image: '�',
    isBestSeller: false,
    duration: '6 months',
    syllabus: ['Basic Computer Course', 'Tally and SwaStik', 'Accountant Training', 'Cashier Training', 'Store Keeper Training', 'School Accounting Training', 'Hotel Accounting Training']
  },
  {
    id: 7,
    title: 'Web Development Course',
    description: 'Full stack web development with HTML, CSS, JavaScript, PHP, Python and modern frameworks',
    instructor: 'Web Developer',
    level: 'Intermediate',
    price: 16000,
    rating: 4.8,
    reviews: 267,
    category: 'Web Development',
    skillLevel: 'Intermediate',
    image: '💻',
    isBestSeller: true,
    duration: '4 months',
    syllabus: ['HTML', 'CSS', 'Java / JavaScript', 'PHP / Python', 'Modern Web Development Frameworks']
  },
  {
    id: 8,
    title: 'Digital Marketing Course',
    description: 'Complete digital marketing: SEO, Social Media Advertising, Email Marketing, Facebook & Instagram Boost',
    instructor: 'Marketing Expert',
    level: 'All Levels',
    price: 15000,
    rating: 4.7,
    reviews: 289,
    category: 'Marketing',
    skillLevel: 'All Levels',
    image: '📱',
    isBestSeller: true,
    duration: '5 months',
    syllabus: ['Basic Computer Course', 'SEO', 'Social Media Advertising', 'Online Advertising', 'Facebook Boost', 'Instagram Boost', 'Email Marketing / Content Design', 'Adobe Photoshop / Adobe Illustrator']
  },
  {
    id: 9,
    title: 'Meta Ads Training',
    description: 'Professional Meta (Facebook & Instagram) advertising with advanced audience targeting and budget scheduling',
    instructor: 'Meta Certified Trainer',
    level: 'Beginner',
    price: 3000,
    rating: 4.6,
    reviews: 156,
    category: 'Marketing',
    skillLevel: 'Beginner',
    image: '�',
    isBestSeller: false,
    duration: '1 month',
    syllabus: ['Create Professional Business Page', 'Facebook Ads / Instagram Ads', 'Ads Scheduling / Budget Scheduling', 'Meta Business Portfolio & Ad Account', 'Advance Audience Targeting']
  },
  {
    id: 10,
    title: 'Social Media Handler Course',
    description: 'Complete social media management with design skills, content creation and video editing',
    instructor: 'Social Media Expert',
    level: 'Beginner',
    price: 6000,
    rating: 4.5,
    reviews: 123,
    category: 'Marketing',
    skillLevel: 'Beginner',
    image: '📸',
    isBestSeller: false,
    duration: '3 months',
    syllabus: ['Adobe Photoshop', 'Adobe Illustrator', 'Facebook Boost', 'Instagram Boost', 'Marketing Advertisement', 'Post Design', 'Video Editing']
  },
  {
    id: 11,
    title: 'Computer Hardware & Networking Course',
    description: 'Complete hardware and networking with maintenance, assembling and 15 days offsite training',
    instructor: 'Hardware Specialist',
    level: 'Intermediate',
    price: 8000,
    rating: 4.7,
    reviews: 134,
    category: 'Computer Courses',
    skillLevel: 'Intermediate',
    image: '🔧',
    isBestSeller: false,
    duration: '3 months',
    syllabus: ['Basic Computer Course', 'Explain Hardware', 'Explain Networking', 'Maintenance and Assembling Computer System', '15 Days Offsite Training for Hardware and Networking']
  },

  // Government Job Preparation
  {
    id: 12,
    title: 'लोक सेवा आयोग तयारी कक्षा',
    description: 'तह-४ खरिदार, तह-५ नायब सुब्बा, तह-६ शाखा अधिकृत / लेखा अधिकृत की तैयारी',
    instructor: 'लोक सेवा विशेषज्ञ',
    level: 'All Levels',
    price: 12000,
    rating: 4.8,
    reviews: 198,
    category: 'Government Exam',
    skillLevel: 'All Levels',
    image: '🏛️',
    isBestSeller: true,
    duration: '6 months',
    syllabus: ['तह-४ खरिदार (संघीय र प्रदेश)', 'तह-५ नायब सुब्बा (संघीय र प्रदेश)', 'तह-६ शाखा अधिकृत / लेखा अधिकृत']
  },
  {
    id: 13,
    title: 'बैंकिंग तयारी कक्षा',
    description: 'Nepal Rastra Bank, Nepal Bank Limited, Rastriya Banijya Bank, Agriculture Development Bank preparation',
    instructor: 'बैंकिंग एक्सपर्ट',
    level: 'All Levels',
    price: 12000,
    rating: 4.7,
    reviews: 167,
    category: 'Government Exam',
    skillLevel: 'All Levels',
    image: '🏦',
    isBestSeller: false,
    duration: '6 months',
    syllabus: ['नेपाल राष्ट्र बैंक', 'नेपाल बैंक लिमिटेड', 'राष्ट्रिय वाणिज्य बैंक', 'कृषि विकास बैंक']
  },

  // Tuition Classes
  {
    id: 14,
    title: 'Tuition Classes - School Level',
    description: 'Complete school level coaching from class 1 to 10 with experienced teachers',
    instructor: 'Experienced Teachers',
    level: 'Beginner',
    price: 3000,
    rating: 4.6,
    reviews: 234,
    category: 'Tuition',
    skillLevel: 'Beginner',
    image: '📚',
    isBestSeller: false,
    duration: 'Monthly',
    syllabus: ['All Subjects', 'Regular Tests', 'Homework Support', 'Doubt Clearing Sessions']
  },
  {
    id: 15,
    title: 'Tuition Classes - Class 12 / +2 Level',
    description: 'Specialized coaching for Class 12 / +2 students with NEB board preparation',
    instructor: 'Subject Experts',
    level: 'Intermediate',
    price: 4000,
    rating: 4.8,
    reviews: 198,
    category: 'Tuition',
    skillLevel: 'Intermediate',
    image: '�',
    isBestSeller: true,
    duration: 'Monthly',
    syllabus: ['Science / Management / Humanities', 'Board Exam Preparation', 'Mock Tests', 'Previous Year Papers']
  },
  {
    id: 16,
    title: 'Tuition Classes - Bachelor Level',
    description: 'Bachelor level coaching for BBS, BCA, BA and other programs',
    instructor: 'University Professors',
    level: 'Advanced',
    price: 5000,
    rating: 4.7,
    reviews: 156,
    category: 'Tuition',
    skillLevel: 'Advanced',
    image: '🎓',
    isBestSeller: false,
    duration: 'Monthly',
    syllabus: ['Subject-wise Coaching', 'Semester Preparation', 'Assignment Help', 'Exam Strategy']
  },
  {
    id: 17,
    title: 'Tuition Classes - Master Level',
    description: 'Advanced master level coaching with research guidance and thesis support',
    instructor: 'PhD Scholars',
    level: 'Advanced',
    price: 6000,
    rating: 4.8,
    reviews: 89,
    category: 'Tuition',
    skillLevel: 'Advanced',
    image: '🎯',
    isBestSeller: false,
    duration: 'Monthly',
    syllabus: ['Advanced Topics', 'Research Methodology', 'Thesis Guidance', 'Publication Support']
  },

  // Language Classes
  {
    id: 18,
    title: 'Korean Language Classes',
    description: 'Learn Korean language with speaking, reading and writing skills for EPS-TOPIK exam',
    instructor: 'Native Korean Teacher',
    level: 'Beginner',
    price: 8000,
    rating: 4.7,
    reviews: 145,
    category: 'Language',
    skillLevel: 'Beginner',
    image: '🇰🇷',
    isBestSeller: true,
    duration: '6 months',
    syllabus: ['Basic to Advanced Korean', 'EPS-TOPIK Preparation', 'Speaking Practice', 'Reading & Writing']
  },
  {
    id: 19,
    title: 'Japanese Language Classes',
    description: 'Comprehensive Japanese language course with JLPT exam preparation',
    instructor: 'JLPT Certified Teacher',
    level: 'Beginner',
    price: 8000,
    rating: 4.6,
    reviews: 123,
    category: 'Language',
    skillLevel: 'Beginner',
    image: '🇯🇵',
    isBestSeller: false,
    duration: '6 months',
    syllabus: ['Hiragana, Katakana, Kanji', 'JLPT Preparation', 'Japanese Culture', 'Conversation Practice']
  },
  {
    id: 20,
    title: 'English Language Classes',
    description: 'Improve your English speaking, writing and grammar skills for professional communication',
    instructor: 'English Expert',
    level: 'All Levels',
    price: 5000,
    rating: 4.8,
    reviews: 267,
    category: 'Language',
    skillLevel: 'All Levels',
    image: '🇬🇧',
    isBestSeller: true,
    duration: '4 months',
    syllabus: ['Grammar', 'Speaking', 'Writing', 'Vocabulary Building', 'Business English']
  },
  {
    id: 21,
    title: 'IELTS / PTE Preparation',
    description: 'Complete IELTS and PTE exam preparation with mock tests and expert guidance',
    instructor: 'IELTS Trainer',
    level: 'Intermediate',
    price: 12000,
    rating: 4.9,
    reviews: 234,
    category: 'Language',
    skillLevel: 'Intermediate',
    image: '📝',
    isBestSeller: true,
    duration: '3 months',
    syllabus: ['Reading', 'Writing', 'Listening', 'Speaking', 'Mock Tests', 'Score Improvement Tips']
  },
  {
    id: 22,
    title: 'Germany Language Classes',
    description: 'Learn German language for study and work opportunities in Germany',
    instructor: 'German Language Expert',
    level: 'Beginner',
    price: 8000,
    rating: 4.5,
    reviews: 98,
    category: 'Language',
    skillLevel: 'Beginner',
    image: '🇩🇪',
    isBestSeller: false,
    duration: '6 months',
    syllabus: ['A1, A2, B1 Levels', 'Grammar', 'Conversation', 'TestDaF Preparation']
  },

  // Entrance Preparation
  {
    id: 23,
    title: 'Bridge Course Preparation',
    description: 'Complete bridge course preparation for higher education entrance',
    instructor: 'Entrance Expert',
    level: 'Intermediate',
    price: 10000,
    rating: 4.7,
    reviews: 156,
    category: 'Entrance',
    skillLevel: 'Intermediate',
    image: '🎯',
    isBestSeller: false,
    duration: '4 months',
    syllabus: ['All Subjects', 'Mock Tests', 'Previous Papers', 'Time Management']
  },
  {
    id: 24,
    title: 'CTEVT Course Preparation',
    description: 'CTEVT entrance exam preparation with practical training',
    instructor: 'CTEVT Specialist',
    level: 'Intermediate',
    price: 8000,
    rating: 4.6,
    reviews: 134,
    category: 'Entrance',
    skillLevel: 'Intermediate',
    image: '�',
    isBestSeller: false,
    duration: '3 months',
    syllabus: ['Technical Subjects', 'Practical Training', 'Mock Exams', 'Career Guidance']
  },
  {
    id: 25,
    title: 'CEE / CMAT / Engineering Entrance',
    description: 'Complete preparation for engineering entrance exams CEE, CMAT with expert faculty',
    instructor: 'Engineering Faculty',
    level: 'Advanced',
    price: 15000,
    rating: 4.9,
    reviews: 289,
    category: 'Entrance',
    skillLevel: 'Advanced',
    image: '⚙️',
    isBestSeller: true,
    duration: '6 months',
    syllabus: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Mock Tests', 'Problem Solving']
  },

  // Study Abroad
  {
    id: 26,
    title: 'Study in India - Top Universities',
    description: 'Study in top Indian universities: Poornima, Noida, CMRIT, Maharshi, RK, Guru Kashi, JAIN, Cambridge, Galgotia',
    instructor: 'Education Consultant',
    level: 'All Levels',
    price: 0,
    rating: 4.8,
    reviews: 234,
    category: 'Study Abroad',
    skillLevel: 'All Levels',
    image: '🇮🇳',
    isBestSeller: true,
    isFree: true,
    duration: 'Consultancy',
    syllabus: ['University Selection', 'Admission Process', 'Visa Guidance', 'Scholarship Information', 'Accommodation Support']
  },
  {
    id: 27,
    title: 'Study Abroad - Australia',
    description: 'Complete guidance for studying in Australia with top universities and visa support',
    instructor: 'Study Abroad Consultant',
    level: 'All Levels',
    price: 0,
    rating: 4.9,
    reviews: 198,
    category: 'Study Abroad',
    skillLevel: 'All Levels',
    image: '🇦🇺',
    isBestSeller: true,
    isFree: true,
    duration: 'Consultancy',
    syllabus: ['University Applications', 'Visa Process', 'IELTS/PTE Guidance', 'Financial Planning', 'Pre-departure Orientation']
  },
  {
    id: 28,
    title: 'Study Abroad - UK',
    description: 'Study in UK with complete admission and visa guidance for top universities',
    instructor: 'UK Education Expert',
    level: 'All Levels',
    price: 0,
    rating: 4.8,
    reviews: 167,
    category: 'Study Abroad',
    skillLevel: 'All Levels',
    image: '🇬🇧',
    isBestSeller: false,
    isFree: true,
    duration: 'Consultancy',
    syllabus: ['Course Selection', 'UCAS Application', 'Visa Documentation', 'Scholarship Guidance', 'Accommodation']
  },
  {
    id: 29,
    title: 'Study Abroad - Canada',
    description: 'Complete Canadian study visa and admission process with expert counseling',
    instructor: 'Canada Immigration Expert',
    level: 'All Levels',
    price: 0,
    rating: 4.9,
    reviews: 223,
    category: 'Study Abroad',
    skillLevel: 'All Levels',
    image: '🇨🇦',
    isBestSeller: true,
    isFree: true,
    duration: 'Consultancy',
    syllabus: ['University Selection', 'SOP Writing', 'Study Permit', 'Post-study Work Permit', 'Settlement Support']
  },
  {
    id: 30,
    title: 'Study Abroad - New Zealand',
    description: 'Study in New Zealand with admission guidance and visa processing support',
    instructor: 'NZ Education Consultant',
    level: 'All Levels',
    price: 0,
    rating: 4.7,
    reviews: 145,
    category: 'Study Abroad',
    skillLevel: 'All Levels',
    image: '🇳🇿',
    isBestSeller: false,
    isFree: true,
    duration: 'Consultancy',
    syllabus: ['Course Counseling', 'Application Process', 'Student Visa', 'Work Rights', 'Pathway Programs']
  },
  {
    id: 31,
    title: 'Study Abroad - France',
    description: 'Study in France with comprehensive guidance for French universities and visa',
    instructor: 'France Study Expert',
    level: 'All Levels',
    price: 0,
    rating: 4.6,
    reviews: 112,
    category: 'Study Abroad',
    skillLevel: 'All Levels',
    image: '🇫�',
    isBestSeller: false,
    isFree: true,
    duration: 'Consultancy',
    syllabus: ['Campus France Process', 'French Language Requirements', 'Visa Interview Prep', 'Tuition Free Universities', 'Living in France']
  }
];

const Courses = () => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState(staticCourses);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All Levels');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Master filter dropdown state
  const [showFilters, setShowFilters] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024);

  // Collapsible sections state - expanded on desktop, collapsed on mobile
  const [expandedSections, setExpandedSections] = useState({
    categories: typeof window !== 'undefined' && window.innerWidth >= 1024,
    skillLevel: typeof window !== 'undefined' && window.innerWidth >= 1024,
    price: typeof window !== 'undefined' && window.innerWidth >= 1024,
    rating: typeof window !== 'undefined' && window.innerWidth >= 1024
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Enrollment modal state
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Load courses from Firebase on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const firebaseCourses = await getAllCourses();
        // If Firebase has courses, use them; otherwise use static courses
        if (firebaseCourses && firebaseCourses.length > 0) {
          setAllCourses(firebaseCourses);
        }
      } catch (error) {
        console.error('Error loading courses from Firebase:', error);
        // Keep using static courses as fallback
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const categories = [
    { name: 'Computer Courses', count: 5 },
    { name: 'Accounting', count: 2 },
    { name: 'Design', count: 1 },
    { name: 'Web Development', count: 1 },
    { name: 'Marketing', count: 3 },
    { name: 'Government Exam', count: 2 },
    { name: 'CTEVT Preparation', count: 1 },
    { name: 'Tuition', count: 4 },
    { name: 'Language', count: 5 },
    { name: 'Entrance', count: 3 },
    { name: 'Study Abroad', count: 6 }
  ];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesSkillLevel = selectedSkillLevel === 'All Levels' || course.skillLevel === selectedSkillLevel;
    const matchesPrice = selectedPrice === 'All' ||
      (selectedPrice === 'Free' && course.isFree) ||
      (selectedPrice === 'Paid' && !course.isFree);
    const matchesRating = selectedRating === 'All' ||
      (selectedRating === '5' && course.rating >= 5) ||
      (selectedRating === '4' && course.rating >= 4) ||
      (selectedRating === '3' && course.rating >= 3);

    return matchesSearch && matchesCategory && matchesSkillLevel && matchesPrice && matchesRating;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSkillLevel('All Levels');
    setSelectedPrice('All');
    setSelectedRating('All');
    setSearchQuery('');
  };

  // Handle enrollment
  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setIsEnrollModalOpen(true);
  };

  const handleEnrollSubmit = async (enrollmentData) => {
    try {
      await addEnrollment(enrollmentData);
      setNotification({
        show: true,
        message: 'Enrollment submitted successfully! We will contact you soon.',
        type: 'success'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to submit enrollment. Please try again.',
        type: 'error'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 5000);
    }
  };

  // Handle learn more
  const handleLearnMore = (course) => {
    navigate(`/course/${course.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 lg:pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-28 pb-16">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">Explore Our Courses</h1>
          <p className="text-gray-600 mb-6">From beginner to expert, find the right course to achieve id goals.</p>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search for any topic (e.g. Python, UI/UX, Marketing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Sidebar - Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:sticky lg:top-24 border border-gray-200">

              {/* Master Filter Header */}
              <div className="mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-between text-left hover:bg-orange-50 p-2 rounded-lg transition-colors group"
                >
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-600">Filter Course</h2>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-orange-600 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {/* All Filters Container */}
              <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>

                {/* Categories Filter */}
                <div className="mb-4 pb-3 border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('categories')}
                    className="w-full flex items-center justify-between text-left mb-2 hover:text-orange-600 transition-colors group"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600">Categories</h3>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-orange-500 transition-transform duration-300 ${expandedSections.categories ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${expandedSections.categories ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-2">
                      {categories.slice(0, showMoreCategories ? categories.length : 6).map(cat => (
                        <label key={cat.name} className="flex items-center cursor-pointer group hover:bg-gray-50 p-1.5 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat.name)}
                            onChange={() => toggleCategory(cat.name)}
                            className="w-3.5 h-3.5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer"
                          />
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-orange-600 flex-1">
                            {cat.name}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                            {cat.count}
                          </span>
                        </label>
                      ))}
                    </div>
                    {categories.length > 6 && (
                      <button
                        onClick={() => setShowMoreCategories(!showMoreCategories)}
                        className="w-full text-orange-600 text-xs font-semibold mt-2 py-1.5 hover:text-orange-700 hover:bg-orange-50 rounded transition-colors"
                      >
                        {showMoreCategories ? '- Show Less' : '+ Show More'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="mb-4 pb-3 border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('skillLevel')}
                    className="w-full flex items-center justify-between text-left mb-2 hover:text-orange-600 transition-colors group"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600">Skill Level</h3>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-orange-500 transition-transform duration-300 ${expandedSections.skillLevel ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${expandedSections.skillLevel ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-1.5">
                      {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(level => (
                        <label key={level} className="flex items-center cursor-pointer group hover:bg-gray-50 p-1.5 rounded transition-colors">
                          <input
                            type="radio"
                            name="skillLevel"
                            checked={selectedSkillLevel === level}
                            onChange={() => setSelectedSkillLevel(level)}
                            className="w-3.5 h-3.5 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-orange-600">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4 pb-3 border-b border-gray-200">
                  <button
                    onClick={() => toggleSection('price')}
                    className="w-full flex items-center justify-between text-left mb-2 hover:text-orange-600 transition-colors group"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600">Price</h3>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-orange-500 transition-transform duration-300 ${expandedSections.price ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${expandedSections.price ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-1.5">
                      {['All', 'Free', 'Paid'].map(price => (
                        <label key={price} className="flex items-center cursor-pointer group hover:bg-gray-50 p-1.5 rounded transition-colors">
                          <input
                            type="radio"
                            name="price"
                            checked={selectedPrice === price}
                            onChange={() => setSelectedPrice(price)}
                            className="w-3.5 h-3.5 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 group-hover:text-orange-600">{price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    onClick={() => toggleSection('rating')}
                    className="w-full flex items-center justify-between text-left mb-2 hover:text-orange-600 transition-colors group"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600">Rating</h3>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-orange-500 transition-transform duration-300 ${expandedSections.rating ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${expandedSections.rating ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-1.5">
                      {[
                        { value: 'All', label: 'All Rating' },
                        { value: '5', label: '★★★★★ 5+' },
                        { value: '4', label: '★★★★☆ 4+' },
                        { value: '3', label: '★★★☆☆ 3+' }
                      ].map(rating => (
                        <label key={rating.value} className="flex items-center cursor-pointer group hover:bg-gray-50 p-1.5 rounded transition-colors">
                          <input
                            type="radio"
                            name="rating"
                            checked={selectedRating === rating.value}
                            onChange={() => setSelectedRating(rating.value)}
                            className="w-3.5 h-3.5 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="ml-2 text-xs text-gray-700 group-hover:text-orange-600">{rating.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm text-orange-600 border border-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors mt-4"
                >
                  Clear Filters
                </button>
              </div>
              {/* End of All Filters Container */}

            </div>
          </aside>

          {/* Main Content - Right Side */}
          <main className="flex-1 min-w-0">

            {/* Courses Header with Count and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div>
                <p className="text-base font-bold text-gray-900">
                  Showing {filteredCourses.length} courses
                </p>
                <p className="text-xs text-gray-600">Find the perfect course for your goals</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                >
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              {currentCourses.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group border-2 border-gray-800 hover:border-orange-600 flex flex-col h-full">
                  {/* Course Image */}
                  <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 h-36 flex items-center justify-center">
                    <span className="text-5xl transform group-hover:scale-105 transition-transform duration-200">{course.image}</span>
                    {course.isBestSeller && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
                        BESTSELLER
                      </span>
                    )}
                    {course.isFree && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
                        FREE
                      </span>
                    )}
                  </div>

                  {/* Course Details */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem]">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{course.description}</p>

                    {/* Instructor and Level */}
                    <div className="flex items-center gap-1.5 mb-2 text-[11px] text-gray-600">
                      <span className="font-medium truncate">{course.instructor}</span>
                      <span>•</span>
                      <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-medium">{course.level}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3 pb-2.5 border-b border-gray-100">
                      <span className="text-yellow-500 font-bold text-xs">{course.rating}</span>
                      <div className="flex text-yellow-500 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < Math.floor(course.rating) ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-500">({course.reviews})</span>
                    </div>

                    {/* Price and Duration */}
                    <div className="flex items-center justify-between mb-3 mt-auto">
                      <span className="text-xl font-bold text-blue-600">
                        {course.isFree ? 'FREE' : `₹${course.price.toLocaleString()}`}
                      </span>
                      {course.duration && (
                        <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded">
                          {course.duration}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEnrollClick(course)}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-xs"
                      >
                        Enroll Now
                      </button>
                      <button
                        onClick={() => handleLearnMore(course)}
                        className="flex-1 bg-white hover:bg-orange-50 text-orange-600 font-semibold py-2 px-3 rounded-lg border border-orange-600 transition-colors text-xs"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 flex-wrap bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm sm:text-base font-medium transition-colors"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all ${currentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={pageNum} className="text-gray-500 px-2">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm sm:text-base font-medium transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Become an Instructor</h2>
          <p className="text-blue-100 mb-6 text-sm sm:text-base">Share your knowledge with students around world and earn an income.</p>
          <button className="px-6 sm:px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg">
            Start Teaching Today
          </button>
        </div>
      </div>

      {/* Enrollment Modal */}
      {selectedCourse && (
        <EnrollmentForm
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          course={selectedCourse}
          onSubmit={handleEnrollSubmit}
        />
      )}

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default Courses;
