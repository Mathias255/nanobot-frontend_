import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api'; // ✨ Corregido al archivo real api.ts

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html', // ✨ Corregido al archivo real buscador.html
  styleUrls: ['./buscador.css']
})
export class BuscadorComponent {
  tablaSeleccionada: string = 'productos';
  idBuscado: number | null = null;
  resultado: any = null;
  errorMensaje: string = '';

  constructor(private apiService: ApiService) {}

  ejecutarBusqueda() {
    if (!this.idBuscado) return;
    
    this.errorMensaje = '';
    this.resultado = null;

    this.apiService.buscarPorId(this.tablaSeleccionada, this.idBuscado).subscribe({
      next: (res: any) => {
        this.resultado = res.datos;
      },
      error: (err: any) => {
        this.errorMensaje = err.error?.error || 'No se encontró el registro.';
      }
    });
  }
}