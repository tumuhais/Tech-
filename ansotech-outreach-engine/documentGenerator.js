const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generates an official AnsoTech Business Document PDF
 * @param {Object} docData - Document details (type, client, items, docNumber)
 * @returns {Promise<string>} Filepath of generated PDF
 */
function generateDocumentPDF(docData) {
  return new Promise((resolve, reject) => {
    const outputDir = path.join(__dirname, 'outputs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const docType = docData.type.toUpperCase(); // QUOTATION, INVOICE, RECEIPT
    const fileName = `${docType}_${docData.clientName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    const filePath = path.join(outputDir, fileName);

    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // 1. Header & Brand Banner
    doc
      .fillColor('#0F172A')
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('ANSOTECH COMPANY', 50, 45)
      .fontSize(9)
      .font('Helvetica')
      .fillColor('#64748B')
      .text('Software Engineering & Systems Infrastructure', 50, 68)
      .text('Kampala, Uganda | +256 777 036 617 | ansotechcompany@gmail.com', 50, 80);

    // Document Badge
    doc
      .fillColor('#2563EB')
      .fontSize(16)
      .font('Helvetica-Bold')
      .text(docType, 400, 45, { align: 'right' })
      .fontSize(9)
      .font('Helvetica')
      .fillColor('#334155')
      .text(`Doc #: ${docData.docNumber || 'AT-2026-001'}`, 400, 68, { align: 'right' })
      .text(`Date: ${docData.date || new Date().toLocaleDateString()}`, 400, 80, { align: 'right' });

    // Divider Line
    doc.moveTo(50, 100).lineTo(550, 100).strokeColor('#CBD5E1').lineWidth(1).stroke();

    // 2. Client Details Section
    doc
      .fillColor('#0F172A')
      .fontSize(10)
      .font('Helvetica-Bold')
      .text('PREPARED FOR:', 50, 115)
      .font('Helvetica')
      .fillColor('#334155')
      .text(`Client Name: ${docData.clientName}`, 50, 130)
      .text(`Company: ${docData.companyName}`, 50, 144)
      .text(`Contact Email: ${docData.email}`, 50, 158);

    // 3. Table Headers
    const tableTop = 190;
    doc
      .rect(50, tableTop, 500, 22)
      .fill('#0F172A');

    doc
      .fillColor('#FFFFFF')
      .fontSize(9)
      .font('Helvetica-Bold')
      .text('ITEM DESCRIPTION', 60, tableTop + 6)
      .text('QTY', 330, tableTop + 6)
      .text('UNIT PRICE (UGX)', 380, tableTop + 6)
      .text('TOTAL (UGX)', 480, tableTop + 6);

    // 4. Line Items
    let position = tableTop + 30;
    let grandTotal = 0;

    doc.font('Helvetica').fontSize(9).fillColor('#334155');

    docData.items.forEach((item) => {
      const itemTotal = item.quantity * item.unitPrice;
      grandTotal += itemTotal;

      doc
        .text(item.description, 60, position)
        .text(item.quantity.toString(), 335, position)
        .text(item.unitPrice.toLocaleString(), 380, position)
        .text(itemTotal.toLocaleString(), 480, position);

      position += 20;
    });

    // Divider
    doc.moveTo(50, position).lineTo(550, position).strokeColor('#E2E8F0').stroke();

    // 5. Total Calculations
    position += 15;
    doc
      .font('Helvetica-Bold')
      .fontSize(11)
      .fillColor('#0F172A')
      .text('GRAND TOTAL:', 330, position)
      .fillColor('#2563EB')
      .text(`UGX ${grandTotal.toLocaleString()}`, 450, position, { align: 'right' });

    // 6. Payment & Sign-off Terms
    position += 40;
    doc
      .rect(50, position, 500, 75)
      .fillAndStroke('#F8FAFC', '#E2E8F0');

    doc
      .fillColor('#0F172A')
      .fontSize(9)
      .font('Helvetica-Bold')
      .text('PAYMENT TERMS & BANK DETAILS:', 60, position + 10)
      .font('Helvetica')
      .fillColor('#475569')
      .text('• Account Name: AnsoTech Company', 60, position + 24)
      .text('• Payment Schedule: 50% Upfront, 30% Staging Demo, 20% Handover', 60, position + 38)
      .text('• Mobile Money: +256 777 036 617 / +256 726 627 892', 60, position + 52);

    // Footer Signatures
    doc
      .fontSize(8)
      .fillColor('#94A3B8')
      .text('Generated automatically by AnsoTech Business Engine', 50, 720, { align: 'center' });

    doc.end();

    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', (err) => reject(err));
  });
}

module.exports = { generateDocumentPDF };