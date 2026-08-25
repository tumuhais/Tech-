import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Smartphone, 
  CheckCircle2, 
  Terminal,
  PlayCircle
} from 'lucide-react';

const AnimatedCounter = ({ targetValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const numericMatch = targetValue.match(/[\d.]+/);
  const targetNumber = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const isFloat = targetValue.includes('.');
  const prefix = targetValue.match(/^[^\d]+/)?.[0] || '';
  const suffix = targetValue.match(/[^\d.]+$/)?.[0] || '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || targetNumber === 0) return;

    let startTime = null;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = easeOutProgress * targetNumber;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, targetNumber, duration]);

  const displayValue = isFloat ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref}>
      {prefix}{hasStarted ? displayValue : 0}{suffix}
    </span>
  );
};

const Hero = () => {
  const stats = [
    { label: "Projects Delivered", value: "50+" },
    { label: "Network Uptime", value: "99.9%" },
    { label: "Client Satisfaction", value: "100%" },
    { label: "Security Monitoring", value: "24/7" },
  ];

  const techStack = [
    "React.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Cisco Networks", "Wazuh SIEM", "VMware"
  ];

  return (
    <section id="home" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-brand-navy overflow-hidden">
      
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url('/ansotech-building.png')` }}
      />

      {/* Cyber Grid Overlay & Glow Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO MAIN SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          
          {/* Left Column: Core Messaging */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2.5 bg-white/5 border border-brand-cyan/30 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
              </span>
              <span className="text-xs font-bold text-gray-200 tracking-wider uppercase">
                Leading Software & IT Agency in Uganda
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              WE BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-orange">SMART DIGITAL SOLUTIONS</span> THAT GROW YOUR BUSINESS
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl">
              AnsoTech engineers high-performance web applications, custom enterprise platforms, microfinance systems, and secure Cisco & Wazuh network infrastructure.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contact"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 flex items-center justify-center space-x-3 text-sm tracking-wide group"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              <a
                href="#portfolio"
                className="bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm tracking-wide"
              >
                <PlayCircle className="w-5 h-5 text-brand-cyan" />
                <span>EXPLORE SYSTEMS</span>
              </a>
            </div>

            {/* Tech Pills */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mr-2">Core Tech:</span>
                {techStack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="bg-slate-900/80 border border-white/10 hover:border-brand-cyan/60 text-gray-300 text-xs px-3 py-1 rounded-lg transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dashboard Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-2xl border border-white/15 bg-slate-900/90 p-2.5 backdrop-blur-2xl shadow-2xl hover:border-brand-cyan/50 transition-all duration-500 group">
              <div className="relative rounded-xl overflow-hidden bg-brand-navy">
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 flex items-center">
                    <Terminal className="w-3 h-3 text-brand-cyan mr-1.5" /> ansotech-portal-v2.0
                  </span>
                  <div className="w-8"></div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
                  alt="Enterprise Dashboard System"
                  className="w-full h-[360px] object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute bottom-4 left-4 bg-slate-950/90 border border-emerald-500/30 p-3 rounded-xl backdrop-blur-md flex items-center space-x-3 shadow-2xl">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">SIEM & Core Network Active</p>
                    <p className="text-[10px] text-gray-400">Continuous Log Monitoring & Routing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/80 border border-white/15 rounded-2xl backdrop-blur-xl mb-12 text-center hover:border-brand-cyan/40 transition-all duration-300">
          {stats.map((stat, index) => (
            <div key={index} className="p-2">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <AnimatedCounter targetValue={stat.value} duration={2200} />
              </p>
              <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          <div className="flex items-center space-x-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10 hover:border-brand-cyan/50 transition-all duration-300 backdrop-blur-md">
            <div className="p-3.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Enterprise Security</h4>
              <p className="text-gray-400 text-xs mt-0.5">Wazuh SIEM & Cisco Security ACLs</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10 hover:border-brand-orange/50 transition-all duration-300 backdrop-blur-md">
            <div className="p-3.5 rounded-xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Responsive Design</h4>
              <p className="text-gray-400 text-xs mt-0.5">Cross-device Web & Mobile Interfaces</p>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-1 flex items-center space-x-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10 hover:border-brand-cyan/50 transition-all duration-300 backdrop-blur-md">
            <div className="p-3.5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Custom Architectures</h4>
              <p className="text-gray-400 text-xs mt-0.5">React, Express REST APIs & PostgreSQL</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;