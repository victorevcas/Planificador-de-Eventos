import { Routes } from '@angular/router';
import { perfilGuard } from './guards/perfil.guard';

// Rutas principales de la aplicación
export const routes: Routes = [
  // Ruta por defecto → redirige al calendario
  { path: '', redirectTo: '/calendario', pathMatch: 'full' },

  // Página 1: Calendario (lazy loading)
  {
    path: 'calendario',
    loadComponent: () =>
      import('./components/calendar/calendar.component').then(m => m.CalendarComponent),
    title: 'Calendario'
  },

  // Página 2: Gestión de eventos — rutas hijas (child routes)
  {
    path: 'eventos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/event-form/event-form.component').then(m => m.EventFormComponent),
        title: 'Eventos'
      },
      {
        path: 'nuevo',
        loadComponent: () =>
          import('./components/event-form/event-form.component').then(m => m.EventFormComponent),
        title: 'Nuevo evento'
      },
      // Ruta con parámetro dinámico :id
      {
        path: ':id/editar',
        loadComponent: () =>
          import('./components/event-form/event-form.component').then(m => m.EventFormComponent),
        title: 'Editar evento'
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./components/event-detail/event-detail.component').then(m => m.EventDetailComponent),
        title: 'Detalle del evento'
      }
    ]
  },

  // Página 3: Perfil — protegida con guard
  {
    path: 'perfil',
    canActivate: [perfilGuard],
    loadComponent: () =>
      import('./components/perfil/perfil.component').then(m => m.PerfilComponent),
    title: 'Mi perfil'
  },

  // Ruta comodín: cualquier URL no definida → 404
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página no encontrada'
  }
];
