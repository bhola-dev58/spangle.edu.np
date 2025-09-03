import React from 'react';
import { Link } from 'react-router-dom';

const careers = [
  {
    title: "Software Developer",
    desc: "Designs, codes, and maintains software solutions.",
  },
  {
    title: "Data Analyst",
    desc: "Analyzes and interprets complex data for insights.",
  },
  {
    title: "Backend Developer",
    desc: "Develops and maintains server-side applications.",
  },
  {
    title: "Frontend Developer",
    desc: "Creates engaging, responsive web interfaces.",
  },
  {
    title: "Data Scientist",
    desc: "Extracts insights from data using AI and ML.",
  },
  {
    title: "QA Engineer",
    desc: "Ensures software quality through testing and debugging.",
  },
  {
    title: "Machine Learning Engineer",
    desc: "Builds and optimizes AI-driven learning models.",
  },
  {
    title: "Cyber Security Engineer",
    desc: "Secures systems from threats and vulnerabilities.",
  },
  {
    title: "Mobile / App Developer",
    desc: "Designs and develops mobile applications.",
  },
  {
    title: "iOS Developer",
    desc: "Develops sleek, efficient iOS applications.",
  },
  {
    title: "AI Engineer",
    desc: "Builds intelligent systems using AI and ML.",
  },
  {
    title: "Cloud Developer",
    desc: "Builds and manages scalable cloud-based solutions.",
  },
  {
    title: "Blockchain Engineer",
    desc: "Designs, develops, and secures blockchain-based systems.",
  },
  {
    title: "DevOps Engineer",
    desc: "Automates, deploys, and optimizes IT workflows.",
  },
  {
    title: "UX Designer",
    desc: "Designs user-friendly, engaging digital experiences.",
  },
  {
    title: "Database Administrator",
    desc: "Manages and optimizes databases for efficiency.",
  },
  {
    title: "Embedded Systems Engineer",
    desc: "Develops software for hardware-integrated systems.",
  },
];

const staffs = [
  {
    name: "Vedansh Dubey",
    rating: 4.9,
    role: "Assistant Manager HR @Wipro | MBA @XIMB, Ex-TCS, Nestlé, HT Media | National Winner Tata Steel-a-thon | 150+ Case Competitions",
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/66e689b11a7f1.webp?d=150x150",
    profile: "#",
  },
  {
    name: "Yash Patel",
    rating: 4.8,
    role: "Strategy Manager @ Parag Milk Foods (MD's Office) | 300k+ Impressions | 32x National Case Comp Podiums | Dual MBA – MDI Gurgaon & ESCP Europe | Ex-eBay, L&T",
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/660a857811b6d.webp?d=150x150",
    profile: "#",
  },
  {
    name: "Rutwik Borkar",
    rating: 4.9,
    role: "Flipkart | Bain & Co.| Gold Medalist, IIT Madras | XLRI Jamshedpur-BM' 24 | Accenture, Wipro (PPI) | P&G, Nestle, PepsiCo LPs  | 10+ Corporate Case Comp | HUL Changemakers'22 | KVPY Scholar",
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/663c31ccbc761.webp?d=150x150",
    profile: "#",
  },
  {
    name: "Shiri Agarwal",
    rating: 4.9,
    role: "Product @Telstra | MBA @MDI Gurgaon'24 | Rank 6th Unstoppable Staff Member | 34 Case Comps Podiums | 97.11 %ile CAT 2021 | Ex Amazon intern | Traveled 19 Countries",
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/6608ff032d283.webp?d=150x150",
    profile: "#",
  },
 
];


const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Spangle Education
            </h1>
            <p className="text-xl mb-8">
              Empowering students with quality education and computer training in Siddharthanagar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="btn bg-white text-primary hover:bg-gray-100"
              >
                Explore Courses
              </Link>
              <Link
                to="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-dark-DEFAULT transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About Our Institute</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Spangle Education and Computer Institute Pvt. Ltd. is a premier educational institution located in Siddharthanagar-13, Devkota Chowk, Rupandehi. We are committed to providing quality education and computer training to help students achieve their academic and professional goals.
            </p>
            <Link to="/about" className="btn btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-light transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose Spangle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-DEFAULT p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Expert Faculty</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn from experienced and qualified instructors dedicated to your success.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-DEFAULT p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Modern Facilities</h3>
              <p className="text-gray-600 dark:text-gray-300">
                State-of-the-art computer labs and learning resources for optimal education.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-DEFAULT p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Career Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive guidance and support for your academic and professional journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-dark-DEFAULT transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Career Opportunities</h2>
          <div className="mobile-carousel grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {careers.map((career, index) => (
            <div
              key={index}
              className="item bg-white dark:bg-dark-light rounded-2xl shadow-md hover:shadow-lg transition p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-100 dark:border-gray-600"
            >
              <div className="career-icon mb-4 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full">
                <span className="text-white text-2xl font-bold">
                  {career.title.charAt(0)}
                </span>
              </div>
              <div className="career-content">
                <div className="title font-semibold text-lg text-gray-900 dark:text-white mb-2">{career.title}</div>
                <div className="desc text-gray-600 dark:text-gray-300 text-sm mb-4">{career.desc}</div>
                <button className="view w-full py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:from-primary-dark hover:to-secondary-dark transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      <section className="staffs py-10 bg-gray-50 dark:bg-dark-light transition-colors duration-300">
      <div className="un-container max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
               Featured Staffs
          </h2>
          <button className="text-primary dark:text-primary-dark font-medium hover:underline transition-colors">
            View all
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {staffs.map((staff, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-DEFAULT rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 dark:border-gray-600 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={staff.img}
                  alt={`${staff.name} - Staff Member at Spangle Education`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-100 dark:border-green-800"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary border-4 border-green-100 dark:border-green-800 hidden items-center justify-center"
                >
                  <span className="text-white text-xl font-bold">
                    {staff.name.charAt(0)}
                  </span>
                </div>
                <div className="mt-3 font-semibold text-lg text-gray-900 dark:text-white">
                  {staff.name}
                </div>
                <div className="flex items-center justify-center mt-1 text-yellow-500">
                  ⭐ {staff.rating}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-4">
                  {staff.role}
                </p>
                <a
                  href={staff.profile}
                  className="mt-4 inline-block text-sm px-4 py-2 border border-primary dark:border-primary-dark rounded-full text-primary dark:text-primary-dark hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white transition-colors duration-200"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


      {/* Location Section */}
      <section className="py-16 bg-white dark:bg-dark-DEFAULT transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Visit Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Siddharthanagar-13, Devkota Chowk<br />
              Rupandehi, Nepal
            </p>
            <Link to="/contact" className="btn btn-primary">
              Get Directions
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 dark:bg-dark-light py-16 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Start Your Educational Journey</h2>
          <p className="text-xl mb-8 text-gray-700 dark:text-gray-200">
            Join our community of successful students and take the first step towards your future.
          </p>
          <Link to="/courses" className="btn btn-primary">
            Enroll Now
          </Link>
        </div>
      </section>


    </div>
  );
};

export default Home; 