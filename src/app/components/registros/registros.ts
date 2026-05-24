import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registros.html', // 🌟 Corregido a plural para que coincida con tu archivo
  styleUrl: './registros.css'      // 🌟 Corregido a plural para que coincida con tu archivo
})
export class RegistroComponent {
  private http = inject(HttpClient);

  @Output() registroExitoso = new EventEmitter<void>();

  enviarRegistro() {
    const nombreInput = document.getElementById('reg-nombre') as HTMLInputElement;
    const emailInput = document.getElementById('reg-email') as HTMLInputElement;
    const passwordInput = document.getElementById('reg-password') as HTMLInputElement;
    const telefonoInput = document.getElementById('reg-telefono') as HTMLInputElement;

    const nuevoUsuario = {
      nombre: nombreInput?.value,
      email: emailInput?.value,
      password: passwordInput?.value,
      rol: 'cliente',
      telefono: telefonoInput?.value || ''
    };

    console.log('Enviando nuevo cliente a Flask...', nuevoUsuario);

    this.http.post('http://127.0.0.1:5000/api/usuarios', nuevoUsuario).subscribe({
      next: (response: any) => {
        console.log('Respuesta exitosa de Flask:', response);
        alert(`¡Bienvenido a Nanobot Systems, ${nuevoUsuario.nombre}! Registro completado.`);
        
        if (nombreInput) nombreInput.value = '';
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
        if (telefonoInput) telefonoInput.value = '';

        this.registroExitoso.emit();
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        alert('Error en el registro. Comprueba la conexión o que el correo no exista.');
      }
    });
  }
}