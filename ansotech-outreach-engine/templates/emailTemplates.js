const getEmailTemplate = (lead) => {
  const templates = {
    microfinance: {
      subject: `Proposal: Digital Loan Management Platform for ${lead.companyName}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #334155; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <h2 style="color: #0F172A; margin-top: 0;">AnsoTech Enterprise Systems</h2>
          <p>Dear <strong>${lead.clientName}</strong>,</p>
          <p>Managing borrower portfolios manually or via basic spreadsheets creates data security risks and administrative delays.</p>
          <p>At <strong>AnsoTech Company</strong>, we build custom software tailored for Ugandan lending institutions. Our <strong>Loan Management System</strong> helps microfinance managers automate end-to-end loan lifecycles:</p>
          <ul>
            <li><strong>Automated Repayment Schedules:</strong> Instant calculation of flat/reducing interest and penalties.</li>
            <li><strong>Borrower Risk Profiling:</strong> Centralized database for borrower documentation and collateral tracking.</li>
            <li><strong>Financial Reporting:</strong> One-click PDF statements for audits and board reviews.</li>
          </ul>
          <p>We have attached our official <strong>Service & Pricing Brochure</strong> to this email for your review.</p>
          <p>Could we schedule a brief 10-minute demonstration at your office or via video call next week?</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="font-size: 12px; color: #64748b; margin: 0;">
            <strong>Anselm</strong> | Engineering Lead<br>
            AnsoTech Company • Kampala, Uganda<br>
            📞 +256 777 036 617 | 💬 WhatsApp: +256 726 627 892<br>
            ✉️ ansotechcompany@gmail.com
          </p>
        </div>
      `
    },
    school: {
      subject: `Digital Administration & Fees Portal for ${lead.companyName}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #334155; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <h2 style="color: #0F172A; margin-top: 0;">AnsoTech Education Systems</h2>
          <p>Dear <strong>${lead.clientName}</strong>,</p>
          <p>Streamline your institution's administration with a custom school management portal.</p>
          <p>Our <strong>AnsoTech School Portal</strong> empowers school directors to:</p>
          <ul>
            <li>Track tuition fees collection and auto-issue digital receipts.</li>
            <li>Generate terminal student report cards in standardized PDF format.</li>
            <li>Manage teacher marksheets securely online.</li>
          </ul>
          <p>Please find attached our official <strong>Service Brochure</strong> for details.</p>
          <p>Best regards,<br><strong>AnsoTech Engineering Team</strong></p>
        </div>
      `
    },
    pharmacy: {
      subject: `Inventory & POS Software for ${lead.companyName}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #334155; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <h2 style="color: #0F172A; margin-top: 0;">AnsoTech Healthcare IT</h2>
          <p>Dear <strong>${lead.clientName}</strong>,</p>
          <p>Stock leakage and expired medicine are two of the biggest costs facing modern pharmacies.</p>
          <p>Our <strong>Pharmacy POS & Stock System</strong> sends automated alerts whenever medicine inventory is low or approaching expiration—saving you money before losses occur.</p>
          <p>Attached is our <strong>Service Brochure</strong> detailing our POS software packages.</p>
          <p>Best regards,<br><strong>AnsoTech Engineering Team</strong></p>
        </div>
      `
    }
  };

  return templates[lead.sector] || templates['microfinance'];
};

module.exports = { getEmailTemplate };