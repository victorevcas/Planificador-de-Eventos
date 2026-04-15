import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="pagina-404">
      <div class="contenido-404">
        <span class="emoji">🗓️</span>
        <h1>404</h1>
        <p>Esta página no existe</p>
        <a routerLink="/calendario" class="btn-volver">← Volver al calendario</a>
      </div>
    </div>
  `,
  styles: [`
    .pagina-404 {
      display: flex; justify-content: center; align-items: center;
      min-height: calc(100vh - 60px);
    }
    .contenido-404 {
      text-align: center;
      .emoji { font-size: 4rem; }
      h1 { font-size: 5rem; font-weight: 900; color: #e2e8f0; margin: 0; }
      p { color: #64748b; font-size: 1.1rem; margin: 8px 0 24px; }
    }
    .btn-volver {
      padding: 10px 24px;
      background: #3b82f6;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      &:hover { background: #2563eb; }
    }
  `]
})
export class NotFoundComponent {}
