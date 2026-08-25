import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Code, 
  Globe, 
  Plus, 
  Trash2, 
  Send, 
  FileText, 
  Loader2, 
  Search, 
  Lock, 
  LogOut, 
  MessageSquare, 
  CheckCircle, 
  Clock 
} from 'lucide-react';

// Firebase Firestore & Auth imports
import { db, auth } from './firebase'; 
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc,
  deleteDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';

export default function Dashboard() {
  // --- Auth States ---
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // --- Dashboard States ---
  const [staffMembers, setStaffMembers] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Action state tracking
  const [actionLoading, setActionLoading] = useState({});

  // Modal and Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    sector: 'microfinance',
    email: '',
    phone: '',
    message: '',
    status: 'Pending'
  });

  // --- Auth Listener ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- Real-time Firestore Listeners (Run only when authenticated) ---
  useEffect(() => {
    if (!currentUser) return;

    setIsLoading(true);
    // Sync with 'contacts' collection
    const requestsRef = collection(db, 'contacts');
    const q = query(requestsRef, orderBy('createdAt', 'desc'));

    const unsubscribeRequests = onSnapshot(q, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequestsData(requests);
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore requests error:", error);
      setIsLoading(false);
    });

    const staffRef = collection(db, 'staff');
    const unsubscribeStaff = onSnapshot(staffRef, (snapshot) => {
      const staff = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStaffMembers(staff);
    }, (error) => {
      console.error("Firestore staff error:", error);
    });

    return () => {
      unsubscribeRequests();
      unsubscribeStaff();
    };
  }, [currentUser]);

  // Admin Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      setAdminEmail('');
      setAdminPassword('');
    } catch (err) {
      console.error("Login failed:", err);
      setLoginError("Invalid credentials or unauthorized account.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Form Field Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Add New Request Manually
  const handleAddRequest = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: serverTimestamp()
      });

      setIsModalOpen(false);
      setFormData({ clientName: '', companyName: '', sector: 'microfinance', email: '', phone: '', message: '', status: 'Pending' });
    } catch (err) {
      console.error("Error adding request to Firestore:", err);
      alert("❌ Failed to save request to database.");
    }
  };

  // Update Status Handler
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const requestRef = doc(db, 'contacts', requestId);
      await updateDoc(requestRef, { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("❌ Failed to update request status.");
    }
  };

  // Delete Request Handler
  const handleDeleteRequest = async (requestId) => {
    if (!window.confirm("Are you sure you want to remove this client request?")) return;

    try {
      await deleteDoc(doc(db, 'contacts', requestId));
    } catch (err) {
      console.error("Error deleting request from Firestore:", err);
      alert("❌ Failed to delete request.");
    }
  };

  // Send Email Handler
  const sendEmail = async (requestId) => {
    setActionLoading((prev) => ({ ...prev, [`email-${requestId}`]: true }));
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId })
      });
      const res = await response.json();
      if (res.success) {
        alert('✅ Success: ' + res.message);
      } else {
        alert('❌ Error sending email: ' + (res.error || res.message));
      }
    } catch (err) {
      alert('❌ Server offline! Make sure "node server.js" is running in your terminal.');
    } finally {
      setActionLoading((prev) => ({ ...prev, [`email-${requestId}`]: false }));
    }
  };

  // Generate Quotation PDF Handler
  const createQuotationForRequest = async (requestId) => {
    const item = requestsData.find((r) => r.id === requestId);
    if (!item) return;

    setActionLoading((prev) => ({ ...prev, [`pdf-${requestId}`]: true }));

    const docPayload = {
      type: 'QUOTATION',
      clientName: item.clientName,
      companyName: item.companyName,
      email: item.email,
      docNumber: `AT-QUO-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [
        { description: `AnsoTech ${item.sector ? item.sector.toUpperCase() : 'SOFTWARE'} System Implementation`, quantity: 1, unitPrice: 1500000 },
        { description: 'Cloud Integration & Support License', quantity: 1, unitPrice: 300000 }
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
    } finally {
      setActionLoading((prev) => ({ ...prev, [`pdf-${requestId}`]: false }));
    }
  };

  // Dynamic Analytics Calculation
  const dynamicMetrics = useMemo(() => {
    return requestsData.reduce(
      (acc, req) => {
        acc.total += 1;
        if (req.status === 'Pending') acc.pending += 1;
        if (req.status === 'Completed') acc.completed += 1;
        if (req.sector) {
          acc[req.sector] = (acc[req.sector] || 0) + 1;
        }
        return acc;
      },
      { total: 0, pending: 0, completed: 0, microfinance: 0, school: 0, pharmacy: 0 }
    );
  }, [requestsData]);

  // Dynamic Filtering based on Search Query, Sector, and Status
  const filteredRequests = useMemo(() => {
    return requestsData.filter((item) => {
      const matchesSearch =
        (item.clientName && item.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.companyName && item.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSector =
        selectedSectorFilter === 'all' || item.sector === selectedSectorFilter;

      const matchesStatus =
        selectedStatusFilter === 'all' || item.status === selectedStatusFilter;

      return matchesSearch && matchesSector && matchesStatus;
    });
  }, [requestsData, searchQuery, selectedSectorFilter, selectedStatusFilter]);

  // Sector Badge Renderer
  const renderSectorBadge = (sector) => {
    switch (sector) {
      case 'microfinance':
        return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-xs font-semibold">Microfinance</span>;
      case 'school':
        return <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-semibold">School</span>;
      case 'pharmacy':
        return <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-semibold">Pharmacy</span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-md text-xs font-semibold">{sector || 'General'}</span>;
    }
  };

  // Status Badge Renderer
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Completed</span>;
      case 'In Progress':
        return <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3"/> In Progress</span>;
      default:
        return <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3"/> Pending</span>;
    }
  };

  // 1. Initial Loading Screen
  if (authLoading) {
    return (
      <div className="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // 2. Administrator Login View
  if (!currentUser) {
    return (
      <div className="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-blue-600/20 text-blue-400 p-3 rounded-xl w-12 h-12 mx-auto flex items-center justify-center border border-blue-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Administrator Login</h2>
            <p className="text-xs text-slate-400">Authenticate to view incoming client requests</p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Admin Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@ansotech.com"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {isLoggingIn ? 'Authenticating...' : 'Sign In as Administrator'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Authenticated Client Requests Dashboard View
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      {/* TOP NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2.5 rounded-lg text-white flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">AnsoTech Systems</h1>
              <p className="text-xs text-slate-400">Client Service Requests Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Log Client Request
            </button>
            <button
              onClick={handleLogout}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5"
              title="Logout Administrator"
            >
              <LogOut className="w-4 h-4 text-rose-400" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Requests</div>
            <div className="text-3xl font-extrabold text-white mt-2">{dynamicMetrics.total}</div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pending Action</div>
            <div className="text-3xl font-extrabold text-rose-400 mt-2">{dynamicMetrics.pending}</div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Microfinance Inquiries</div>
            <div className="text-3xl font-extrabold text-blue-400 mt-2">{dynamicMetrics.microfinance || 0}</div>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Completed Requests</div>
            <div className="text-3xl font-extrabold text-emerald-400 mt-2">{dynamicMetrics.completed}</div>
          </div>
        </div>

        {/* TEAM MEMBERS SECTION */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Users className="w-5 h-5 text-blue-400" />
            <span>Support Staff ({staffMembers.length}):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {staffMembers.length === 0 ? (
              <span className="text-xs text-slate-500 italic">No staff assigned</span>
            ) : (
              staffMembers.map((member, index) => (
                <div 
                  key={member.id || index} 
                  className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-lg text-xs flex items-center gap-2 text-slate-300"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-medium text-white">{member.name}</span>
                  {member.role && <span className="text-slate-400">({member.role})</span>}
                </div>
              ))
            )}
          </div>
        </div>

        {/* CONTROLS: SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by client, request, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 font-medium">Status:</label>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 font-medium">Sector:</label>
              <select
                value={selectedSectorFilter}
                onChange={(e) => setSelectedSectorFilter(e.target.value)}
                className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Sectors</option>
                <option value="microfinance">Microfinance</option>
                <option value="school">School</option>
                <option value="pharmacy">Pharmacy</option>
              </select>
            </div>
          </div>
        </div>

        {/* CLIENT REQUESTS TABLE SECTION */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/60 flex justify-between items-center bg-slate-800/80">
            <h2 className="font-bold text-slate-200 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" /> Client Service Requests
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                Firestore Live Sync
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/60 text-xs uppercase text-slate-400 font-semibold border-b border-slate-700">
                <tr>
                  <th className="px-6 py-3">Client & Company</th>
                  <th className="px-6 py-3">Request / Requirements</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Contact Info</th>
                  <th className="px-6 py-3 text-center">Actions & PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Fetching client requests from Firestore...
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-400">
                      No client requests found in database.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((item) => {
                    const itemKey = item.id;
                    const pitchText = encodeURIComponent(`Hello ${item.clientName}, regarding your request for ${item.companyName}: We are reviewing your requirements and will guide you shortly.`);
                    const waLink = `https://wa.me/${item.phone}?text=${pitchText}`;

                    const isSendingEmail = actionLoading[`email-${itemKey}`];
                    const isGeneratingPdf = actionLoading[`pdf-${itemKey}`];

                    return (
                      <tr key={itemKey} className="hover:bg-slate-800/30 transition">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{item.companyName}</div>
                          <div className="text-xs text-slate-400">{item.clientName}</div>
                          <div className="mt-1">{renderSectorBadge(item.sector)}</div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-xs text-slate-200 bg-slate-900/50 p-2 rounded border border-slate-700/50 italic">
                            "{item.message || 'No detailed description provided.'}"
                          </div>
                          {item.createdAt && (
                            <div className="text-[10px] text-slate-500 mt-1">
                              Received: {item.createdAt.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Recent'}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1.5">
                            {renderStatusBadge(item.status || 'Pending')}
                            <select
                              value={item.status || 'Pending'}
                              onChange={(e) => handleStatusChange(itemKey, e.target.value)}
                              className="bg-slate-900 border border-slate-700 rounded text-xs px-2 py-1 text-slate-300 focus:outline-none focus:border-blue-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-300">
                          <div>✉️ {item.email}</div>
                          <div>📞 +{item.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* EMAIL ACTION */}
                            <button
                              onClick={() => sendEmail(itemKey)}
                              disabled={isSendingEmail}
                              className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
                            >
                              {isSendingEmail ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                              {isSendingEmail ? 'Sending...' : 'Reply Email'}
                            </button>

                            {/* WHATSAPP ACTION */}
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                            >
                              WhatsApp
                            </a>

                            {/* QUOTATION PDF ACTION */}
                            <button
                              onClick={() => createQuotationForRequest(itemKey)}
                              disabled={isGeneratingPdf}
                              className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
                            >
                              {isGeneratingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                              {isGeneratingPdf ? 'Generating...' : 'Quotation'}
                            </button>

                            {/* DELETE ACTION */}
                            <button
                              onClick={() => handleDeleteRequest(itemKey)}
                              className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                              title="Delete Request"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* LOG CLIENT REQUEST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h3 className="font-bold text-lg text-white">Log Client Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-xl">&times;</button>
            </div>
            <form onSubmit={handleAddRequest} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Contact Name</label>
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
                <label className="text-xs text-slate-400 font-semibold block mb-1">Company / Organization</label>
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
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Client Message / System Requirements</label>
                <textarea
                  id="message"
                  rows="3"
                  placeholder="Describe the software request or features requested..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition"
                >
                  Save Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}