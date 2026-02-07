import React, { useState } from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: ['+977-9804400140', '+977-071-520333'],
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: ['info@spangle.edu.np', 'admissions@spangle.edu.np'],
    },
    {
      icon: MapPinIcon,
      title: 'Location',
      details: ['Siddharthanagar-13, Devkota Chowk', 'Rupandehi, Nepal'],
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      details: ['Sun - Fri: 6:00 AM - 6:00 PM', 'Saturday: 6:00 AM - 2:00 PM'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1 rounded-full border border-gray-700 bg-gray-800 animate-fade-in-up">
              <span className="text-gray-300 font-medium tracking-wide text-xs uppercase">We are here to help</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Let's Start a <br />
              <span className="text-orange-500">Conversation</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Whether you're looking for course details, admission guidlines, or just want to say hi, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-orange-500">
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mb-6 text-orange-600">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm font-medium">{detail}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Information */}
            <div className="relative">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-100 text-orange-700 text-sm font-bold mb-6">
                  <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                  GET IN TOUCH
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                  We're Here to <br />
                  <span className="text-orange-600">Help You Grow</span>
                </h2>

                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  Have questions about our courses, admissions, or need guidance on your educational journey?
                  We're here to help! Send us a message and we'll get back to you as soon as possible.
                </p>

                {/* FAQ Snippets */}
                <div className="space-y-4">
                  {[
                    { q: "What courses do you offer?", a: "Web Development, Graphics Design, Digital Marketing, and details." },
                    { q: "How can I enroll?", a: "Visit our courses page to browse and submit an application online." },
                    { q: "Job placement assistance?", a: "Yes, we provide career guidance for qualified graduates." }
                  ].map((faq, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                        Q
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{faq.q}</h4>
                        <p className="text-sm text-gray-600">{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="relative">
              <div className="bg-white relative z-10 border border-gray-200 shadow-xl rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  Send us a Message
                </h3>
                <p className="text-gray-500 mb-8 text-sm">We typically search and reply within 24 hours.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Dark Mode Support for Map */}
      <section className="h-96 w-full relative z-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1824.7047574327069!2d83.457143!3d27.505931!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39969b9857bd42bf%3A0xfd8cf744f76eda73!2sSpangle%20Education%20%26%20Computer%20Institute!5e1!3m2!1sen!2sin!4v1770437380188!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Spangle Location"
          className=""
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
