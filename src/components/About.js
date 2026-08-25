import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Award, 
  CheckCircle, 
  Cpu, 
  Zap, 
  Eye, 
  MapPin, 
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  Code2,
  Network,
  Users,
} from 'lucide-react';

const About = () => {
  const highlights = [
    'Custom Web & Enterprise Software Development',
    'Fintech & Microfinance Core Systems',
    'Campus & Enterprise Network Infrastructure',
    'Cloud Hosting & Automated Deployment Pipeline',
  ];

  const coreValues = [
    { 
      title: 'Innovation', 
      desc: 'Deploying modern web frameworks, cloud technology, and advanced networking architectures.' 
    },
    { 
      title: 'Integrity & Security', 
      desc: 'Prioritizing enterprise security, SIEM compliance, and bulletproof database designs.' 
    },
    { 
      title: 'Client-Centricity', 
      desc: 'Building long-term partnerships through continuous post-launch support and optimization.' 
    }
  ];

  const processSteps = [
    { step: '01', title: 'Discovery & Scope', desc: 'Analyzing business bottlenecks, network topologies, and technical specifications.' },
    { step: '02', title: 'Architecture & Design', desc: 'Designing secure database schemas, API contracts, and VLAN network layouts.' },
    { step: '03', title: 'Agile Engineering', desc: 'Building responsive React interfaces, robust REST APIs, and automated SIEM configs.' },
    { step: '04', title: 'Deployment & Support', desc: 'Executing cloud/on-prem deployments with 24/7 continuous network monitoring.' },
  ];

  const teamMembers = [
    {
      name: 'Software Engineering Lead',
      role: 'Full-Stack & Database Architecture',
      spec: 'React, Node.js, Express, PostgreSQL, MongoDB',
      icon: Code2
    },
    {
      name: 'Network Infrastructure Lead',
      role: 'Enterprise Networking & SIEM Operations',
      spec: 'Cisco Routing/Switching, Wazuh SIEM, VMware',
      icon: Network
    }
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-brand-deepNavy border-t border-white/10 overflow-hidden">
      
      {/* Background Animated Glow Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000 delay-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-4 backdrop-blur-md shadow-lg hover:border-brand-cyan/40 transition-colors">
            <Compass className="w-4 h-4 text-brand-orange" />
            <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">
              About AnsoTech Company
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Empowering Businesses with <span className="text-brand-cyan">Smart Digital Solutions</span>
          </h2>

          {/* Location & Established Year Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
            <span className="inline-flex items-center text-xs text-brand-cyan font-medium bg-brand-cyan/10 border border-brand-cyan/20 px-3.5 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 mr-1.5" /> Kampala, Uganda
            </span>
            <span className="inline-flex items-center text-xs text-brand-orange font-medium bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-full">
              <Calendar className="w-3.5 h-3.5 mr-1.5" /> Est. 2022
            </span>
          </div>

          <p className="text-gray-400 text-sm sm:text-base mt-5 leading-relaxed">
            Founded in 2022 in Kampala, Uganda, AnsoTech Company is a premier technology partner specializing in high-performance web applications, core enterprise software, secure network design, and digital automated infrastructure.
          </p>
        </div>

        {/* MISSION & VISION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-brand-cyan/30 p-8 rounded-2xl backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand-cyan hover:shadow-2xl hover:shadow-brand-cyan/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-xl w-fit mb-5 border border-brand-cyan/20 group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-slate-900 transition-all duration-300">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">Our Mission</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              To engineer and deliver reliable, high-speed, and secure enterprise software and network architectures that empower businesses in Uganda and across Africa to operate seamlessly and gain a decisive competitive edge.
            </p>
          </div>

          <div className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-brand-orange/30 p-8 rounded-2xl backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand-orange hover:shadow-2xl hover:shadow-brand-orange/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl w-fit mb-5 border border-brand-orange/20 group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">Our Vision</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              To be East Africa’s most trusted technology driver—renowned for transforming complex business challenges into intuitive, scalable digital products and resilient IT infrastructure.
            </p>
          </div>
        </div>

        {/* BRAND STORY & PILLARS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white leading-snug">
              We Bridge the Gap Between <span className="text-brand-orange">Complex Tech</span> & Real Business Growth
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Since 2022, AnsoTech has grown from a Kampala-based engineering effort into a full-scale digital software and networking provider. We don't just write code—we solve operational bottlenecks. From core microfinance loan tracking platforms and school administration portals to utility incident management systems and secure campus networks, our platforms are built for speed, security, and long-term scalability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, index) => (
                <div 
                  key={index} 
                  className="group flex items-start space-x-3 bg-white/5 p-3.5 rounded-xl border border-white/5 hover:border-brand-cyan/40 hover:bg-white/10 transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-cyan/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-xl w-fit mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-base mb-2 group-hover:text-brand-cyan transition-colors">Security First</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                We implement robust security standards across backends, databases, and network firewalls.
              </p>
            </div>

            <div className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-orange/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl w-fit mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-base mb-2 group-hover:text-brand-orange transition-colors">High Performance</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Optimized React frontends and Node/Express REST APIs for ultra-fast response times.
              </p>
            </div>

            <div className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-orange/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl w-fit mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-base mb-2 group-hover:text-brand-orange transition-colors">Modern Architecture</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Scalable PostgreSQL and MongoDB database architectures designed for enterprise expansion.
              </p>
            </div>

            <div className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-cyan/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-xl w-fit mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-base mb-2 group-hover:text-brand-cyan transition-colors">Dedicated Support</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Direct engineer support, system maintenance plans, and continuous optimization.
              </p>
            </div>
          </div>
        </div>

        {/* OUR ENGINEERING PROCESS */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white">How We Deliver Excellence</h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">A structured engineering process from initial scoping to long-term SIEM monitoring.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((p, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-brand-cyan/40 transition-all duration-300">
                <span className="text-4xl font-black text-white/10 absolute top-3 right-4 group-hover:text-brand-cyan/20 transition-colors">
                  {p.step}
                </span>
                <h4 className="text-white font-bold text-base mb-2 relative z-10">{p.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed relative z-10">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CORE VALUES SECTION */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 backdrop-blur-md">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="w-5 h-5 text-brand-orange" />
            <h3 className="text-xl font-bold text-white text-center">Our Core Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div 
                key={idx} 
                className="group bg-slate-900/60 border border-white/5 hover:border-brand-cyan/30 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h4 className="text-brand-orange group-hover:text-brand-cyan font-bold text-base mb-2 transition-colors">{val.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LEADERSHIP / ENGINEERING TEAM */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full mb-3">
              <Users className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">Expertise Driving AnsoTech</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Engineering Leadership</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl flex items-start space-x-4 hover:border-brand-cyan/40 transition-all duration-300">
                <div className="p-4 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan rounded-xl shrink-0">
                  <member.icon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">{member.name}</h4>
                  <p className="text-brand-orange text-xs font-semibold mt-0.5">{member.role}</p>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <span className="text-gray-300 font-semibold">Specialization:</span> {member.spec}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION BANNER */}
        <div className="group bg-gradient-to-r from-brand-cyan/10 via-white/5 to-brand-orange/10 border border-white/10 hover:border-brand-orange/40 rounded-2xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-500 shadow-xl">
          <div className="text-left max-w-xl">
            <h4 className="text-white font-bold text-lg sm:text-xl">Ready to transform your business IT infrastructure?</h4>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Let’s discuss your web, software, or network requirements today.</p>
          </div>
          <a
            href="#contact"
            className="shrink-0 bg-brand-orange hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 flex items-center space-x-2 text-xs sm:text-sm tracking-wide"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;