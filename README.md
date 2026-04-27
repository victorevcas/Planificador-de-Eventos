# 📅 Planificador de Eventos

Aplicación de calendario tipo Google Calendar desarrollada con **Angular 21** (standalone components).

## Capturas de pantalla

> Próximamente

## Funcionalidades

- 📅 Calendario mensual con navegación y festivos nacionales
- 📋 Crear, editar y eliminar eventos con formulario validado
- 🎨 Filtro de eventos por color y contador del mes
- 👥 Sistema de perfiles con sesión activa y eventos grupales
- 🔒 Route Guard en la página de perfil
- 🌐 API de festivos integrada con HttpClient

## Conceptos Angular cubiertos

| Concepto | Dónde |
|---|---|
| `*ngFor` + `trackBy` | Calendario, perfiles, participantes |
| `*ngIf` / `ng-template` | Mensajes condicionales, perfil activo |
| `[ngClass]` | Estilos dinámicos de días y eventos |
| `[(ngModel)]` | Formularios template-driven |
| Validaciones + errores | EventForm, PerfilComponent |
| Pipe `titlecase`, `uppercase`, `number` | Detalle, Header, Perfil |
| Pipe personalizado `eventosPorDia` | Calendario |
| Pipe personalizado `duracionEvento` | Detalle de evento |
| Pipe personalizado `filtroEventos` | Barra de filtro |
| Servicios + `BehaviorSubject` | EventosService, PerfilesService |
| `HttpClient` GET | API de festivos nacionales |
| Routing con lazy loading | app.routes.ts |
| Rutas hijas (child routes) | /eventos/... |
| Parámetro dinámico `:id` | /eventos/:id |
| `routerLink` + `routerLinkActive` | Header |
| Route Guard funcional | /perfil |
| Navegación programática | Router.navigate() |
| `ActivatedRoute` | Parámetros y queryParams |

## Instalación

```bash
git clone https://github.com/victorevcas/Planificador-de-Eventos.git
cd Planificador-de-Eventos
npm install
ng serve
```

Abrir en: `http://localhost:4200`

## API externa

Festivos nacionales: [date.nager.at](https://date.nager.at/api/v3/PublicHolidays/{año}/ES)

## Autor

Victor Reviejo Castro — Proyecto final Angular
