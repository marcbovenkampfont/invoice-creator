import jsPDF from "jspdf";
import autotable from 'jspdf-autotable';
import type { PdfData } from "../../types/pdf";

// Función para formatear números con formato europeo (1.234,56)
const formatEuropeanNumber = (num: number): string => {
  return num.toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&.')  // Añade punto cada 3 dígitos
    .replace(/\.(\d{2})$/, ',$1');         // Reemplaza el último punto por coma
};

export const generatePdf = (data: PdfData) => {
  const doc = new jsPDF() as jsPDF & { lastAutoTable: { finalY: number } };

  console.log("Generating PDF with data:", data);

  // --- CONFIGURACIÓN GENERAL ---
  const pageWidth = doc.internal.pageSize.getWidth(); // Ancho de la hoja (aprox 210mm en A4)
  const margen = 20; // Tu margen X deseado
  const xFinal = pageWidth - margen; // El equivalente a X = -20

  const bullet = '\u2022';

  // Mis datos
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(data.businessInfo.name, 20, 15);
  doc.text(data.businessInfo.address, 20, 20);
  doc.text(data.businessInfo.taxId, 20, 25);
  doc.text(data.businessInfo.phone || '', 20, 30);
  
  // Estilo para el email (azul y subrayado)
  const emailText = `${data.businessInfo.email}`;
  const emailX = 20;
  const emailY = 35;
  doc.setTextColor(0, 0, 255); // Azul
  doc.text(emailText, emailX, emailY);
  
  // Dibujar línea de subrayado
  const emailWidth = doc.getTextWidth(emailText);
  doc.setDrawColor(0, 0, 255); // Línea azul
  doc.line(emailX, emailY + 0.5, emailX + emailWidth, emailY + 0.5);
  
  // Restaurar estilo por defecto
  doc.setTextColor(0, 0, 0); // Negro
  doc.setDrawColor(0, 0, 0); // Línea negra

  // INVOICE

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text("INVOICE", 20, 50);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);

  // Datos del cliente

  doc.text(`Bill to:`, 20, 56);
  doc.setFont('helvetica', 'bold');
  doc.text(data.client.name, 20, 62);
  doc.setFont('helvetica', 'normal');
  doc.text(data.client.taxId, 20, 68);
  doc.text(data.client.address, 20, 74);
  doc.text(`${data.client.cp} ${data.client.city} - ${data.client.country}`, 20, 80);

  // Datos de la invoice

  doc.text(`Invoice number: ${data.title}`, xFinal, 90, {align: 'right'});
  doc.text(`Date: ${data.date}`, xFinal, 96, {align: 'right'});


  // ITEMS TABLE

  autotable(doc, {
    head: [[
      { content: '#', styles: { halign: 'center' } }, 
      { content: 'Description', styles: { halign: 'left' } }, 
      { content: 'Qty.', styles: { halign: 'center' } }, 
      { content: 'Unit', styles: { halign: 'center' } }, 
      { content: 'Price', styles: { halign: 'center' } }, 
      { content: 'Total', styles: { halign: 'right' } }
    ]],
    body: data.items?.map((item, index) => [
      index + 1,
      item.description,
      formatEuropeanNumber(item.quantity),
      item.unity,
      formatEuropeanNumber(item.price) + ' €',
      formatEuropeanNumber(item.quantity * item.price) + ' €'
    ]) || [],
    startY: 105,
    margin: { left: margen, right: margen },
    theme: 'plain',
    headStyles: { fillColor: [41, 128, 185], fontStyle: 'normal' },
    columnStyles: {
      0: { cellWidth: 6, halign: 'center', cellPadding: { horizontal: 1, top: 2, bottom: 4 } },
      1: { halign: 'left', cellPadding: { horizontal: 2, top: 2, bottom: 4} },
      2: { cellWidth: 15, halign: 'center', cellPadding: { horizontal: 1, top: 2, bottom: 4 } },
      3: { cellWidth: 'wrap', halign: 'center', cellPadding: { horizontal: 1, top: 2, bottom: 4 } },
      4: { cellWidth: 20, halign: 'center', cellPadding: { horizontal: 1, top: 2, bottom: 4 } },
      5: { cellWidth: 20, halign: 'right', cellPadding: { horizontal: 1, top: 2, bottom: 4 } },
    },
  });

  let endTable = doc.lastAutoTable.finalY ;

  doc.line(20, endTable, 190, endTable); // Línea horizontal después de la tabla

  // Total amount
  doc.setFontSize(11);
  doc.text("SUBTOTAL:", xFinal - 40, endTable + 10, {align: 'right'});
  doc.text(`${formatEuropeanNumber(data.amount)} €`, xFinal, endTable + 10, {align: 'right'});
  doc.text("TAX (VAT):", xFinal - 40, endTable + 16, {align: 'right'});
  doc.text(`0 %`, xFinal, endTable + 16, {align: 'right'});
  doc.setFont('helvetica', 'bold');
  doc.text("TOTAL:", xFinal - 40, endTable + 22, {align: 'right'});
  doc.text(`${formatEuropeanNumber(data.amount)} €`, xFinal, endTable + 22, {align: 'right'});


  // PAYMENT METHOD
  const letrasInvoice = data.title.replace(/[0-9]/g, '');
  const numerosInvoice = data.title.replace(/[^0-9]/g, '');

  doc.text("PAYMENT METHOD", 20, endTable + 45);
  doc.setFont('helvetica', 'normal');
  doc.text(`Account Holder: ${data.bankAccount.accountHolder}`, 20, endTable + 51);
  doc.text(`IBAN: ${data.bankAccount.iban.trim()}`, 20, endTable + 57);
  doc.text(`SWIFT/BIC: ${data.bankAccount.swift}`, 20, endTable + 63);
  doc.text(`Concept: Invoice ${letrasInvoice}-${numerosInvoice}`, 20, endTable + 69);


  doc.line(20, 260, 190, 260); // Línea horizontal

  // Nota legal
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text("Legal Note", 20, 270);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`${bullet}`, 27, 275.65);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`VAT Exempt. Reverse Charge Mechanism applies (Directive 2006/112/EC)`, 30, 275);

  doc.save(`${data.title}.pdf`);
};
