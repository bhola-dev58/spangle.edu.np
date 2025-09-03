import React from 'react';
import { Link } from 'react-router-dom';

const careers = [
  {
    title: "Software Developer",
    desc: "Designs, codes, and maintains software solutions.",
    img: "",
  },
  {
    title: "Data Analyst",
    desc: "Analyzes and interprets complex data for insights.",
    img: "",
  },
  {
    title: "Backend Developer",
    desc: "Develops and maintains server-side applications.",
    img: "",
  },
  {
    title: "Frontend Developer",
    desc: "Creates engaging, responsive web interfaces.",
    img: "",
  },
  {
    title: "Data Scientist",
    desc: "Extracts insights from data using AI and ML.",
    img: "",
  },
  {
    title: "QA Engineer",
    desc: "Ensures software quality through testing and debugging.",
    img: "",
  },
  {
    title: "Machine Learning Engineer",
    desc: "Builds and optimizes AI-driven learning models.",
    img: "",
  },
  {
    title: "Cyber Security Engineer",
    desc: "Secures systems from threats and vulnerabilities.",
    img: "",
  },
  {
    title: "Mobile / App Developer",
    desc: "Designs and develops mobile applications.",
    img: "",
  },
  {
    title: "iOS Developer",
    desc: "Develops sleek, efficient iOS applications.",
    img: "",
  },
  {
    title: "AI Engineer",
    desc: "Builds intelligent systems using AI and ML.",
    img: "",
  },
  {
    title: "Cloud Developer",
    desc: "Builds and manages scalable cloud-based solutions.",
    img: "",
  },
  {
    title: "Blockchain Engineer",
    desc: "Designs, develops, and secures blockchain-based systems.",
    img: "",
  },
  {
    title: "DevOps Engineer",
    desc: "Automates, deploys, and optimizes IT workflows.",
    img: "",
  },
  {
    title: "UX Designer",
    desc: "Designs user-friendly, engaging digital experiences.",
    img: "",
  },
  {
    title: "Database Administrator",
    desc: "Manages and optimizes databases for efficiency.",
    img: "",
  },
  {
    title: "Embedded Systems Engineer",
    desc: "Develops software for hardware-integrated systems.",
    img: "",
  },
];

const mentors = [
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
    role: "Strategy Manager @ Parag Milk Foods (MD’s Office) | 300k+ Impressions | 32x National Case Comp Podiums | Dual MBA – MDI Gurgaon & ESCP Europe | Ex-eBay, L&T",
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
    role: "Product @Telstra | MBA @MDI Gurgaon'24 | Rank 6th Unstoppable Mentor | 34 Case Comps Podiums | 97.11 %ile CAT 2021 | Ex Amazon intern | Traveled 19 Countries",
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Our Institute</h2>
            <p className="text-gray-600 mb-8">
              Spangle Education and Computer Institute Pvt. Ltd. is a premier educational institution located in Siddharthanagar-13, Devkota Chowk, Rupandehi. We are committed to providing quality education and computer training to help students achieve their academic and professional goals.
            </p>
            <Link to="/about" className="btn btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Spangle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Expert Faculty</h3>
              <p className="text-gray-600">
                Learn from experienced and qualified instructors dedicated to your success.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Modern Facilities</h3>
              <p className="text-gray-600">
                State-of-the-art computer labs and learning resources for optimal education.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Career Support</h3>
              <p className="text-gray-600">
                Comprehensive guidance and support for your academic and professional journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mobile-carousel grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {careers.map((career, index) => (
            <div
              key={index}
              className="item bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <img
                src={career.img}
                alt={career.title}
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="cptn mt-3">
                <div className="title font-semibold text-lg">{career.title}</div>
                <div className="desc text-gray-600 text-sm mt-1">{career.desc}</div>
                <div className="view mt-3 text-green-600 font-medium hover:underline">
                  Start Test
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      <section className="mentors py-10 bg-gray-50">
      <div className="un-container max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
               Mentors
          </h2>
          <button className="text-green-600 font-medium hover:underline">
            View all
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={mentor.img}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                />
                <div className="mt-3 font-semibold text-lg">
                  {mentor.name}
                </div>
                <div className="flex items-center justify-center mt-1 text-yellow-500">
                  ⭐ {mentor.rating}
                </div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-4">
                  {mentor.role}
                </p>
                <a
                  href={mentor.profile}
                  className="mt-4 inline-block text-sm px-4 py-2 border border-green-600 rounded-full text-green-600 hover:bg-green-50 transition"
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
            <p className="text-gray-600 mb-4">
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
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Educational Journey</h2>
          <p className="text-xl mb-8">
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