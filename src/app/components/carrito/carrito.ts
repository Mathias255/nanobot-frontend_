import { Component, Input, Output, EventEmitter } from '@angular/core'; // 👈 Asegúrate de que "Input" esté aquí importado
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent {
  @Input() items: any[] = [];
  @Input() cliente: any = { nombre: 'Consumidor Final', identificacion: '9999999999999' }; // 👈 ESTA LÍNEA DEBE QUEDAR EXACTAMENTE ASÍ
  @Output() itemEliminado = new EventEmitter<any>();
  @Output() compraFinalizada = new EventEmitter<void>();

  calcularTotal(): number {
    return this.items.reduce((acc, item) => acc + item.precio, 0);
  }

  generarFacturaPDF() {
    if (this.items.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Cabecera Corporativa de la Empresa
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("NANOBOT SYSTEMS", 15, 20);
    
    doc.setFontSize(9);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("Distribución Inteligente de Hardware de Alta Gama", 15, 25);
    doc.text("RUC: 1792458963001 | Quito, Ecuador", 15, 29);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("FACTURA ELECTRÓNICA", 140, 20);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.text(`Nº: FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`, 140, 25);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 140, 29);

    doc.setDrawColor(226, 232, 240);
    doc.line(15, 35, 195, 35);

    // Seccion de Datos de Facturación del Cliente Dinámico
    doc.setFont("Helvetica", "bold");
    doc.text("FACTURADO A:", 15, 43);
    doc.setFont("Helvetica", "normal");
    doc.text(`Cliente: ${this.cliente ? this.cliente.nombre : 'Consumidor Final'}`, 15, 49);
    doc.text(`Identificación: ${this.cliente ? this.cliente.identificacion : '9999999999999'}`, 15, 54);

    const matrixProductos = this.items.map((item, index) => [
      index + 1,
      item.nombre,
      1,
      `$${item.precio.toFixed(2)}`,
      `$${item.precio.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 62,
      head: [['Item', 'Descripción del Componente', 'Cant.', 'Precio Unit.', 'Total']],
      body: matrixProductos,
      theme: 'striped',
      headStyles: { fillColor: [15, 23, 42] }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    const total = this.calcularTotal();

    doc.setFont("Helvetica", "bold");
    doc.text(`TOTAL USD: $${total.toFixed(2)}`, 140, finalY);

    doc.save(`Factura_Nanobot_${Date.now()}.pdf`);

    alert("🚀 ¡Pago Procesado! Su factura PDF personalizada se ha generado con éxito.");
    this.compraFinalizada.emit(); 
  }
}