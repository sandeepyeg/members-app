import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loading = signal(false);
  loginFailed = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) { }

  submit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.loginFailed.set(false);

    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.router.navigate(['/members']);
      },
      error: (error) => {
        this.loading.set(false);
        this.loginFailed.set(true);
        // Error interceptor will show toast, but we can add custom handling here if needed
        console.error('Login failed:', error);
      }
    });
  }
}
