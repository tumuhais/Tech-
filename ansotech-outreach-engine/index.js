require('dotenv').config();
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const leads = require('./data/leads.json');
const { getEmailTemplate } = require('./templates/emailTemplates');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function generateWhatsAppLink(lead) {
  const pitchMessages = {
    microfinance: `Hello ${lead.clientName}, I am Anselm from AnsoTech Company. We build Loan Management Systems that track borrowers, calculate interest, and send payment reminders automatically. Would you be open to a quick demo?`,
    school: `Hello ${lead.clientName}, I am Anselm from AnsoTech Company. We build School Portals for fees collection and automated report card generation. Would you have 5 minutes for a demo?`,
    pharmacy: `Hello ${lead.clientName}, I am Anselm from AnsoTech Company. We deploy Pharmacy POS systems with automated stock & expiry alerts. Can I share a quick 2-minute demo video?`
  };

  const message = pitchMessages[lead.sector] || pitchMessages.microfinance;
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${lead.phone}?text=${encodedText}`;
}

function printAuditChecklist(lead) {
  return `
====================================================================
           ANSOTECH DIGITAL AUDIT CHECKLIST: ${lead.companyName.toUpperCase()}
====================================================================
[ ] 1. DATA BACKUP: Are ${lead.companyName}'s records stored in a cloud database?
[ ] 2. ACCESS CONTROL: Are staff permissions restricted to prevent unauthorized edits?
[ ] 3. ONLINE PRESENCE: Does ${lead.companyName} have an official website with WhatsApp CTAs?
[ ] 4. AUTOMATION: Are receipts & statements auto-generated as PDFs?
[ ] 5. ALERTS: Does your system alert you of low stock or loan defaults?
--------------------------------------------------------------------
  `;
}

async function sendColdEmail(lead) {
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
    console.log(`✅ EMAIL SENT to ${lead.companyName} (${lead.email}) | ID: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ FAILED to send email to ${lead.companyName}:`, error.message);
  }
}

async function runOutreachEngine() {
  console.log(`\n==================================================`);
  console.log(`🚀 ANSOTECH OUTREACH ENGINE LAUNCHED`);
  console.log(`==================================================\n`);

  for (const lead of leads) {
    console.log(`--------------------------------------------------`);
    console.log(`📂 Processing: ${lead.companyName} [${lead.sector.toUpperCase()}]`);
    
    const waLink = generateWhatsAppLink(lead);
    console.log(`💬 WhatsApp Click-To-Chat Link:\n   ${waLink}`);

    console.log(printAuditChecklist(lead));

    // Uncomment below to execute live emails:
    // await sendColdEmail(lead);
  }

  console.log(`\n✨ Execution Completed successfully!`);
}

runOutreachEngine();