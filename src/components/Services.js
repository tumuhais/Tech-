import React from 'react';
import { 
  Globe, 
  ShoppingCart, 
  Code, 
  Smartphone, 
  ShieldAlert, 
  Network, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: "Website & Web Portal Development",
    description: "Responsive, high-performance web applications and company portals optimized for speed, SEO, and conversions.",
    badge: "Popular",
    tags: ["React", "Node.js", "Express", "Tailwind CSS"],
    highlights: ["Custom Portal Dashboards", "SEO & Speed Optimization", "Dynamic Category Filters"]
  },
  {
    icon: Code,
    title: "Custom Enterprise Software",
    description: "Tailored business management platforms, microfinance tracking software, and incident reporting tools built around your workflows.",
    badge: "Core Expertise",
    tags: ["PostgreSQL", "MongoDB", "REST APIs", "JWT Auth"],
    highlights: ["Microfinance & Loan Systems", "Incident Management APIs", "Role-Based Access Control"]
  },
  {
    icon: Network,
    title: "Campus & Enterprise Networking",
    description: "End-to-end network design, VLAN segmentation, subinterface routing, and secure wireless infrastructure implementation.",
    badge: "Infrastructure",
    tags: ["Cisco IOS", "VLAN / STP", "LACP / PAgP", "DHCP Snooping"],
    highlights: ["Multi-Building VLAN Setup", "Inter-VLAN & Subinterfaces", "VoIP & Wireless ACLs"]
  },
  {
    icon: ShieldAlert,
    title: "SIEM & Security Operations",
    description: "Deployment of Wazuh SIEM security platforms, centralized log monitoring, agent configuration, and vulnerability analysis.",
    badge: "Cybersecurity",
    tags: ["Wazuh SIEM", "Ubuntu Server", "Log Security", "Active Response"],
    highlights: ["Real-Time Threat Monitoring", "Endpoint Agent Deployment", "Regulatory Compliance Logs"]
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Scalable online stores with dynamic inventory catalogs, cart management, and payment processing.",
    badge: "High ROI",
    tags: ["Mongoose", "Context API", "Payment Gateways", "Order Management"],
    highlights: ["Cart State Management", "Secure Checkout Flow", "Product Catalog Admin"]
  },
  {
    icon: Smartphone,
    title: "Database & Cloud IT Operations",
    description: "Database administration, maintenance automation, virtual machine management, and cloud backup setup.",
    badge: "Managed Services",
    tags: ["MS SQL Server", "VMware Workstation", "Automated Backups", "Linux Admin"],
    highlights: ["Automated SQL Maintenance", "VMware & Ubuntu VM Setup", "Disaster Recovery Backup"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-brand-deepNavy relative overflow-hidden border-t border-white/10">
      
      {/* Background Lighting Accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">
              What We Do
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Comprehensive <span className="text-brand-cyan">Digital & Network Solutions</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
            From modern web applications and database design to enterprise networking and SIEM security monitoring, we engineer reliable IT infrastructure for growth.
          </p>
        </div>

        {/* SERVICES GRID (3x2 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/70 border border-white/10 rounded-2xl p-7 hover:border-brand-cyan/50 hover:bg-slate-900 transition-all duration-300 group flex flex-col justify-between hover:shadow-xl hover:shadow-brand-cyan/10 hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-13 h-13 p-3.5 bg-brand-cyan/10 rounded-xl flex items-center justify-center border border-brand-cyan/20 group-hover:bg-brand-cyan group-hover:text-slate-900 transition-all duration-300 text-brand-cyan">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Sub-Feature Highlights */}
                  <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                        <span className="text-gray-300 text-xs font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tech Stack Tags & CTA Button */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-medium text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center text-xs font-bold text-white group-hover:text-brand-orange transition-colors"
                  >
                    <span>Inquire Service</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-300 text-brand-orange" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;