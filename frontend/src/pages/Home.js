import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  ChevronLeftIcon as ChevronLeft,
  ChevronRightIcon as ChevronRight
} from '@heroicons/react/24/outline';
import { StarIcon as Star } from '@heroicons/react/24/solid';
import ScrollingCountryFlags from '../components/ScrollingCountryFlags';
import '../components/ScrollingCountryFlags.css';
import { getAllTeam } from '../firebase/firestoreService';
import { getTeamImagePath } from '../utils/imageHelper';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

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

  // Fetch team members from Firebase
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoadingTeam(true);
        const teamData = await getAllTeam();
        setTeamMembers(teamData);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Auto-play functionality for staff carousel
  useEffect(() => {
    if (isAutoPlaying && teamMembers.length > 0) {
      const interval = setInterval(() => {
        setCurrentStaffIndex((prevIndex) =>
          prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, teamMembers.length]);

  // Navigation functions
  const goToPreviousStaff = () => {
    setIsAutoPlaying(false);
    setCurrentStaffIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const goToNextStaff = () => {
    setIsAutoPlaying(false);
    setCurrentStaffIndex((prevIndex) =>
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToStaff = (index) => {
    setIsAutoPlaying(false);
    setCurrentStaffIndex(index);
  };

  return (
    <div className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Announcement Bar */}
      <div className="w-full bg-yellow-400 text-gray-900 py-2 px-4 flex justify-center items-center text-sm font-semibold">
        <span>New batches for Diploma in Computer Application  start Soon! &nbsp;</span>
        <Link to="/courses" className="bg-white text-yellow-700 font-bold px-4 py-1 rounded shadow hover:bg-yellow-100 ml-2">Enroll Now</Link>
      </div>


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
            {/* <div className="relative shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl group mx-auto" style={{height: '420px', minHeight: '350px', maxHeight: '500px'}}> */}
            <img
              src={require('../assets/banners/herosection_banner.jpg')}
              alt="Students"
              className="w-full h-full rounded-lg object-cover group-hover:scale-110 transition-transform duration-500"
              style={{ border: 'none', height: '100%', width: 'auto', objectFit: 'cover' }}
            />
            {/* </div> */}
          </div>
        </div>
      </section>


      <section className="bg-blue-100 dark:bg-gray-00 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-3xl font-bold text-blue-900 dark:text-yellow-300 mb-2">20,00+</span>
            <span className="text-sm text-gray-600 dark:text-gray-300 mb-2">Successful Leaner</span>
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
            <span className="text-3xl font-bold text-blue-900 dark:text-yellow-300 mb-2">15+</span>
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
                src={require('../assets/exclence.png')}
                alt="Institute Excellence"
                className="rounded-3xl w-full h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-105 hover:rotate-1"
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

          {loadingTeam ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No team members available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="relative">
                {/* Staff Card */}
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={getTeamImagePath(teamMembers[currentStaffIndex].image)}
                      alt={teamMembers[currentStaffIndex].name}
                      className="card-image transition-transform duration-500 group-hover:scale-110 w-full object-cover"
                      style={{ height: '450px', minHeight: '400px', maxHeight: '500px' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x450/6366f1/white?text=Staff+Photo';
                      }}
                    />
                    <div className="image-overlay"></div>
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 z-10">
                      <span className="text-sm font-semibold text-gray-700">
                        {currentStaffIndex + 1} / {teamMembers.length}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {teamMembers[currentStaffIndex].name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-1">
                      {teamMembers[currentStaffIndex].position}
                    </p>
                    <p className="text-gray-600 mb-3">
                      {teamMembers[currentStaffIndex].department}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {teamMembers[currentStaffIndex].experience} years of experience
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < teamMembers[currentStaffIndex].rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {teamMembers[currentStaffIndex].rating}/5
                      </span>
                    </div>

                    <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4">
                      "{teamMembers[currentStaffIndex].quote}"
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
                  {teamMembers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToStaff(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentStaffIndex
                        ? 'bg-blue-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      aria-label={`Go to staff member ${index + 1}`}
                    />
                  ))}
                </div>

              </div>
            </>
          )}
        </div>
      </section>

      <ScrollingCountryFlags />

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