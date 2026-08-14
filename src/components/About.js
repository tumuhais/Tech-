import React from 'react';
import { ShieldCheck, Target, Award,  CheckCircle, Cpu, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    'Custom Web & Enterprise Software Development',
    'Fintech & Microfinance Core Systems',
    'Campus & Enterprise Network Infrastructure',
    'Cloud Hosting & Automated Deployment Pipeline',
  ];

  const stats = [
    { value: '99.9%', label: 'System Uptime' },
    { value: '50+', label: 'Projects Deployed' },
    { value: '24/7', label: 'Technical Support' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-brand-deepNavy border-t border-white/10 overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-4">
            <Target className="w-4 h-4 text-brand-orange" />
            <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">
              About AnsoTech Company
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Empowering Businesses with <span className="text-brand-cyan">Smart Digital Solutions</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed">
            Based in Kampala, Uganda, AnsoTech Company is a premier technology partner specializing in high-performance web applications, enterprise software, network design, and digital outreach automation.
          </p>
        </div>

        {/* TWO-COLUMN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left Column: Brand Story & Mission */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white leading-snug">
              We Bridge the Gap Between <span className="text-brand-orange">Complex Tech</span> & Real Business Growth
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              At AnsoTech, we don't just write code—we engineer tailored systems built to solve operational bottlenecks. From core microfinance loan tracking systems and school portals to utility incident management platforms and secure campus networks, our systems are built for speed, security, and scalability.
            </p>

            {/* Core Capabilities Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white/5 p-3 rounded-lg border border-white/5">
                  <CheckCircle className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Mission & Vision Quote */}
            <div className="border-l-4 border-brand-orange bg-white/5 p-4 rounded-r-xl">
              <p className="text-white text-xs font-semibold italic">
                "Our mission is to deliver reliable, enterprise-grade software and network architecture that gives African businesses a decisive competitive edge."
              </p>
              <span className="text-brand-cyan text-[11px] font-bold block mt-2">
                — Leadership Team, AnsoTech Uganda
              </span>
            </div>
          </div>

          {/* Right Column: Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-cyan/40 transition-all duration-300">
              <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-xl w-fit mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-base mb-2">Security First</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                We implement robust security standards across backends, databases, and network firewalls.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-orange/40 transition-all duration-300">
              <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl w-fit mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-base mb-2">High Performance</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Optimized React frontends and Node/Express REST APIs for ultra-fast response times.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-orange/40 transition-all duration-300">
              <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl w-fit mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-base mb-2">Modern Architecture</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Scalable PostgreSQL and MongoDB database architectures designed for expansion.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-cyan/40 transition-all duration-300">
              <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-xl w-fit mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-base mb-2">Dedicated Support</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Direct engineer support, maintenance plans, and continuous system optimization.
              </p>
            </div>

          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="p-2">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-orange mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;