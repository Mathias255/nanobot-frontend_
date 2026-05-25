import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { CarritoComponent } from './components/carrito/carrito';
import { RegistroComponent } from './components/registros/registros'; // Sincronizado con la carpeta "registros"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CatalogoComponent, CarritoComponent, RegistroComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  seccionActiva: string = 'inicio';
  carrito: any[] = [];

  // 🌟 CORREGIDO: Ahora el objeto inicial usa email en lugar de identificacion
  clienteActual = {
    nombre: 'Consumidor Final',
    email: 'anonimo@nanobot.com'
  };

  agregarAlCarrito(producto: any) {
    this.carrito.push(producto);
    console.log('Producto añadido al carro global:', this.carrito);
  }

  eliminarDelCarrito(producto: any) {
    const index = this.carrito.indexOf(producto);
    if (index > -1) {
      this.carrito.splice(index, 1);
    }
  }

  // 🌟 CORREGIDO: El parámetro ahora recibe 'email: string' para hacer match con el Output del registro
  guardarDatosCliente(datos: { nombre: string; email: string }) {
    this.clienteActual = datos;
    alert(`⚡ Datos de facturación asignados con éxito:\nCliente: ${this.clienteActual.nombre}\nEmail: ${this.clienteActual.email}`);
    this.seccionActiva = 'componentes'; // Te manda al catálogo listo para comprar
  }

  terminarProcesoDeCompra() {
    this.carrito = [];
    this.seccionActiva = 'inicio';
  }
}