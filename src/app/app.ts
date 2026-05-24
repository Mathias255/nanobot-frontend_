import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { RegistroComponent } from './components/registros/registros';
import { CarritoComponent } from './components/carrito/carrito'; // 🌟 NUEVA IMPORTACIÓN

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CatalogoComponent, RegistroComponent, CarritoComponent], // 🌟 Agregado aquí
  templateUrl: './app.html'
})
export class App {
  seccionActiva: string = 'inicio';
  carrito: any[] = [];

  agregarAlCarrito(producto: any) {
    this.carrito.push(producto);
    console.log('Producto en carrito:', producto);
  }

  // 🌟 Nueva función para sacar elementos desde el componente hijo
  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }
}