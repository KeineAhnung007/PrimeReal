
import React from 'react';
import type { Property } from '../types';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

const LocationIcon: React.FC<{className: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(price / 100000).toFixed(2)} Lac`;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white border border-brand-gray-200 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
      <Link to={`/property/${property.id}`} className="block">
        <div className="overflow-hidden h-56">
          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-5">
          <p className="text-2xl font-bold text-brand-gray-900">{formatPrice(property.price)}</p>
          <h3 className="mt-2 text-lg font-semibold text-brand-gray-800 truncate" title={property.title}>{property.title}</h3>
          <div className="mt-2 flex items-center text-brand-gray-500 text-sm">
            <LocationIcon className="w-4 h-4 mr-1.5" />
            <span>{property.location}, Pune</span>
          </div>
          <div className="mt-4 pt-4 border-t border-brand-gray-100 flex justify-between text-sm text-brand-gray-600">
            <span>{property.bedrooms} Beds</span>
            <span className="text-brand-gray-300">|</span>
            <span>{property.bathrooms} Baths</span>
            <span className="text-brand-gray-300">|</span>
            <span>{property.area} sq.ft.</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
