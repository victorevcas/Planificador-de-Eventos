# 📅 Planificador de Eventos

Aplicación de calendario tipo Google Calendar desarrollada con **Angular 21** (standalone components).

## Capturas de pantalla
<img width="1098" height="848" alt="image" src="https://github.com/user-attachments/assets/ea27eebe-a46e-4e4d-8ae3-1ca93146ea34" />
<img width="1219" height="889" alt="image" src="https://github.com/user-attachments/assets/d8826f93-79e4-434e-b5b0-af7d00124bb8" />
<img width="1233" height="659" alt="image" src="https://github.com/user-attachments/assets/3d7a8e7d-da52-4521-9968-c3fc2b6b1211" />


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

Victor Reviejo Castro — Proyecto final Angular - Planificador de eventos
