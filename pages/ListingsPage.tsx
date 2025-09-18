
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Property } from '../types';
import { PROPERTIES, PUNE_LOCALITIES, AMENITIES_LIST } from '../constants';
import PropertyCard from '../components/PropertyCard';
import Button from '../components/Button';

const FilterIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
    </svg>
);

const CloseIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface Filters {
    location: string;
    propertyType: string[];
    priceRange: { min: number; max: number };
    bedrooms: number[];
    bathrooms: number[];
    area: { min: number; max: number };
    amenities: string[];
}

const initialFilters: Filters = {
    location: 'all',
    propertyType: [],
    priceRange: { min: 0, max: 30000000 },
    bedrooms: [],
    bathrooms: [],
    area: { min: 0, max: 3000 },
    amenities: [],
};

const ListingsPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const [filters, setFilters] = useState<Filters>(() => {
        const initial = {...initialFilters};
        const queryLocation = queryParams.get('location');
        if(queryLocation) {
            initial.location = queryLocation;
        }
        return initial;
    });

    const [sortOption, setSortOption] = useState('newest');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const handleFilterChange = <K extends keyof Filters,>(key: K, value: Filters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => setFilters(initialFilters);
    
    const filteredProperties = useMemo(() => {
        let result = PROPERTIES;

        // Location
        if (filters.location !== 'all') {
            result = result.filter(p => p.location.toLowerCase() === filters.location.toLowerCase());
        }

        // Property Type (BHK)
        if (filters.propertyType.length > 0) {
            result = result.filter(p => filters.propertyType.includes(p.type));
        }

        // Price Range
        result = result.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
        
        // Area
        result = result.filter(p => p.area >= filters.area.min && p.area <= filters.area.max);

        // Bedrooms
        if (filters.bedrooms.length > 0) {
            result = result.filter(p => filters.bedrooms.includes(p.bedrooms));
        }
        
        // Bathrooms
        if (filters.bathrooms.length > 0) {
            result = result.filter(p => filters.bathrooms.includes(p.bathrooms));
        }

        // Amenities
        if (filters.amenities.length > 0) {
            result = result.filter(p => filters.amenities.every(amenity => p.amenities.includes(amenity)));
        }

        // Sorting
        switch (sortOption) {
            case 'price_asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => b.id - a.id);
                break;
            case 'oldest':
                 result.sort((a, b) => a.id - b.id);
                break;
        }

        return result;
    }, [filters, sortOption]);

    const FilterSidebar = () => (
        <aside className="p-6 bg-white border border-brand-gray-200 rounded-2xl h-fit">
            <h3 className="text-xl font-semibold text-brand-gray-900 mb-6">Filters</h3>
            <div className="space-y-6">
                {/* Location */}
                <div>
                    <label className="text-sm font-medium">Location</label>
                    <select value={filters.location} onChange={e => handleFilterChange('location', e.target.value)} className="mt-1 w-full p-2 border border-brand-gray-300 rounded-md">
                        <option value="all">All Pune</option>
                        {PUNE_LOCALITIES.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                </div>
                
                {/* Property Type */}
                <div>
                    <label className="text-sm font-medium">Property Type</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {['1BHK', '2BHK', '3BHK', '4BHK+'].map(type => (
                            <button 
                                key={type}
                                onClick={() => {
                                    const newTypes = filters.propertyType.includes(type)
                                        ? filters.propertyType.filter(t => t !== type)
                                        : [...filters.propertyType, type];
                                    handleFilterChange('propertyType', newTypes);
                                }}
                                className={`p-2 border rounded-md text-sm ${filters.propertyType.includes(type) ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white hover:border-brand-gray-400'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="text-sm font-medium">Price Range (₹)</label>
                    <div className="flex gap-2 mt-1">
                        <input type="number" placeholder="Min" value={filters.priceRange.min} onChange={e => handleFilterChange('priceRange', {...filters.priceRange, min: Number(e.target.value)})} className="w-full p-2 border border-brand-gray-300 rounded-md"/>
                        <input type="number" placeholder="Max" value={filters.priceRange.max} onChange={e => handleFilterChange('priceRange', {...filters.priceRange, max: Number(e.target.value)})} className="w-full p-2 border border-brand-gray-300 rounded-md"/>
                    </div>
                </div>
                
                {/* Amenities */}
                <div>
                    <label className="text-sm font-medium">Amenities</label>
                    <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {AMENITIES_LIST.map(amenity => (
                             <label key={amenity} className="flex items-center text-sm">
                                <input type="checkbox"
                                    checked={filters.amenities.includes(amenity)}
                                    onChange={() => {
                                        const newAmenities = filters.amenities.includes(amenity)
                                            ? filters.amenities.filter(a => a !== amenity)
                                            : [...filters.amenities, amenity];
                                        handleFilterChange('amenities', newAmenities);
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                                />
                                <span className="ml-2 text-brand-gray-700">{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <Button onClick={resetFilters} variant="secondary" fullWidth>Reset Filters</Button>
            </div>
        </aside>
    );

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-brand-gray-900">Apartment Listings</h1>
            <p className="mt-2 text-brand-gray-600">Find your perfect first home from our curated list of properties in Pune.</p>

            <div className="mt-8 lg:grid lg:grid-cols-4 lg:gap-8">
                {/* Desktop Filters */}
                <div className="hidden lg:block">
                    <FilterSidebar />
                </div>

                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-6">
                    <Button onClick={() => setMobileFiltersOpen(true)} variant="secondary" fullWidth className="flex items-center justify-center gap-2">
                        <FilterIcon className="w-5 h-5"/>
                        Show Filters
                    </Button>
                </div>
                 {/* Mobile Filters Modal */}
                {mobileFiltersOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                        <div className="bg-brand-gray-50 w-full max-w-sm h-full overflow-y-auto p-4">
                            <div className="flex justify-between items-center mb-4">
                               <h2 className="text-xl font-bold">Filters</h2>
                                <button onClick={() => setMobileFiltersOpen(false)}><CloseIcon className="w-6 h-6"/></button>
                            </div>
                            <FilterSidebar />
                        </div>
                    </div>
                )}
                
                <main className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-sm text-brand-gray-600">{filteredProperties.length} results found</p>
                        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="p-2 border border-brand-gray-300 rounded-md text-sm">
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>

                    {filteredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProperties.map(property => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 border border-dashed border-brand-gray-300 rounded-2xl">
                           <h3 className="text-xl font-semibold">No Properties Found</h3>
                           <p className="mt-2 text-brand-gray-500">Try adjusting your filters to find your perfect home.</p>
                           <Button onClick={resetFilters} className="mt-6">Clear All Filters</Button>
                        </div>
                    )}
                    {/* Pagination could be added here */}
                </main>
            </div>
        </div>
    );
};

export default ListingsPage;
