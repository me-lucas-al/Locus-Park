import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('locus-park-front');
  protected readonly sidebarOpen = signal(false);

  constructor(private router: Router) {
    // Fecha a sidebar no mobile ao mudar de rota
    this.router.events.subscribe(() => {
      this.sidebarOpen.set(false);
    });
  }

  isAuthRoute(): boolean {
    const url = this.router.url;
    return url.startsWith('/login') || url.startsWith('/cadastro');
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  protected closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}