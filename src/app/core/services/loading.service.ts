import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  private _requestCount = signal(0);
  loading = computed(() => this._requestCount() > 0);

  show() {
    this._requestCount.update(count => count + 1);
  }

  hide() {
    this._requestCount.update(count => Math.max(0, count - 1));
  }
}
