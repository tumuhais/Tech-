import React, { useState } from 'react';

export default function Dashboard() {
  // State for Lead Directory
  const [leadsData, setLeadsData] = useState([
    { id: "LEAD-001", clientName: "David Mukasa", companyName: "QuickCredit Microfinance", sector: "microfinance", email: "david@quickcredit.co.ug", phone: "256777123456" },
    { id: "LEAD-002", clientName: "Sarah Namubiru", companyName: "St. Jude Academy", sector: "school", email: "director@stjude.ac.ug", phone: "256701987654" },
    { id: "LEAD-003", clientName: "Dr. Okello", companyName: "Kampala Care Pharmacy", sector: "pharmacy", email: "okello@carepharmacy.ug", phone: "256726112233" }
  ]);

  // State for Modal and Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    sector: 'microfinance',
    email: '',
    phone: ''
  });

  // Calculate Metrics Dynamic Counters
  const totalLeads = leadsData.length;
  const microCount = leadsData.filter(l => l.sector === 'microfinance').length;
  const schoolCount = leadsData.filter(l => l.sector === 'school').length;
  const pharmacyCount = leadsData.filter(l => l.sector === 'pharmacy').length;

  // Handle Form Inputs
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Add New Lead
  const handleAddLead = (e) => {
    e.preventDefault();
    const newLead = {
      id: `LEAD-00${leadsData.length + 1}`,
      ...formData
    };
    setLeadsData([...leadsData, newLead]);
    setIsModalOpen(false);
    setFormData({ clientName: '', companyName: '', sector: 'microfinance', email: '', phone: '' });
  };

  // Send Email API Handler
  const sendEmail = async (leadId) => {
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId })
      });
      const res = await response.json();
      if (res.success) {
        alert('✅ Success: ' + res.message);
      } else {
        alert('❌ Error sending email: ' + (res.error || res.message));
      }
    } catch (err) {
      alert('❌ Server offline! Make sure "node server.js" is running in your terminal.');
    }
  };

  // Generate Quotation PDF Handler
  const createQuotationForLead = async (leadId) => {
    const lead = leadsData.find(l => l.id === leadId);
    if (!lead) return;

    const docPayload = {
      type: 'QUOTATION',
      clientName: lead.clientName,
      companyName: lead.companyName,
      email: lead.email,
      docNumber: `AT-QUO-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [
        { description: `AnsoTech ${lead.sector.toUpperCase()} Software License & Setup`, quantity: 1, unitPrice: 1500000 },
        { description: 'Cloud Backup & 3-Month Maintenance Package', quantity: 1, unitPrice: 300000 }
      ]
    };

    try {
      const response = await fetch('http://localhost:5000/api/generate-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(docPayload)
      });

      const result = await response.json();
      if (result.success) {
        alert(`✅ PDF Generated Successfully!\nFile saved on server at:\n${result.filePath}`);
      } else {
        alert('❌ Failed to generate PDF: ' + result.error);
      }
    } catch (err) {
      alert('❌ Express Server offline! Make sure "node server.js" is running in your terminal.');
    }
  };

  // Render Badge helper
  const renderSectorBadge = (sector) => {
    switch (sector) {
      case 'microfinance':
        return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-xs font-semibold">Microfinance</span>;
      case 'school':
        return <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-semibold">School</span>;
      case 'pharmacy':
        return <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-semibold">Pharmacy</span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-md text-xs font-semibold">{sector}</span>;
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      
      {/* TOP NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white font-bold text-xl">AT</div>
            <div>
              <h1 className="font-bold text-lg leading-tight">AnsoTech Systems</h1>
              <p className="text-xs text-slate-400">Outreach & Document Operations Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i> Add New Lead
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Leads</div>
            <div className="text-3xl font-extrabold text-white mt-2">{totalLeads}</div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Microfinance</div>
            <div className="text-3xl font-extrabold text-blue-400 mt-2">{microCount}</div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Schools</div>
            <div className="text-3xl font-extrabold text-emerald-400 mt-2">{schoolCount}</div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pharmacies</div>
            <div className="text-3xl font-extrabold text-purple-400 mt-2">{pharmacyCount}</div>
          </div>
        </div>

        {/* LEADS TABLE SECTION */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/60 flex justify-between items-center bg-slate-800/80">
            <h2 className="font-bold text-slate-200 flex items-center gap-2">
              <i className="fa-solid fa-address-book text-blue-400"></i> Active Lead Directory & Automation
            </h2>
            <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full font-medium">Server Status: Live</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/60 text-xs uppercase text-slate-400 font-semibold border-b border-slate-700">
                <tr>
                  <th className="px-6 py-3">Client & Company</th>
                  <th className="px-6 py-3">Sector</th>
                  <th className="px-6 py-3">Contact Details</th>
                  <th className="px-6 py-3 text-center">Actions & PDF Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {leadsData.map((lead) => {
                  const pitchText = encodeURIComponent(`Hello ${lead.clientName}, I am Anselm from AnsoTech Company. We design software systems tailored for ${lead.companyName}. Would you be available for a brief demo?`);
                  const waLink = `https://wa.me/${lead.phone}?text=${pitchText}`;

                  return (
                    <tr key={lead.id} className="hover:bg-slate-800/30 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{lead.companyName}</div>
                        <div className="text-xs text-slate-400">{lead.clientName}</div>
                      </td>
                      <td className="px-6 py-4">{renderSectorBadge(lead.sector)}</td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-300">
                        <div>✉️ {lead.email}</div>
                        <div>📞 +{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => sendEmail(lead.id)} 
                            className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                          >
                            <i className="fa-solid fa-paper-plane"></i> Email
                          </button>
                          <a 
                            href={waLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                          >
                            <i className="fa-brands fa-whatsapp"></i> WhatsApp
                          </a>
                          <button 
                            onClick={() => createQuotationForLead(lead.id)} 
                            className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                          >
                            <i className="fa-solid fa-file-pdf"></i> Quotation
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ADD LEAD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="font-bold text-lg text-white">Add Target Lead</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-xl">&times;</button>
            </div>
            <form onSubmit={handleAddLead} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Contact Person</label>
                <input 
                  type="text" 
                  id="clientName" 
                  value={formData.clientName} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Company Name</label>
                <input 
                  type="text" 
                  id="companyName" 
                  value={formData.companyName} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Sector</label>
                <select 
                  id="sector" 
                  value={formData.sector} 
                  onChange={handleInputChange} 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="microfinance">Microfinance / Lending</option>
                  <option value="school">School / Institution</option>
                  <option value="pharmacy">Pharmacy / Retail POS</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Phone Number (With Country Code)</label>
                <input 
                  type="text" 
                  id="phone" 
                  placeholder="256777123456" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-500 text-white"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}