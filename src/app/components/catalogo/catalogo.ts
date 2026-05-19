import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  private apiService = inject(ApiService);
  productos: any[] = [];

  // 🌟 Evento para avisarle a la App principal que se agregó un producto
  @Output() productoAgregado = new EventEmitter<any>();

  ngOnInit() {
    this.apiService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al traer catálogo:', err)
    });
  }

  // Lanzar el producto seleccionado
  agregarAlCarrito(producto: any) {
    this.productoAgregado.emit(producto);
  }
}