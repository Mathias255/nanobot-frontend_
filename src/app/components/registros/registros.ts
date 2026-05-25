import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registros.html',
  styleUrls: ['./registros.css']
})
export class RegistroComponent {
  // Variables mapeadas mediante ngModel desde el HTML
  nombreCliente: string = '';
  emailCliente: string = '';

  // Evento encargado de transmitir los datos ingresados al componente global
  @Output() usuarioRegistrado = new EventEmitter<{ nombre: string; email: string }>();

  registrar() {
    if (!this.nombreCliente.trim() || !this.emailCliente.trim()) {
      alert('Por favor, completa todos los campos del usuario antes de continuar.');
      return;
    }

    // Emitir el objeto limpio hacia app.ts
    this.usuarioRegistrado.emit({
      nombre: this.nombreCliente,
      email: this.emailCliente
    });
  }
}