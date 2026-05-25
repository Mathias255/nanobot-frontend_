import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html', // 🌟 ¡Corregido aquí para que apunte a catálogo!
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  private http = inject(HttpClient);

  @Output() productoAgregado = new EventEmitter<any>();
  productos: any[] = [];

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.http.get<any[]>('http://127.0.0.1:5000/api/productos').subscribe({
      next: (data) => {
        this.productos = data;
        console.log('¡Productos asignados al componente!', this.productos);
      },
      error: (error) => {
        console.error('Error al conectar con la API de Flask:', error);
      }
    });
  }

  agregar(producto: any) {
    this.productoAgregado.emit(producto);
  }
}