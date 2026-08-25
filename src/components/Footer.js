import React from 'react';
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-deepNavy border-t border-white/10 text-gray-400 text-sm pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* COLUMN 1 & 2: BRANDING & LOGO */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#top" className="flex items-center space-x-3 group">
              <img 
                src="/logo.png" 
                alt="AnsoTech Company Logo" 
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }} 
              />
              <span className="text-2xl font-black text-white tracking-wider">
                ANSO<span className="text-brand-orange">TECH</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Smart Digital Solutions Built to Grow Your Business. We design, build, and deploy enterprise-grade software and secure web applications.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-brand-orange text-gray-300 hover:text-white transition-all duration-200"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-brand-orange text-gray-300 hover:text-white transition-all duration-200"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-brand-orange text-gray-300 hover:text-white transition-all duration-200"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/256777123456" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-emerald-500 text-gray-300 hover:text-white transition-all duration-200"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMN 3: NAVIGATION */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-l-2 border-brand-orange pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li><a href="#about" className="hover:text-brand-orange transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-brand-orange transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-brand-orange transition-colors">Portfolio</a></li>
              <li><a href="#pricing" className="hover:text-brand-orange transition-colors">Pricing Plans</a></li>
              <li><a href="#contact" className="hover:text-brand-orange transition-colors">Get a Quote</a></li>
            </ul>
          </div>

          {/* COLUMN 5: CONTACT INFO */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 border-l-2 border-brand-orange pl-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-brand-orange mt-1 flex-shrink-0" />
                <span>Kampala, Uganda</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-brand-orange flex-shrink-0" />
                <a href="mailto:info@ansotech.com" className="hover:text-white transition-colors">
                  info@ansotech.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-brand-orange flex-shrink-0" />
                <a href="tel:+256777123456" className="hover:text-white transition-colors">
                  +256 (0) 777 123 456
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION: COPYRIGHT & LEGAL */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} AnsoTech Company. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-gray-400 transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;