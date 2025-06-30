import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nService } from '../../core/i18n.service';
import { ContactService } from './contact.service';
import { ToastService } from '../toast/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  readonly translations = computed(() => this.i18n.t().CTA);
  readonly form;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private i18n: I18nService,
    private service: ContactService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }


  hint(field: 'name' | 'email' | 'message') {
    const map = {
      name: this.translations().NAME,
      email: this.translations().EMAIL,
      message: this.translations().MESSAGE
    } as const;
    this.toast.show(map[field]);
  }

  submit() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonColor: '#D4AF37',
        background: '#1a1a1a',
        color: '#e0e0e0'
      });
      return;
    }
    
    this.isLoading = true;
    const { name, email, message } = this.form.value;
    const payload = { name: name || '', email: email || '', 
      "subject": "Prueba SMTP Render", message: message || '' };
    
    this.service.sendContact(payload).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Tu mensaje ha sido enviado con éxito. Te contactaré pronto.',
          confirmButtonColor: '#D4AF37',
          background: '#1a1a1a',
          color: '#e0e0e0'
        });
        this.form.reset();
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar',
          text: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.',
          confirmButtonColor: '#D4AF37',
          background: '#1a1a1a',
          color: '#e0e0e0'
        });
      }
    });
  }
}
