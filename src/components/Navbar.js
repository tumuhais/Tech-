import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-navy/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <a href="#home" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="AnsoTech Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }} 
            />
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-white tracking-wider">
                ANSO<span className="text-brand-orange">TECH</span>
              </span>
              <span className="bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold px-2 py-0.5 rounded border border-brand-cyan/30 tracking-widest uppercase">
                UG
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-brand-orange text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="tel:+256777036617"
              className="flex items-center space-x-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              <div className="p-2 rounded-full bg-white/5 border border-white/10 text-brand-cyan">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-gray-400 font-normal">Call Us Anytime</span>
                <span className="font-mono text-xs font-bold">+256 777 036 617</span>
              </div>
            </a>

            <a
              href="#quote"
              className="bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 active:scale-95"
            >
              Get A Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="w-7 h-7 text-brand-orange" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-brand-deepNavy/95 backdrop-blur-xl border-b border-white/10 px-6 pt-4 pb-8 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 border-b border-white/10 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-brand-orange text-base font-medium py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 space-y-3">
            <a
              href="tel:+256777036617"
              className="flex items-center justify-center space-x-2 text-sm font-semibold text-gray-300 bg-white/5 py-2.5 rounded-lg border border-white/10"
            >
              <Phone className="w-4 h-4 text-brand-cyan" />
              <span>+256 777 036 617</span>
            </a>

            <a
              href="#quote"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm tracking-wider uppercase py-3 rounded-lg shadow-lg shadow-orange-500/20"
            >
              Get A Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;