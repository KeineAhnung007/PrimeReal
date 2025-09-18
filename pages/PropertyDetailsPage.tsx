
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import ContactForm from '../components/ContactForm';

const ChevronLeftIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const CheckCircleIcon: React.FC<{className: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

const PropertyDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const property = PROPERTIES.find(p => p.id === Number(id));

    const [mainImage, setMainImage] = useState(property ? property.images[0] : '');

    const similarProperties = useMemo(() => {
        if (!property) return [];
        return PROPERTIES.filter(
            p => p.location === property.location && p.id !== property.id
        ).slice(0, 3);
    }, [property]);

    if (!property) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">Property not found</h2>
                <Link to="/listings" className="mt-4 inline-block text-brand-blue hover:underline">
                    Back to listings
                </Link>
            </div>
        );
    }
    
    return (
        <div className="bg-white">
            <div className="container mx-auto px-6 py-12">
                <Link to="/listings" className="inline-flex items-center text-brand-blue mb-6 text-sm font-medium">
                    <ChevronLeftIcon className="w-5 h-5 mr-1" />
                    Back to Listings
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div>
                            <img src={mainImage} alt={property.title} className="w-full h-auto max-h-[600px] object-cover rounded-2xl mb-4 shadow-lg" />
                            <div className="grid grid-cols-4 gap-4">
                                {property.images.map((img, index) => (
                                    <button key={index} onClick={() => setMainImage(img)} className={`rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-brand-blue' : 'border-transparent'}`}>
                                        <img src={img} alt={`${property.title} thumbnail ${index + 1}`} className="w-full h-24 object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="mt-8">
                            <h1 className="text-4xl font-bold text-brand-gray-900">{property.title}</h1>
                            <p className="mt-2 text-lg text-brand-gray-600">{property.location}, Pune</p>

                            <div className="mt-8 border-t border-brand-gray-200 pt-8">
                                <h2 className="text-2xl font-semibold text-brand-gray-800">Overview</h2>
                                <p className="mt-4 text-brand-gray-600 leading-relaxed">{property.description}</p>
                            </div>
                            
                            <div className="mt-8 border-t border-brand-gray-200 pt-8">
                                <h2 className="text-2xl font-semibold text-brand-gray-800">Features & Amenities</h2>
                                <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-brand-gray-700">
                                    {property.amenities.map(amenity => (
                                        <li key={amenity} className="flex items-center">
                                            <CheckCircleIcon className="w-5 h-5 mr-2 text-emerald-500" />
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {property.floorPlanUrl && (
                                <div className="mt-8 border-t border-brand-gray-200 pt-8">
                                    <h2 className="text-2xl font-semibold text-brand-gray-800">Floor Plan</h2>
                                    <img src={property.floorPlanUrl} alt="Floor Plan" className="mt-4 rounded-lg border border-brand-gray-200"/>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            {/* Key Info Panel */}
                             <div className="p-6 bg-brand-gray-50 border border-brand-gray-200 rounded-2xl">
                                 <p className="text-4xl font-bold text-brand-gray-900">{formatPrice(property.price)}</p>
                                 <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                     <div>
                                         <p className="font-semibold text-lg">{property.bedrooms}</p>
                                         <p className="text-sm text-brand-gray-600">Beds</p>
                                     </div>
                                     <div>
                                         <p className="font-semibold text-lg">{property.bathrooms}</p>
                                         <p className="text-sm text-brand-gray-600">Baths</p>
                                     </div>
                                     <div>
                                         <p className="font-semibold text-lg">{property.area}</p>
                                         <p className="text-sm text-brand-gray-600">sq.ft.</p>
                                     </div>
                                 </div>
                            </div>
                            {/* Contact Form */}
                            <div className="p-6 bg-brand-gray-50 border border-brand-gray-200 rounded-2xl">
                                <h3 className="text-xl font-semibold text-brand-gray-900 mb-4">Interested in this property?</h3>
                                <ContactForm propertyTitle={property.title} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Properties */}
                {similarProperties.length > 0 && (
                    <div className="mt-16 border-t border-brand-gray-200 pt-12">
                        <h2 className="text-3xl font-bold text-center text-brand-gray-900">Similar Properties</h2>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {similarProperties.map(prop => (
                                <PropertyCard key={prop.id} property={prop} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyDetailsPage;
