import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
    text: string;
    type?: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {

    message = signal<ToastMessage | null>(null);

    show(text: string, type: ToastMessage['type'] = 'success') {
        this.message.set({ text, type });

        setTimeout(() => this.clear(), 3000);
    }

    clear() {
        this.message.set(null);
    }
}
