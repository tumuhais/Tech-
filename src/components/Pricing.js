import React from 'react';
import { Check, Zap, ArrowRight, Server } from 'lucide-react';

const pricingPackages = [
  {
    title: "Starter Web Presence",
    price: "UGX 1,000,000",
    description: "Ideal for small businesses needing a clean, professional web showcase.",
    features: [
      "Up to 5 Custom React Pages",
      "Mobile Responsive & Fast Loading",
      "WhatsApp Chat & Contact Forms",
      "Basic SEO & Domain Integration",
      "1 Month Post-Launch Support"
    ],
    highlight: false,
    cta: "Select Starter"
  },
  {
    title: "Business & Corporate Portal",
    price: "UGX 2,000,000",
    description: "Designed for growing companies requiring custom brand portals & lead generation.",
    features: [
      "Up to 10 Dynamic Pages / CMS",
      "Advanced UI/UX & Tailwind Design",
      "Speed Optimization & Analytics",
      "Dynamic Content Management",
      "3 Months Technical Support"
    ],
    highlight: false,
    cta: "Select Business"
  },
  {
    title: "E-Commerce System",
    price: "UGX 3,500,000+",
    description: "Full online store with automated cart state & payment gateway integration.",
    features: [
      "Dynamic Product Catalog & Filters",
      "MTN/Airtel MoMo & Card Payments",
      "Cart Management & React Context API",
      "MongoDB / PostgreSQL Inventory",
      "Admin Training + 6 Months Support"
    ],
    highlight: true,
    cta: "Get E-Commerce"
  },
  {
    title: "Custom Enterprise System",
    price: "UGX 5,000,000+",
    description: "Tailored microfinance, utility reporting, hospital EHR, or campus network deployments.",
    features: [
      "Custom Architecture & Node/Express REST APIs",
      "Role-Based Access (JWT) & Database Design",
      "Automated Reports & PDF Exports",
      "Cisco VLAN Network & Wazuh SIEM Setup",
      "24/7 Priority SLA Technical Support"
    ],
    highlight: false,
    cta: "Request Custom Quote"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-brand-deepNavy relative overflow-hidden border-t border-white/10">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-4">
            <Zap className="w-4 h-4 text-brand-orange animate-pulse" />
            <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">
              Transparent Investment Plans
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Predictable Pricing for <span className="text-brand-cyan">Local & Enterprise Scale</span>
          </h2>
          
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
            Choose a package tailored to your business needs, or contact us for a customized software and network engineering proposal.
          </p>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                pkg.highlight
                  ? "bg-slate-900 border-2 border-brand-orange shadow-2xl shadow-orange-500/15 lg:-translate-y-2"
                  : "bg-slate-900/60 border border-white/10 hover:border-brand-cyan/40 hover:bg-slate-900"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[10px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-md">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white mb-2">{pkg.title}</h3>
                <p className="text-gray-400 text-xs mb-6 min-h-[36px] leading-relaxed">{pkg.description}</p>
                
                <div className="mb-6">
                  <span className="text-[11px] text-gray-400 block font-semibold uppercase tracking-wider">Starting from</span>
                  <span className="text-2xl sm:text-3xl font-black text-brand-cyan">{pkg.price}</span>
                </div>

                <div className="border-t border-white/10 pt-5 mb-8">
                  <ul className="space-y-3">
                    {pkg.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs text-gray-300">
                        <Check className="w-4 h-4 text-brand-cyan mr-2.5 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href="#contact"
                className={`w-full py-3 rounded-xl font-bold text-xs text-center transition-all duration-300 flex items-center justify-center space-x-2 ${
                  pkg.highlight
                    ? "bg-brand-orange hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
              >
                <span>{pkg.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* CUSTOM ENTERPRISE CTA BANNER */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center max-w-3xl mx-auto backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
              <Server className="w-4 h-4" />
              <span>Need Specialized Networking or SIEM Infrastructure?</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm">
              We design custom Cisco network topologies, Wazuh SIEM deployments, and database architectures tailored to your enterprise scope.
            </p>
          </div>
          <a 
            href="#contact" 
            className="shrink-0 bg-brand-cyan/10 border border-brand-cyan/30 hover:bg-brand-cyan hover:text-slate-900 text-brand-cyan font-bold text-xs px-5 py-3 rounded-xl transition-all duration-300"
          >
            Get Custom Quote
          </a>
        </div>

      </div>
    </section>
  );
};

export default Pricing;