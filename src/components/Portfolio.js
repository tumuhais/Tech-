import React, { useState } from 'react';
import { ExternalLink, Code } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce & Inventory Platform",
    category: "Web & E-Commerce",
    description: "Full-featured online store with dynamic product catalog filters, local storage persistence, and payment API integrations.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "School Management System",
    category: "Custom Systems",
    description: "All-in-one educational portal managing student registrations, fee tracking, report card generation, and automated notifications.",
    tech: ["React", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Anso Microfinance & Loan Management",
    category: "Custom Systems",
    description: "Financial system with automated interest calculators, borrower history logs, repayment schedules, and transaction reports.",
    tech: ["React", "Express", "PostgreSQL", "Tailwind"],
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Utility Incident Reporting Portal",
    category: "Custom Systems",
    description: "Enterprise incident management system for logging infrastructure issues, real-time status tracking, and automated ticket escalation.",
    tech: ["React", "Express", "PostgreSQL", "REST API"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Secure Campus Network & SIEM Monitoring",
    category: "Network & Security",
    description: "Multi-building network architecture with VLAN segmentation, Spanning Tree Protocol (STP), and live Wazuh security monitoring.",
    tech: ["Cisco Routing", "Wazuh SIEM", "VMware", "Ubuntu"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Hospital & Pharmacy EHR System",
    category: "Custom Systems",
    description: "EHR platform handling patient queuing, pharmacy inventory tracking, expiry date alerts, and point-of-sale billing.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
  }
];

const categories = ["All", "Web & E-Commerce", "Custom Systems", "Network & Security"];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-brand-navy border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-4">
            <Code className="w-4 h-4 text-brand-orange" />
            <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">
              Proven Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Featured Systems & Software
          </h2>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            Explore full-stack web applications, custom enterprise platforms, and secure network deployments designed for modern operations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-12 flex-wrap gap-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                filter === cat
                  ? "bg-brand-orange text-white shadow-lg shadow-orange-500/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-brand-deepNavy/80 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-orange/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-48 overflow-hidden bg-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deepNavy/90 via-brand-deepNavy/20 to-transparent" />
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <span className="text-xs font-semibold text-brand-cyan tracking-wider uppercase mb-2 block">
                    {project.category}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tech.map((t, idx) => (
                      <span 
                        key={idx} 
                        className="text-[11px] font-mono font-medium bg-white/5 text-gray-300 px-2.5 py-1 rounded-md border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex justify-between items-center">
                <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                  Enterprise Grade
                </span>
                <a
                  href="#quote"
                  className="text-xs font-bold text-brand-cyan group-hover:text-brand-orange flex items-center space-x-1 transition-colors"
                >
                  <span>Request System</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;