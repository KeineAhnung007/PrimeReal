import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const HomeIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const MenuIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = "text-brand-gray-800 hover:text-brand-blue transition-colors duration-300 py-2 md:py-0";
    const activeLinkClasses = { color: '#0071e3', fontWeight: '500' };

    const navLinks = (
        <>
            <NavLink to="/" className={navLinkClasses} style={({ isActive }) => isActive ? activeLinkClasses : {}} end>Home</NavLink>
            <NavLink to="/listings" className={navLinkClasses} style={({ isActive }) => isActive ? activeLinkClasses : {}}>Properties</NavLink>
            <NavLink to="/about" className={navLinkClasses} style={({ isActive }) => isActive ? activeLinkClasses : {}}>About</NavLink>
            <NavLink to="/contact" className={navLinkClasses} style={({ isActive }) => isActive ? activeLinkClasses : {}}>Contact</NavLink>
        </>
    );

    return (
        <header className="bg-brand-gray-50/80 backdrop-blur-lg sticky top-0 z-50 border-b border-brand-gray-200">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <NavLink to="/" className="flex items-center gap-2">
                    <HomeIcon className="w-7 h-7 text-brand-blue" />
                    <span className="text-xl font-bold text-brand-gray-900 tracking-tight">Prime Real</span>
                </NavLink>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navLinks}
                </nav>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-brand-gray-50 border-t border-brand-gray-200">
                    <nav className="container mx-auto px-6 py-4 flex flex-col items-start gap-4 text-sm font-medium">
                        {navLinks}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;