import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  ComputerDesktopIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 parallax">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse float-animation"></div>
          <div className="absolute top-1/3 right-20 w-32 h-32 bg-white/5 rounded-full float-animation" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full float-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white/5 rounded-full float-animation" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white/5 rounded-full float-animation" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                Welcome to{' '}
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Spangle Education
                </span>
              </h1>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-100 font-light leading-relaxed max-w-4xl mx-auto">
                Empowering students with quality education and cutting-edge computer training in Siddharthanagar
              </p>
            </div>
            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center mb-16" style={{ animationDelay: '0.6s' }}>
              <Link
                to="/courses"
                className="btn btn-secondary text-lg px-8 py-4 glow"
                aria-label="Explore our courses"
              >
                Explore Courses
              </Link>
              <Link
                to="/contact"
                className="btn glass-effect text-white hover:bg-white/20 text-lg px-8 py-4"
                aria-label="Contact us for more information"
              >
                Contact Us
              </Link>
            </div>

            {/* Stats Section */}
            <div className="animate-fade-in-up grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" style={{ animationDelay: '0.9s' }}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="glass-effect p-6 rounded-xl transform hover:scale-105 transition-all duration-500 stagger-animation card-hover-lift"
                    style={{ animationDelay: `${1.2 + index * 0.2}s` }}
                  >
                    <IconComponent className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-gray-200 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="section-about" className={`section-padding bg-white dark:bg-gray-800 ${isVisible['section-about'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-1 hover:scale-105 transition-all duration-500">
                <div className="relative bg-gradient-to-br from-primary to-secondary aspect-video rounded-3xl overflow-hidden flex items-center justify-center">
                  <div className="text-white text-7xl font-bold">S</div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              </div>
              
              {/* Decoration elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300/20 dark:bg-yellow-500/10 rounded-full z-0 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-full z-0"></div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-gray-100 dark:bg-dark-light px-4 py-2 font-medium text-primary dark:text-primary-dark">
                  About Us
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  <span className="gradient-text">Excellence</span> in Education Since 2010
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

      {/* Location Section */}
      <section id="section-location" className={`section-padding bg-gray-50 dark:bg-gray-900 ${isVisible['section-location'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block rounded-lg bg-primary/10 dark:bg-primary/20 px-4 py-2 font-medium text-primary dark:text-primary-dark mb-4">
                Location
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Visit Our Campus
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="h-6 w-6 text-primary dark:text-primary-dark mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Siddharthanagar-13, Devkota Chowk<br />
                      Rupandehi, Nepal
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <PhoneIcon className="h-6 w-6 text-primary dark:text-primary-dark mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+977-9804400140</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="h-6 w-6 text-primary dark:text-primary-dark mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@spangle.edu.np</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/contact" className="btn btn-primary inline-flex items-center group">
                  Get Directions
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white text-center transform hover:rotate-1 hover:scale-105 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
                <div className="space-y-2 text-lg">
                  <p>Sunday - Friday: 6:00 AM - 6:00 PM</p>
                  <p>Saturday: 6:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>
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
                  className="card-image transition-transform duration-500 group-hover:scale-110"
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