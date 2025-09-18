
import React, { useState } from 'react';
import Button from './Button';

const ContactForm: React.FC<{ propertyTitle?: string }> = ({ propertyTitle }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: propertyTitle ? `I am interested in the property: ${propertyTitle}` : '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-emerald-800">Thank You!</h3>
                <p className="mt-2 text-emerald-700">Your inquiry has been sent. We will get back to you shortly.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-gray-700">Full Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-brand-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-gray-700">Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-brand-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-brand-gray-700">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-brand-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-gray-700">Message</label>
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-brand-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                ></textarea>
            </div>
            <div>
                <Button type="submit" fullWidth>
                    Send Inquiry
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
