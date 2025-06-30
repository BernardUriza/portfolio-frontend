import { Component, OnInit, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: [],
  imports: [ReactiveFormsModule,CommonModule]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;  // Lo declaramos sin inicializar
  error: string | null = null;

  readonly translations = computed(() => this.i18n.t().LOGIN);

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private i18n: I18nService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: err => this.error = this.translations().ERROR
    });
  }
}
