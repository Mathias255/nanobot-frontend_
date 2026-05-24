import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent {
  // 🌟 Recibe la lista de productos agregados desde app.ts
  @Input() items: any[] = [];

  // 🌟 Avisa a app.ts cuando el usuario elimina un componente
  @Output() itemEliminado = new EventEmitter<number>();

  quitar(index: number) {
    this.itemEliminado.emit(index);
  }

  calcularTotal(): number {
    return this.items.reduce((total, item) => total + Number(item.precio), 0);
  }

  procesarOrden() {
    alert('¡Orden de ensamble Nanobot Systems generada con éxito! Conectando pasarela de pago...');
  }
}