import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Phone, MapPin } from 'lucide-react';

// Firebase imports
import { db } from './firebase'; // Adjust path if firebase.js is in a different directory
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    systemType: 'Microfinance & Loan System',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      // Save form submission to Firestore 'contacts' collection
      await addDoc(collection(db, 'contacts'), {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || 'N/A',
        systemType: formData.systemType,
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
        status: 'new' // Useful for admin dashboard filtering
      });

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        systemType: 'Microfinance & Loan System',
        message: ''
      });
    } catch (err) {
      console.error("Firestore Error Code:", err.code);
      console.error("Firestore Error Message:", err.message);
      
      setStatus('error');

      // Detailed error messages based on Firebase error codes
      if (err.code === 'permission-denied') {
        setErrorMessage('Submission rejected by database security rules. Please check Firestore permissions.');
      } else if (err.code === 'unavailable') {
        setErrorMessage('Network connection lost. Please verify your internet connection and try again.');
      } else {
        setErrorMessage(`Failed to send message: ${err.message || 'Unknown error occurred.'}`);
      }
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-navy border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-brand-cyan tracking-wider uppercase mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Request a System & Quote
          </h2>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            Have a project in mind or need a custom enterprise solution? Fill out the form below or visit us at our Nsambya office.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Details & Google Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-brand-deepNavy/80 border border-white/10 p-8 rounded-2xl space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Reach out directly for urgent consultations or custom IT infrastructure deployments.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-brand-cyan">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Us</h4>
                    <p className="text-white text-sm font-medium mt-0.5">info@ansotech.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-brand-orange">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call / WhatsApp</h4>
                    <p className="text-white text-sm font-medium mt-0.5">+256 726 627 892</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-brand-cyan">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</h4>
                    <p className="text-white text-sm font-medium mt-0.5">Nsambya, Kampala, Uganda</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-brand-deepNavy/80 border border-white/10 p-2 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="AnsoTech Nsambya Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.027003050967!2d32.5800!3d0.3000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb816a75f0a3%3A0x286395fb42588c2f!2sNsambya%2C%20Kampala!5e0!3m2!1sen!2sug!4v1700000000000!5m2!1sen!2sug"
                width="100%"
                height="240"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-brand-deepNavy/80 border border-white/10 p-8 sm:p-10 rounded-2xl">
            
            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Thank you for reaching out to AnsoTech. We have received your request and will respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-3 text-red-400 text-xs">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g.ansotechcompany"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. info@ansotech.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+256 726 627 892"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>

                  {/* System Interest Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      System Interested In
                    </label>
                    <select
                      name="systemType"
                      value={formData.systemType}
                      onChange={handleChange}
                      className="w-full bg-brand-navy border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    >
                      <option value="Microfinance & Loan System">Microfinance & Loan System</option>
                      <option value="E-Commerce & Inventory Platform">E-Commerce & Inventory Platform</option>
                      <option value="School Management System">School Management System</option>
                      <option value="Hospital & EHR System">Hospital & EHR System</option>
                      <option value="Network Infrastructure & SIEM">Network Infrastructure & SIEM</option>
                      <option value="Custom System">Other / Custom Software</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Project Details / Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements, timeline, and goals..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;