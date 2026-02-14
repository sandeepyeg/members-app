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

    setTimeout(() => {
      const success = this.auth.login(email!, password!);

      this.loading.set(false);

      if (success) {
        this.router.navigate(['/members']);
      } else {
        this.loginFailed.set(true);
        this.toast.show('Invalid email or password', 'error');
      }
    }, 600); // simulate API latency
  }
}
