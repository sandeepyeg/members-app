import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { LoadingService } from './core/services/loading.service';
import { ToastService } from './core/services/toast.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private loadingSvc = inject(LoadingService);
  private toastSvc = inject(ToastService);
  private auth = inject(AuthService);

  loading = this.loadingSvc.loading;
  toast = this.toastSvc.message;

  loggedIn = computed(() => this.auth.isLoggedIn());
  user = this.auth.user; // signal<User | null>

  logout() {
    // AuthService.logout already navigates to /login
    this.auth.logout();
  }
}
