
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import Button from '../components/Button';

const HomePage: React.FC = () => {
    const featuredProperties = PROPERTIES.filter(p => p.isFeatured).slice(0, 3);
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const location = formData.get('location') as string;
        navigate(`/listings?location=${encodeURIComponent(location)}`);
    };

    return (
        <div className="bg-brand-gray-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/homehero/1920/1080')" }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Find Your First Home in Pune</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">A curated collection of apartments, designed for the next step in your life.</p>
                    <div className="mt-8">
                        <Link to="/listings">
                            <Button className="px-8 py-4 text-base">Start Your Search</Button>
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* Quick Search Bar */}
            <section className="-mt-12 relative z-20">
                <div className="container mx-auto px-6">
                    <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4">
                        <input
                            type="text"
                            name="location"
                            placeholder='e.g., "Hinjewadi," "Kothrud"'
                            className="w-full px-4 py-3 border border-brand-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue"
                        />
                        <Button type="submit" className="w-full md:w-auto">Search</Button>
                    </form>
                </div>
            </section>

            {/* Featured Listings Section */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-gray-900">Featured Listings</h2>
                    <p className="mt-4 text-center text-brand-gray-600 max-w-2xl mx-auto">Explore our hand-picked selection of new and popular apartments perfect for first-time buyers.</p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                     <div className="mt-12 text-center">
                        <Link to="/listings">
                            <Button variant="secondary">View All Properties</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-white py-20 md:py-28">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="https://picsum.photos/seed/agent/600/400" alt="Friendly real estate agent" className="rounded-2xl shadow-xl"/>
                    </div>
                    <div className="text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900">Your Trusted Partner</h2>
                        <p className="mt-4 text-lg text-brand-gray-600">
                           Buying your first home is a big step, and we're here to make it a seamless and memorable journey. Our focus is solely on first-time buyers in Pune, providing expert guidance and a portfolio of properties that meet your needs and aspirations.
                        </p>
                        <div className="mt-8">
                            <Link to="/about">
                               <Button variant="secondary">Learn More About Us</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
