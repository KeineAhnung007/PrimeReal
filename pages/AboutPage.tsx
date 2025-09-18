import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-brand-gray-900 sm:text-6xl">About Prime Real</h1>
                    <p className="mt-6 text-lg leading-8 text-brand-gray-600">
                        Dedicated to making your first home purchase a simple and joyful experience.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-brand-gray-900">Our Mission</h2>
                        <p className="mt-4 text-brand-gray-600 leading-relaxed">
                            At Prime Real, we understand that buying your first home is one of life's most significant milestones. Our mission is to empower first-time buyers in Pune with the knowledge, resources, and curated property options they need to make confident and informed decisions. We believe in transparency, integrity, and a client-first approach, ensuring that your journey to homeownership is as smooth and stress-free as possible.
                        </p>
                        <p className="mt-4 text-brand-gray-600 leading-relaxed">
                            We specialize in modern apartments across Pune's most desirable localities, handpicking properties that offer the best in value, location, and amenities for those starting their homeownership journey.
                        </p>
                    </div>
                    <div className="order-1 md:order-2">
                         <img 
                            src="https://picsum.photos/seed/about/800/600"
                            alt="Pune cityscape" 
                            className="rounded-2xl shadow-xl w-full h-auto object-cover"
                         />
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-bold text-brand-gray-900">Meet the Agent</h2>
                    <div className="mt-8 max-w-sm mx-auto">
                        <img 
                           src="https://picsum.photos/seed/headshot/400/400"
                           alt="Agent headshot" 
                           className="rounded-full w-48 h-48 mx-auto shadow-lg"
                        />
                        <h3 className="mt-6 text-xl font-semibold text-brand-gray-900">Tony Fernandes</h3>
                        <p className="text-brand-blue">Lead Real Estate Consultant</p>
                        <p className="mt-2 text-brand-gray-600">
                           With over a decade of experience in Pune's real estate market, Tony is passionate about helping young professionals and families find their dream first home.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;