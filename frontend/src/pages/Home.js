import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  ComputerDesktopIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  ChevronLeftIcon as ChevronLeft,
  ChevronRightIcon as ChevronRight,
  PlayIcon as Play,
  PauseIcon as Pause
} from '@heroicons/react/24/outline';
import { StarIcon as Star } from '@heroicons/react/24/solid';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="section-"]');
    elements.forEach((el) => observer.observe(el));

    // Add parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const stats = [
    { number: '5000+', label: 'Students Enrolled', icon: UserGroupIcon },
    { number: '20+', label: 'Expert Instructors', icon: AcademicCapIcon },
    { number: '25+', label: 'Course Programs', icon: ComputerDesktopIcon },
  ];

  const features = [
    {
      title: 'Expert Faculty',
      description: 'Learn from experienced and qualified instructors dedicated to your success.',
      icon: AcademicCapIcon,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Modern Facilities',
      description: 'State-of-the-art computer labs and learning resources for optimal education.',
      icon: ComputerDesktopIcon,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Career Support',
      description: 'Comprehensive guidance and support for your academic and professional journey.',
      icon: UserGroupIcon,
      gradient: 'from-pink-500 to-red-600'
    }
  ];

  const testimonials = [
    {
      name: 'Raj Kumar Sharma',
      course: 'Computer Science',
      rating: 5,
      comment: 'Excellent teaching quality and modern facilities. The instructors are very supportive and knowledgeable.'
    },
    {
      name: 'Sita Paudel',
      course: 'Office Management',
      rating: 5,
      comment: 'Great learning environment with practical approach. I got my job right after completing the course.'
    },
    {
      name: 'Mohan Thapa',
      course: 'Web Development',
      rating: 5,
      comment: 'Best computer institute in the area. The curriculum is up-to-date and very practical.'
    }
  ];

  const [currentStaffIndex, setCurrentStaffIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Import staff images
  const staffImages = {
    'kk_sir': require('../assets/kk sir.jpg'),
    'amit_parjapati': require('../assets/Amit_parjapati.jpg'),
    'ashfaq_hussein': require('../assets/Ashfaq_hussein.jpg'),
    'bharat_giri': require('../assets/Bharat_Giri.jpg'),
    'jatish_chaudahry': require('../assets/Jatish chaudahry.jpg'),
    'kushal_gautam': require('../assets/Kushal_gautam.jpg'),
    'muarli': require('../assets/Muarli.jpg'),
    'rohit_yadav': require('../assets/Rohit_yadav.jpg'),
    'sailendra_yadav': require('../assets/Sailendra_yadav.jpg'),
    'sakcham_tripathi': require('../assets/Sakcham_tripathi.jpg')
  };


  const staffMembers = [
    {
      id: 'kk_sir',
      name: 'K.K. Sir',
      position: 'Principal & Senior Faculty',
      department: 'Administration',
      experience: 20,
      rating: 5,
      quote: 'Education is the foundation of progress',
      image: staffImages.kk_sir,
      specialties: ['Leadership', 'Educational Management', 'Strategic Planning']
    },
    {
      id: 'amit_parjapati',
      name: 'Amit Prajapati',
      position: 'Senior Developer & Instructor',
      department: 'Web Development',
      experience: 12,
      rating: 5,
      quote: 'Code is poetry written in logic',
      image: staffImages.amit_parjapati,
      specialties: ['React.js', 'Node.js', 'Full Stack Development']
    },
    {
      id: 'ashfaq_hussein',
      name: 'Ashfaq Hussein',
      position: 'Graphics Design Expert',
      department: 'Creative Arts',
      experience: 10,
      rating: 5,
      quote: 'Design is intelligence made visible',
      image: staffImages.ashfaq_hussein,
      specialties: ['Adobe Creative Suite', 'UI/UX Design', 'Brand Identity']
    },
    {
      id: 'bharat_giri',
      name: 'Bharat Giri',
      position: 'Network Administrator',
      department: 'IT Infrastructure',
      experience: 8,
      rating: 4,
      quote: 'Networks connect minds and possibilities',
      image: staffImages.bharat_giri,
      specialties: ['Network Security', 'System Administration', 'Cloud Computing']
    },
    {
      id: 'jatish_chaudahry',
      name: 'Jatish Chaudhary',
      position: 'Digital Marketing Strategist',
      department: 'Marketing',
      experience: 7,
      rating: 5,
      quote: 'Digital marketing bridges brands and hearts',
      image: staffImages.jatish_chaudahry,
      specialties: ['SEO', 'Social Media', 'Content Marketing']
    },
    {
      id: 'kushal_gautam',
      name: 'Kushal Gautam',
      position: 'Software Engineer',
      department: 'Programming',
      experience: 6,
      rating: 4,
      quote: 'Innovation distinguishes leaders from followers',
      image: staffImages.kushal_gautam,
      specialties: ['Python', 'Machine Learning', 'Data Analysis']
    },
    {
      id: 'muarli',
      name: 'Murali',
      position: 'Hardware Specialist',
      department: 'Technical Support',
      experience: 9,
      rating: 4,
      quote: 'Hardware is the foundation, software is the soul',
      image: staffImages.muarli,
      specialties: ['Hardware Repair', 'System Building', 'Technical Support']
    },
    {
      id: 'rohit_yadav',
      name: 'Rohit Yadav',
      position: 'Mobile App Developer',
      department: 'Mobile Development',
      experience: 5,
      rating: 4,
      quote: 'Mobile apps are the future of digital interaction',
      image: staffImages.rohit_yadav,
      specialties: ['React Native', 'Flutter', 'Mobile UI/UX']
    },
    {
      id: 'sailendra_yadav',
      name: 'Sailendra Yadav',
      position: 'Database Administrator',
      department: 'Data Management',
      experience: 11,
      rating: 5,
      quote: 'Data is the new oil, databases are the refineries',
      image: staffImages.sailendra_yadav,
      specialties: ['MySQL', 'MongoDB', 'Database Optimization']
    },
    {
      id: 'sakcham_tripathi',
      name: 'Sakcham Tripathi',
      position: 'Academic Coordinator',
      department: 'Curriculum Development',
      experience: 8,
      rating: 5,
      quote: 'Quality education shapes tomorrow\'s leaders',
      image: staffImages.sakcham_tripathi,
      specialties: ['Curriculum Design', 'Educational Technology', 'Student Assessment']
    }
  ];

  // Auto-play functionality for staff carousel
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentStaffIndex((prevIndex) => 
          prevIndex === staffMembers.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, staffMembers.length]);

  // Navigation functions
  const goToPreviousStaff = () => {
    setIsAutoPlaying(false);
    setCurrentStaffIndex((prevIndex) => 
      prevIndex === 0 ? staffMembers.length - 1 : prevIndex - 1
    );
  };

  const goToNextStaff = () => {
    setIsAutoPlaying(false);
    setCurrentStaffIndex((prevIndex) => 
      prevIndex === staffMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToStaff = (index) => {
    setIsAutoPlaying(false);
    setCurrentStaffIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
  <div className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Announcement Bar */}
      <div className="w-full bg-yellow-400 text-gray-900 py-2 px-4 flex justify-center items-center text-sm font-semibold">
        <span>New batches for Full Stack Development start October 25th! &nbsp;</span>
        <Link to="/courses" className="bg-white text-yellow-700 font-bold px-4 py-1 rounded shadow hover:bg-yellow-100 ml-2">Enroll Now</Link>
      </div>

      {/* Header removed: navigation is handled by global Navbar */}

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-2 sm:px-8 md:px-16 lg:px-32 xl:px-40 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:bg-gray-900">
        <div className="max-w-screen-xl w-full flex flex-col md:flex-row items-center gap-2 space-x-5 md:gap-6 xl:gap-10 py-6 md:py-12 xl:py-16">
       { /* Left: Text */}
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 xl:mb-8 leading-tight text-blue-900 dark:text-yellow-300">
            <span className="block mb-2 font-bold text-4xl sm:text-2xl md:text-3xl lg:text-4xl">
              Empowering Your Academic & Career Success
            </span>
            <span className="text-blue-600 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Comprehensive Coaching & Professional Courses
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <Link to="/courses">
              <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
                Explore Our Courses
              </button>
            </Link>
            <Link to="/contact">
              <button className="bg-gradient-to-r from-gray-300 to-gray-100 text-gray-800 font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
        {/* Right: Image Card with Play Button */}
          <div className="flex-1 flex justify-center items-center animate-fade-in-up">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-video group border-4 border-blue-200 dark:border-white-800 mx-auto">
              <img src={require('../assets/bridge-course-team.jpg')} alt="Students" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <button className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 rounded-full p-5 shadow-xl hover:scale-110 transition-transform duration-300 border-2 border-blue-300 dark:border-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-blue-700 dark:text-yellow-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.518-3.651A1 1 0 007 8.618v6.764a1 1 0 001.234.97l6.518-1.513a1 1 0 00.748-.97v-2.764a1 1 0 00-.748-.97z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

  
  <section className="bg-blue-100 dark:bg-gray-00 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-3xl font-bold text-blue-900 dark:text-yellow-300 mb-2">12,500+</span>
            <span className="text-sm text-gray-600 dark:text-gray-300 mb-2">Successful Graduates</span>
            <svg className="h-8 w-8 text-yellow-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-3xl font-bold text-blue-900 dark:text-yellow-300 mb-2">93%</span>
            <span className="text-sm text-gray-600 dark:text-gray-300 mb-2">Placement Rate</span>
            <svg className="h-8 w-8 text-green-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17v-6a4 4 0 014-4h10a4 4 0 014 4v6" /></svg>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-3xl font-bold text-blue-900 dark:text-yellow-300 mb-2">4.8/5.0</span>
            <span className="text-sm text-gray-600 dark:text-gray-300 mb-2">Student Rating</span>
            <svg className="h-8 w-8 text-yellow-400 mb-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-3xl font-bold text-blue-900 dark:text-yellow-300 mb-2">20+</span>
            <span className="text-sm text-gray-600 dark:text-gray-300 mb-2">Years & Excellence</span>
            <svg className="h-8 w-8 text-blue-500 dark:text-blue-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
          </div>
        </div>
      </section>


      <section id="section-about" className={`section-padding bg-white dark:bg-gray-800 ${isVisible['section-about'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* <div className="w-full md:w-1/2 relative"> */}
              <div className="w-full md:w-1/2 md:h-1/2 relative flex justify-center items-center">
                <img
                  src={require('../assets/exclence.jpg')}
                  alt="Institute Excellence"
                  className="rounded-3xl shadow-2xl w-full max-w-md h-[300px] object-cover border-4 border-blue-200 dark:border-yellow-400 transition-transform duration-500 ease-in-out hover:scale-105 hover:rotate-1"
                />
              </div>

            <div className="w-full md:w-1/2">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-blue-100 dark:bg-dark-light px-4 py-2 font-medium text-primary dark:text-primary-dark">
                  About Us
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="gradient-text">Excellence</span> in Education Since 2015
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Spangle Education and Computer Institute Pvt. Ltd. is a premier educational institution located in Siddharthanagar-13, Devkota Chowk, Rupandehi. We are committed to providing quality education and computer training to help students achieve their academic and professional goals.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary dark:text-primary-dark mt-0.5 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Experienced faculty with industry expertise</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary dark:text-primary-dark mt-0.5 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Modern computer labs with latest software</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary dark:text-primary-dark mt-0.5 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Job placement assistance for qualified students</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link to="/about" className="btn btn-primary inline-flex items-center group">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="section-features" className={`section-padding bg-gray-50 dark:bg-gray-900 ${isVisible['section-features'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-lg bg-primary/10 dark:bg-primary/20 px-4 py-2 font-medium text-primary dark:text-primary-dark mb-4">
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Reasons to Choose Spangle
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We pride ourselves on providing quality education that prepares students for real-world success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card group stagger-animation card-hover-lift"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`p-4 rounded-full bg-gradient-to-br ${feature.gradient} inline-block mb-6 text-white group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="section-testimonials" className={`section-padding bg-white dark:bg-gray-800 ${isVisible['section-testimonials'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-lg bg-primary/10 dark:bg-primary/20 px-4 py-2 font-medium text-primary dark:text-primary-dark mb-4">
              Testimonials
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Don't just take our word for it - hear from our successful alumni
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card group">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="mt-auto">
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-primary dark:text-primary-dark">{testimonial.course}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated staff members bring years of experience and passion for education
              to help you achieve your academic goals.
            </p>
          </div>
          
          <div className="relative">
            {/* Staff Card */}
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={staffMembers[currentStaffIndex].image}
                  alt={staffMembers[currentStaffIndex].name}
                  className="card-image transition-transform duration-500 group-hover:scale-110 w-full object-cover"
                  style={{ height: '600px', minHeight: '450px', maxHeight: '450px' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x256/6366f1/white?text=Staff+Photo';
                  }}
                />
                <div className="image-overlay"></div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 z-10">
                  <span className="text-sm font-semibold text-gray-700">
                    {currentStaffIndex + 1} / {staffMembers.length}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {staffMembers[currentStaffIndex].name}
                </h3>
                <p className="text-blue-600 font-semibold mb-1">
                  {staffMembers[currentStaffIndex].position}
                </p>
                <p className="text-gray-600 mb-3">
                  {staffMembers[currentStaffIndex].department}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {staffMembers[currentStaffIndex].experience} years of experience
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < staffMembers[currentStaffIndex].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {staffMembers[currentStaffIndex].rating}/5
                  </span>
                </div>
                
                <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4">
                  "{staffMembers[currentStaffIndex].quote}"
                </blockquote>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={goToPreviousStaff}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous staff member"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            
            <button
              onClick={goToNextStaff}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next staff member"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col items-center space-y-4 mt-8">
            {/* Dots Navigation */}
            <div className="flex justify-center space-x-2">
              {staffMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStaff(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentStaffIndex
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to staff member ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Auto-play toggle */}
            <button
              onClick={toggleAutoPlay}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isAutoPlaying
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Auto-play</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>


      

      {/* Call to Action */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 float-animation"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 float-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full float-animation" style={{ animationDelay: '4s' }}></div>
        </div>
        <div className="relative container mx-auto px-4 section-padding text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Start Your Educational Journey
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Join our community of successful students and take the first step towards your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="btn btn-secondary text-lg px-8 py-4 glow">
              Explore Courses
            </Link>
            <Link to="/contact" className="btn glass-effect text-white hover:bg-white/20 text-lg px-8 py-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;