import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="contenido-principal">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .contenido-principal {
      min-height: calc(100vh - 60px);
      background: #f8f9fc;
    }
  `]
})
export class App {}
