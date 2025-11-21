import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  errorMsg = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  submit(): void {
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    if (!email || !password) return;

    this.loading = true;

    this.auth.login(email, password).subscribe({
      next: user => {
        console.log('Logueado como', user);
        this.loading = false;
        this.router.navigateByUrl('/'); // vuelve al home
      },
      error: err => {
        console.error(err);
        this.loading = false;
        this.errorMsg = err.message || 'Error al iniciar sesión';
      }
    });
  }
}
