import React from 'react';
import ContactForm from '../components/ContactForm';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Address',
      details: [
        'Siddharthanagar-13, Devkota Chowk',
        'Rupandehi, Nepal'
      ],
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: [
        '+977-9804400140',
        '+977-9827426058'
      ],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: [
        'info@spangle.edu.np',
        'admission@spangle.edu.np'
      ],
      gradient: 'from-pink-500 to-red-600'
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      details: [
        'Sunday - Friday: 6:00 AM - 6:00 PM',
        'Saturday: Closed',
        'Public Holidays: Closed'
      ],
      gradient: 'from-red-500 to-orange-600'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Get in touch for inquiries, admissions, or support. We respond promptly and professionally.
            </p>
            <div className="w-24 h-1 bg-white mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="card group text-center">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${info.gradient} inline-block mb-6 text-white group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{info.title}</h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 dark:text-gray-300">{detail}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Information */}
            <div>
              <div className="inline-block rounded-lg bg-primary/10 dark:bg-primary/20 px-4 py-2 font-medium text-primary dark:text-primary-dark mb-4">
                Get in Touch
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                We're Here to Help You
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Have questions about our courses, admissions, or need guidance on your educational journey? 
                We're here to help! Send us a message and we'll get back to you as soon as possible.
              </p>

              {/* FAQ Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      What courses do you offer?
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      We offer courses in Web Development, Graphics Design, Digital Marketing, Computer Science, and Office Management.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      How can I enroll in a course?
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      You can visit our courses page to browse available programs and submit an enrollment application online.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Do you provide job placement assistance?
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Yes, we provide career guidance and job placement assistance to our qualified graduates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <div className="card">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Send us a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Find Our Location
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Visit us at our campus in Siddharthanagar, Rupandehi
            </p>
          </div>
          <div className="bg-white dark:bg-dark-light rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Interactive Map Coming Soon
                </p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">
                  Siddharthanagar-13, Devkota Chowk, Rupandehi, Nepal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 