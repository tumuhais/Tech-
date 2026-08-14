import React from 'react';
import { ArrowRight, ShieldCheck, Cpu, Smartphone, Users, Code, Globe } from 'lucide-react';

const Hero = () => {
  // Staff / Leadership team members
  const staffMembers = [
    {
      name: "Anselm",
      role: "Lead Software & Systems Engineer",
      image: "/staff/anselm.jpg",
      bio: "Specialist in Full-Stack Web Applications & Network Infrastructure.",
      github: "https://github.com",
      portfolio: "#"
    },
    {
      name: "Tech Lead - Systems",
      role: "Network & Security Specialist",
      image: "/staff/team1.jpg",
      bio: "Expert in secure campus routing, firewalls, and cloud deployments.",
      github: "https://github.com",
      portfolio: "#"
    },
    {
      name: "Frontend Specialist",
      role: "UI/UX & Web Developer",
      image: "/staff/team2.jpg",
      bio: "Crafting fast, responsive React interfaces & digital products.",
      github: "https://github.com",
      portfolio: "#"
    }
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32 bg-brand-navy overflow-hidden">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-4 sm:right-10 w-64 h-64 sm:w-80 sm:h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold text-gray-300 tracking-wider uppercase">
              Leading Tech & Digital Agency in Uganda
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            WE BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-orange">SMART DIGITAL SOLUTIONS</span> THAT GROW YOUR BUSINESS
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto font-normal leading-relaxed px-2">
            AnsoTech Company delivers modern websites, enterprise software, mobile applications, and secure network infrastructure tailored to scale your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href="#quote"
              className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center space-x-2 text-sm sm:text-base active:scale-95"
            >
              <span>GET A QUOTE</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border border-white/10 transition-all duration-200 text-sm sm:text-base text-center"
            >
              VIEW OUR SERVICES
            </a>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 sm:mt-16 pt-8 border-t border-white/10 text-left">
            <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-brand-cyan flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold text-sm">Secure & Reliable</h4>
                <p className="text-gray-400 text-xs">Enterprise-grade network security</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-brand-orange flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold text-sm">100% Responsive</h4>
                <p className="text-gray-400 text-xs">Optimized across all screen sizes</p>
              </div>
            </div>
            <div className="sm:col-span-2 lg:col-span-1 flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-brand-cyan flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold text-sm">Modern Tech Stack</h4>
                <p className="text-gray-400 text-xs">React, Node, Express & PostgreSQL</p>
              </div>
            </div>
          </div>

          {/* STAFF & LEADERSHIP PREVIEW SECTION */}
          <div className="mt-16 sm:mt-24 pt-10 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 text-left">
              <div>
                <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
                  <Users className="w-4 h-4" />
                  <span>The Talent Behind Our Success</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Meet Our Technical Team
                </h3>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm max-w-xs mt-2 sm:mt-0">
                Experienced software developers, UI designers, and systems engineers dedicated to your growth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {staffMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-orange/40 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-14 h-14 rounded-xl object-cover border-2 border-brand-orange/30 group-hover:border-brand-orange transition-colors"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200";
                        }}
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-brand-navy rounded-full" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base group-hover:text-brand-orange transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-brand-cyan text-xs font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex items-center space-x-3 border-t border-white/5 pt-3">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
                      <Code className="w-4 h-4" />
                    </a>
                    <a href={member.portfolio} className="text-gray-400 hover:text-white transition-colors" title="Portfolio">
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;