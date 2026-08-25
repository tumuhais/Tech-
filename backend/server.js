const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend requests from http://localhost:3000
app.use(express.json());

// 1. Email Reply Route
app.post('/api/send-email', async (req, res) => {
  const { requestId, clientEmail, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: clientEmail || process.env.EMAIL_USER, // target email or fallback
      subject: `AnsoTech Systems - Response to Request #${requestId || ''}`,
      text: message || 'Thank you for contacting AnsoTech Systems. We have received your request and will get back to you shortly.'
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Generate PDF Quotation Route
app.post('/api/generate-doc', (req, res) => {
  try {
    const { clientName, companyName, docNumber, items } = req.body;

    const doc = new PDFDocument();
    const fileName = `${docNumber || 'QUOTATION'}.pdf`;
    const outputDir = path.join(__dirname, 'generated_docs');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const filePath = path.join(outputDir, fileName);
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // PDF Content
    doc.fontSize(20).text('AnsoTech Systems - Quotation', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Client: ${clientName || 'N/A'}`);
    doc.text(`Company: ${companyName || 'N/A'}`);
    doc.text(`Document No: ${docNumber || 'N/A'}`);
    doc.moveDown();

    doc.text('Items / Deliverables:', { underline: true });
    if (items && Array.isArray(items)) {
      items.forEach((item, idx) => {
        doc.text(`${idx + 1}. ${item.description} - Qty: ${item.quantity} | Price: ${item.unitPrice} UGX`);
      });
    }

    doc.end();

    writeStream.on('finish', () => {
      res.json({ success: true, filePath });
    });
  } catch (error) {
    console.error('PDF error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});