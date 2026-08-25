import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import ContactQuote from './components/ContactQuote';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Dashboard from './components/Dashboard';
import About from './components/About';

function App() {
  return (
    <div className="bg-brand-navy min-h-screen text-white font-sans antialiased selection:bg-brand-orange selection:text-white">
      <Navbar />
      <Hero />
       <About />
      <Services />
      <Portfolio />
       <Dashboard />
      <Pricing />
      <ContactQuote />
      <Footer />
      <WhatsAppButton />
     
    </div>
  );
}

export default App;