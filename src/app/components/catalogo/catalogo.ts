import { Component, OnInit, Output, EventEmitter, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef); // 🌟 NUEVO: El despertador de Angular
  
  productos: any[] = [];

  @Output() productoAgregado = new EventEmitter<any>();

  ngOnInit() {
    this.apiService.getProductos().subscribe({
      next: (data: any) => {
        console.log('Datos cargados en el catálogo:', data);
        this.productos = data; 
        
        // 🌟 OBLIGAMOS A ANGULAR A PINTAR LOS 20 PRODUCTOS DE INMEDIATO
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error de comunicación con Flask:', err);
      }
    });
  }

  agregarAlCarrito(producto: any) {
    this.productoAgregado.emit(producto);
  }
}