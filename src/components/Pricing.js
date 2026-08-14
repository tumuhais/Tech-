import React from 'react';
import { Check, Zap } from 'lucide-react';

const pricingPackages = [
  {
    title: "Starter Website",
    price: "UGX 1,000,000",
    description: "Ideal for small businesses needing a clean, professional online presence.",
    features: [
      "Up to 5 Pages",
      "Mobile Responsive",
      "Contact Form & WhatsApp Chat",
      "Basic SEO Setup",
      "1 Month Free Support"
    ],
    highlight: false,
    cta: "Select Starter"
  },
  {
    title: "Business Website",
    price: "UGX 2,000,000",
    description: "Designed for growing companies requiring custom brand showcases & high leads.",
    features: [
      "Up to 10 Pages",
      "Advanced UI/UX Design",
      "Speed Optimization & Analytics",
      "Content Management System",
      "3 Months Support"
    ],
    highlight: false,
    cta: "Select Business"
  },
  {
    title: "E-Commerce System",
    price: "UGX 3,500,000+",
    description: "Full online store with payment integrations to accept orders 24/7.",
    features: [
      "Unlimited Products Setup",
      "MTN/Airtel MoMo & Card Payments",
      "Order Management Dashboard",
      "Inventory & Customer Database",
      "Admin Training + 6 Months Support"
    ],
    highlight: true,
    cta: "Get E-Commerce"
  },
  {
    title: "Custom Business System",
    price: "UGX 5,000,000+",
    description: "School, Loan, Hospital, ERP, or custom portal tailored to your workflow.",
    features: [
      "Fully Custom Architecture",
      "Role-Based Access & Security",
      "Automated Reports & PDF Exports",
      "Database & Cloud Backups",
      "Dedicated Technical Support"
    ],
    highlight: false,
    cta: "Request System"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-brand-deepNavy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-3">Investment Plans</h2>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Transparent Pricing Built for Local Scale
          </h3>
          <p className="text-gray-400 mt-4 text-base">
            Choose a package that matches your current business stage or talk to us for a custom quote.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                pkg.highlight
                  ? "bg-brand-navy border-2 border-brand-orange shadow-2xl shadow-orange-500/10 scale-105"
                  : "bg-brand-navy/50 border border-white/10 hover:border-white/20"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                <h4 className="text-xl font-bold text-white mb-2">{pkg.title}</h4>
                <p className="text-gray-400 text-xs mb-6 min-h-[36px]">{pkg.description}</p>
                
                <div className="mb-6">
                  <span className="text-xs text-gray-400 block font-semibold">Starting from</span>
                  <span className="text-2xl sm:text-3xl font-black text-brand-cyan">{pkg.price}</span>
                </div>

                <div className="border-t border-white/10 pt-6 mb-8">
                  <ul className="space-y-3">
                    {pkg.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs text-gray-300">
                        <Check className="w-4 h-4 text-brand-cyan mr-2 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href="#quote"
                className={`w-full py-3 rounded-xl font-bold text-xs text-center transition-all ${
                  pkg.highlight
                    ? "bg-brand-orange hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Custom Solution Note */}
        <div className="mt-12 bg-brand-navy border border-white/10 rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <p className="text-gray-300 text-sm">
            Need something custom like mobile apps or enterprise IT support?
          </p>
          <a href="#quote" className="text-brand-orange font-bold text-sm hover:underline mt-1 inline-block">
            Contact AnsoTech for a personalized quotation →
          </a>
        </div>

      </div>
    </section>
  );
};

export default Pricing;