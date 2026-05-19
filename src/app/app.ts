import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { BuscadorComponent } from './components/buscador/buscador';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CatalogoComponent, BuscadorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'nanobot-frontend';

  // 🌟 Control de la pantalla visible. Por defecto inicia en la presentación
  seccionActiva: 'inicio' | 'productos' | 'registro' | 'carrito' = 'inicio';
  
  // Lista del carrito de compras
  carrito: any[] = [];

  // Método para cambiar de pestaña fluidamente
  cambiarSeccion(seccion: 'inicio' | 'productos' | 'registro' | 'carrito') {
    this.seccionActiva = seccion;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Regresa arriba al cambiar de vista
  }

  // Capturar lo que envía el catálogo
  capturarProducto(producto: any) {
    this.carrito.push(producto);
  }

  // Quitar elemento individual
  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }

  // Sumar precios
  calcularTotal(): number {
    return this.carrito.reduce((sum, item) => sum + Number(item.precio), 0);
  }

  // Limpieza al procesar la compra
  vaciarCarrito() {
    alert('🛒 ¡Orden de hardware Nanobot generada con éxito!');
    this.carrito = [];
    this.cambiarSeccion('inicio');
  }
}