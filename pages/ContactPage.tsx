import React from 'react';
import ContactForm from '../components/ContactForm';

const MailIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const PhoneIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const LocationIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ContactPage: React.FC = () => {
    return (
        <div className="bg-brand-gray-50 py-16 sm:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-brand-gray-900 sm:text-5xl">Get in Touch</h1>
                    <p className="mt-4 text-lg leading-8 text-brand-gray-600">
                        We're here to help you on your journey to finding your first home.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="p-8 bg-white border border-brand-gray-200 rounded-2xl">
                        <h2 className="text-2xl font-semibold text-brand-gray-900">Send us a message</h2>
                        <ContactForm />
                    </div>

                    <div className="space-y-8">
                        <div className="p-8 bg-white border border-brand-gray-200 rounded-2xl">
                             <h2 className="text-2xl font-semibold text-brand-gray-900">Contact Information</h2>
                             <div className="mt-6 space-y-4">
                                <div className="flex items-start">
                                    <MailIcon className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1"/>
                                    <div className="ml-4">
                                        <h3 className="font-semibold">Email</h3>
                                        <a href="mailto:contact@primereal.com" className="text-brand-gray-600 hover:text-brand-blue">contact@primereal.com</a>
                                    </div>
                                </div>
                                 <div className="flex items-start">
                                    <PhoneIcon className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1"/>
                                    <div className="ml-4">
                                        <h3 className="font-semibold">Phone</h3>
                                        <a href="tel:+919876543210" className="text-brand-gray-600 hover:text-brand-blue">+91 98765 43210</a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <LocationIcon className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1"/>
                                    <div className="ml-4">
                                        <h3 className="font-semibold">Office</h3>
                                        <p className="text-brand-gray-600">123 Model Colony, Shivaji Nagar</p>
                                        <p className="text-brand-gray-600">Pune, Maharashtra, 411016</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-brand-gray-200">
                           <img src="https://picsum.photos/seed/map/800/400" alt="Map of office location" className="w-full h-64 object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;