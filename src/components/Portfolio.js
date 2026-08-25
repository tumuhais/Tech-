import React, { useState } from 'react';
import { ExternalLink, Code, Sparkles, Layers } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Anso Microfinance & Loan Management",
    category: "Custom Systems",
    description: "Core financial platform equipped with borrower profiles, automated interest calculations, loan disbursement tracking, and repayment scheduling.",
    tech: ["React", "Express API", "PostgreSQL", "JWT Auth", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    featured: true,
    badge: "Fintech"
  },
  {
    id: 2,
    title: "Campus Network Architecture & Wazuh SIEM",
    category: "Network & Security",
    description: "Multi-building university network architecture featuring VLAN segmentation, subinterfaces, STP, DHCP snooping, and live Wazuh SIEM log monitoring.",
    tech: ["Cisco IOS", "Wazuh SIEM", "VMware", "Ubuntu Server", "ACLs"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    featured: true,
    badge: "Security"
  },
  {
    id: 3,
    title: "Smart Utility Incident & Burst Reporting Portal",
    category: "Custom Systems",
    description: "Real-time incident management REST API & portal for public utility networks to log infrastructure pipe bursts, escalate tickets, and track repair workflows.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "REST API"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    featured: false,
    badge: "Utilities"
  },
  {
    id: 4,
    title: "School Management & Parent Portal",
    category: "Custom Systems",
    description: "Educational management platform handling student enrollment, tuition tracking, automated report card generation, and SMS notifications.",
    tech: ["React", "Node.js", "PostgreSQL", "Express API"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    featured: false,
    badge: "Enterprise"
  },
  {
    id: 5,
    title: "E-Commerce Catalog & Cart Platform",
    category: "Web & E-Commerce",
    description: "Full-stack online store with dynamic category filters, product catalog management, React Context API cart state handling, and MongoDB database.",
    tech: ["React", "Context API", "Node.js", "MongoDB", "Mongoose"],
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    featured: false,
    badge: "E-Commerce"
  },
  {
    id: 6,
    title: "Enterprise Switch Infrastructure & EtherChannel",
    category: "Network & Security",
    description: "High-availability switch and router configuration with redundant trunk links, PortFast security, LACP/PAgP EtherChannel, and DHCP pools.",
    tech: ["Cisco Switches", "VLANs", "PVST+", "PortFast", "LACP"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    featured: false,
    badge: "Networking"
  }
];

const categories = ["All", "Web & E-Commerce", "Custom Systems", "Network & Security"];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-brand-deepNavy border-t border-white/10 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-4 backdrop-blur-md shadow-md">
            <Code className="w-4 h-4 text-brand-orange animate-pulse" />
            <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">
              Proven Capabilities & Projects
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Featured Systems & <span className="text-brand-cyan">Software Portfolio</span>
          </h2>
          
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
            Explore our custom full-stack web applications, feature-packed e-commerce platforms, core financial software, and enterprise network security deployments.
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-12 flex-wrap gap-y-2">
          {categories.map((cat) => {
            const count = cat === "All" ? projects.length : projects.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-2 ${
                  filter === cat
                    ? "bg-brand-orange text-white shadow-lg shadow-orange-500/25 scale-105"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  filter === cat ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* PORTFOLIO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-cyan/50 hover:shadow-2xl hover:shadow-brand-cyan/10 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Category Badge Floating on Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-slate-950/80 backdrop-blur-md border border-white/15 text-brand-cyan text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {project.badge}
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-brand-orange/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <span className="text-[11px] font-bold text-brand-cyan tracking-wider uppercase mb-1.5 block">
                    {project.category}
                  </span>
                  
                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-brand-orange transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tech.map((t, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono font-medium bg-white/5 text-gray-300 px-2.5 py-1 rounded-md border border-white/10 group-hover:border-brand-cyan/30 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3.5 bg-white/5 border-t border-white/5 flex justify-between items-center group-hover:bg-white/10 transition-colors">
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3 text-brand-cyan" /> Enterprise Ready
                </span>
                <a
                  href="#contact"
                  className="text-xs font-bold text-brand-cyan group-hover:text-brand-orange flex items-center space-x-1 transition-colors"
                >
                  <span>Request Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
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