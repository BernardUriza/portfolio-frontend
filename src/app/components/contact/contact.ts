import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nService } from '../../core/i18n.service';
import { ContactService } from './contact.service';
import { ToastService } from '../toast/toast.service';

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
      this.toast.show('Formulario inválido');
      return;
    }
    const { name, email, message } = this.form.value;
    const payload = { name: name || '', email: email || '', message: message || '' };
    this.service.sendContact(payload).subscribe({
      next: () => {
        this.toast.show('Correo enviado con éxito.');
        this.form.reset();
      },
      error: () => this.toast.show('Error al enviar correo')
    });
  }
}
