import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <section class="p-6 text-gris-claro bg-antracita min-h-screen">
      <h1 class="text-3xl font-heading mb-4">Admin Panel</h1>
      <p>Bienvenido al área de administración.</p>
      <!-- Aquí luego agregas formularios o componentes para CRUD -->
    </section>
  `,
  styles: []
})
export class AdminComponent {}
