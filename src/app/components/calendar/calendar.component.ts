import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Evento, Festivo, ColorEvento, Perfil } from '../../models/modelos';
import { EventosService } from '../../services/eventos.service';
import { PerfilesService } from '../../services/perfiles.service';
import { EventosPorDiaPipe } from '../../pipes/eventos-por-dia.pipe';
import { FiltroEventosPipe } from '../../pipes/filtro-eventos.pipe';

interface DiaCalendario {
  fecha: string;
  numero: number;
  esMesActual: boolean;
  esHoy: boolean;
  esFestivo: boolean;
  nombreFestivo?: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterLink, EventosPorDiaPipe, FiltroEventosPipe],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  anio = new Date().getFullYear();
  mes  = new Date().getMonth();

  semanas: DiaCalendario[][] = [];
  eventos: Evento[] = [];
  festivos: Festivo[] = [];

  // Filtro de color activo
  colorFiltro: ColorEvento | 'todos' = 'todos';
  opcionesColor: Array<{ valor: ColorEvento | 'todos'; etiqueta: string }> = [
    { valor: 'todos',    etiqueta: 'Todos' },
    { valor: 'azul',     etiqueta: '🔵 Azul' },
    { valor: 'verde',    etiqueta: '🟢 Verde' },
    { valor: 'rojo',     etiqueta: '🔴 Rojo' },
    { valor: 'naranja',  etiqueta: '🟠 Naranja' },
    { valor: 'morado',   etiqueta: '🟣 Morado' },
  ];

  // Perfil activo para bienvenida
  perfilActivo: Perfil | null = null;

  diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  get etiquetaMes(): string {
    return new Date(this.anio, this.mes, 1)
      .toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  }

  // Contador: eventos del mes actual con el filtro aplicado
  get totalEventosMes(): number {
    const prefijo = `${this.anio}-${String(this.mes + 1).padStart(2, '0')}`;
    const eventosMes = this.eventos.filter(e => e.fecha.startsWith(prefijo));
    if (this.colorFiltro === 'todos') return eventosMes.length;
    return eventosMes.filter(e => e.color === this.colorFiltro).length;
  }

  constructor(
    private eventosService: EventosService,
    private perfilesService: PerfilesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Suscripción reactiva a eventos
    this.eventosService.eventos$.subscribe(eventos => {
      this.eventos = eventos;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });

    // Suscripción al perfil activo para mensaje de bienvenida
    this.perfilesService.perfilActivo$.subscribe(p => {
      this.perfilActivo = p;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });

    this.cargarFestivos();
  }

  cargarFestivos(): void {
    this.eventosService.obtenerFestivos(this.anio).subscribe(data => {
      this.festivos = data;
      this.construirCalendario();
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  construirCalendario(): void {
    const primerDia = new Date(this.anio, this.mes, 1);
    const ultimoDia = new Date(this.anio, this.mes + 1, 0);
    const offset    = (primerDia.getDay() + 6) % 7;
    const dias: DiaCalendario[] = [];

    for (let i = offset - 1; i >= 0; i--) {
      dias.push(this.crearDia(new Date(this.anio, this.mes, -i), false));
    }
    for (let d = 1; d <= ultimoDia.getDate(); d++) {
      dias.push(this.crearDia(new Date(this.anio, this.mes, d), true));
    }
    for (let d = 1; dias.length < 42; d++) {
      dias.push(this.crearDia(new Date(this.anio, this.mes + 1, d), false));
    }

    this.semanas = [];
    for (let i = 0; i < dias.length; i += 7) {
      this.semanas.push(dias.slice(i, i + 7));
    }
  }

  private fechaStr(d: Date): string {
    const y  = d.getFullYear();
    const m  = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }

  private crearDia(fecha: Date, esMesActual: boolean): DiaCalendario {
    const f   = this.fechaStr(fecha);
    const hoy = this.fechaStr(new Date());
    const festivo = this.festivos.find(fv => fv.date === f);
    return {
      fecha: f,
      numero: fecha.getDate(),
      esMesActual,
      esHoy: f === hoy,
      esFestivo: !!festivo,
      nombreFestivo: festivo?.localName
    };
  }

  trackBySemana(index: number): number { return index; }
  trackByDia(_: number, dia: DiaCalendario): string { return dia.fecha; }
  trackByColor(_: number, op: { valor: string }): string { return op.valor; }

  mesAnterior(): void {
    if (this.mes === 0) { this.mes = 11; this.anio--; }
    else this.mes--;
    this.cargarFestivos();
  }

  mesSiguiente(): void {
    if (this.mes === 11) { this.mes = 0; this.anio++; }
    else this.mes++;
    this.cargarFestivos();
  }

  irHoy(): void {
    this.anio = new Date().getFullYear();
    this.mes  = new Date().getMonth();
    this.cargarFestivos();
  }

  alClickDia(dia: DiaCalendario): void {
    this.router.navigate(['/eventos/nuevo'], { queryParams: { fecha: dia.fecha } });
  }

  alClickEvento(evento: Evento, $e: MouseEvent): void {
    $e.stopPropagation();
    this.router.navigate(['/eventos', evento.id]);
  }
}
