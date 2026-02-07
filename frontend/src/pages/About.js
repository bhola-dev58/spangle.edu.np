import React, { useState, useEffect } from 'react';
import teamStaticData from '../data/team';
import { StaffCard } from '../components/ImageCard';
import { getAllTeam } from '../firebase/firestoreService';
import LoadingSpinner from '../components/LoadingSpinner';

const About = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeam();
    }, []);

    const loadTeam = async () => {
        setLoading(true);
        try {
            const teamData = await getAllTeam();
            // If no data in Firebase, use static data as fallback
            setTeam(teamData.length > 0 ? teamData : teamStaticData);
        } catch (error) {
            console.error('Error loading team:', error);
            // Fallback to static data on error
            setTeam(teamStaticData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-16 shadow w-full">
                <div className="container mx-auto px-4 max-w-screen-xl relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 animate-fade-in-up">About Spangle Education</h1>
                    <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Empowering students with quality education and computer training in Siddharthanagar.</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-white py-16 animate-fade-in-up">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">Our Story</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="mb-6">
                            Spangle Education and Computer Institute Pvt. Ltd. was established with a vision to provide quality education and computer training to students in Siddharthanagar and surrounding areas. Our institute is committed to empowering students with the knowledge and skills they need to succeed in today's digital world.
                        </p>
                        <p className="mb-10">
                            Located in the heart of Siddharthanagar-13, Devkota Chowk, Rupandehi, we have been serving the community with dedication and excellence. Our modern facilities and experienced faculty ensure that every student receives the best possible education and training.
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold mb-6 mt-12 text-gray-900 border-l-4 border-orange-500 pl-4">Our Mission</h2>
                    <p className="text-gray-700 text-lg mb-12">
                        To provide accessible, quality education and computer training that prepares students for academic and professional success. We aim to bridge the digital divide and create opportunities for all students to excel in their chosen fields.
                    </p>

                    <h2 className="text-3xl font-bold mb-8 mt-16 text-gray-900 text-center">Our Facilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Modern Computer Labs", desc: "State-of-the-art computer labs equipped with the latest hardware and software for optimal learning experience." },
                            { title: "Expert Faculty", desc: "Our team of experienced and qualified instructors is dedicated to providing quality education and guidance." },
                            { title: "Learning Resources", desc: "Comprehensive study materials and resources to support student learning and development." },
                            { title: "Career Support", desc: "Guidance and support for career development and job placement assistance for our graduates." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-orange-500 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <span className="text-xl font-bold">{i + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16 animate-fade-in-up border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Meet Our Expert Team</h2>
                    <div className="h-1 w-20 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">Our dedicated staff members bring years of experience and passion for education to help you achieve your academic goals.</p>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {team.map((staff, index) => (
                                <StaffCard key={staff.id || staff.name || index} staff={staff} imageHeight="h-80" />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default About;
