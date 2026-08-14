require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Custom Modules
const leads = require('./data/leads.json');
const { getEmailTemplate } = require('./templates/emailTemplates');
const { generateDocumentPDF } = require('./documentGenerator');

const app = express();
app.use(cors());
app.use(express.json());

// Configure Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ================================================================
// 🏠 ROOT ROUTE: Serves dashboard.html at http://localhost:5000/
// ================================================================
app.get('/', (req, res) => {
  // '..' points one directory up from ansotech-outreach-engine to the root folder
  const dashboardPath = path.join(__dirname, '..', 'dashboard.html');

  if (fs.existsSync(dashboardPath)) {
    res.sendFile(dashboardPath);
  } else {
    res.status(404).send('<h2>404 - dashboard.html not found in root directory</h2>');
  }
});

// ================================================================
// 📡 API ROUTES
// ================================================================

// API Route 1: Fetch all leads for your website dashboard
app.get('/api/leads', (req, res) => {
  res.json(leads);
});

// API Route 2: Trigger cold email sending from a web button
app.post('/api/send-email', async (req, res) => {
  const { leadId } = req.body;
  const lead = leads.find(l => l.id === leadId);

  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found' });
  }

  const template = getEmailTemplate(lead);
  const pdfPath = path.join(__dirname, 'assets', 'AnsoTech_Pricing_Brochure.pdf');

  const mailOptions = {
    from: `"${process.env.COMPANY_NAME}" <${process.env.SMTP_USER}>`,
    to: lead.email,
    subject: template.subject,
    html: template.html,
    attachments: fs.existsSync(pdfPath) ? [
      {
        filename: 'AnsoTech_Pricing_Brochure.pdf',
        path: pdfPath,
        contentType: 'application/pdf'
      }
    ] : []
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, message: `Email sent to ${lead.companyName}`, messageId: info.messageId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Route 3: Generate PDF Quotations / Invoices
app.post('/api/generate-doc', async (req, res) => {
  try {
    const { type, clientName, companyName, email, items, docNumber } = req.body;

    if (!clientName || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing required document fields' });
    }

    const pdfPath = await generateDocumentPDF({
      type: type || 'QUOTATION',
      clientName,
      companyName: companyName || 'N/A',
      email: email || 'N/A',
      items,
      docNumber: docNumber || `AT-${Date.now().toString().slice(-5)}`
    });

    res.json({
      success: true,
      message: `${type || 'Document'} PDF generated successfully!`,
      filePath: pdfPath
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 AnsoTech API Server running on http://localhost:${PORT}`));