import React from 'react';
import { Globe, ShoppingCart, Code, Smartphone, Cloud, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Professional, responsive, fast-loading, and SEO-friendly websites tailored to showcase your business and convert visitors into clients.",
    badge: "Popular"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Secure and feature-packed online stores integrated with local & international payment gateways to sell 24/7.",
    badge: "High ROI"
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Custom business management systems, ERPs, and automation platforms built specifically around your workflows.",
    badge: "Custom Build"
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Native and cross-platform Android and iOS applications built for high performance and smooth user experiences.",
    badge: "iOS & Android"
  },
  {
    icon: Cloud,
    title: "IT Solutions",
    description: "Cloud setup, infrastructure management, cybersecurity, and reliable technical consulting for scaling companies.",
    badge: "Enterprise"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-brand-deepNavy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-3">What We Do</h2>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Comprehensive Digital Solutions tailored for modern growth
          </h3>
          <p className="text-gray-400 mt-4 text-base">
            From design to launch and beyond, we deliver end-to-end tech solutions that solve real business challenges.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-brand-navy/60 border border-white/10 rounded-2xl p-8 hover:border-brand-cyan/50 hover:bg-brand-navy transition-all duration-300 group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-14 h-14 bg-brand-cyan/10 rounded-xl flex items-center justify-center border border-brand-cyan/20 group-hover:bg-brand-cyan/20 transition-all">
                      <Icon className="w-7 h-7 text-brand-cyan" />
                    </div>
                    <span className="text-xs font-semibold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
                      {service.badge}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                
                <a
                  href="#quote"
                  className="inline-flex items-center text-sm font-semibold text-white group-hover:text-brand-orange transition-colors"
                >
                  <span>Inquire Service</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;