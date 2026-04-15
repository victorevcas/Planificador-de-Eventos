import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento, ColorEvento, Perfil } from '../../models/modelos';
import { EventosService } from '../../services/eventos.service';
import { PerfilesService } from '../../services/perfiles.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  modoEdicion = false;
  eventoId: string | null = null;

  opcionesColor: ColorEvento[] = ['azul', 'verde', 'rojo', 'naranja', 'morado'];
  etiquetasColor: Record<ColorEvento, string> = {
    azul: 'Azul', verde: 'Verde', rojo: 'Rojo', naranja: 'Naranja', morado: 'Morado'
  };

  perfiles: Perfil[] = [];
  perfilActivo: Perfil | null = null;

  datos: Partial<Evento> = {
    titulo: '',
    fecha: '',
    horaInicio: '09:00',
    horaFin: '',
    descripcion: '',
    color: 'azul',
    participantes: []
  };

  constructor(
    private eventosService: EventosService,
    private perfilesService: PerfilesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Cargar perfiles disponibles
    this.perfiles = this.perfilesService.obtenerTodos();
    this.perfilesService.perfilActivo$.subscribe(p => {
      this.perfilActivo = p;
      if (p) this.datos.creadoPor = p.id;
    });

    // Modo edición si hay :id en la ruta
    this.eventoId = this.route.snapshot.paramMap.get('id');
    if (this.eventoId) {
      this.modoEdicion = true;
      const existente = this.eventosService.obtenerPorId(this.eventoId);
      if (existente) {
        this.datos = { ...existente, participantes: [...existente.participantes] };
      } else {
        this.router.navigate(['/calendario']);
      }
    }

    // Pre-rellena fecha si viene del calendario (?fecha=YYYY-MM-DD)
    const fechaParam = this.route.snapshot.queryParamMap.get('fecha');
    if (fechaParam && !this.modoEdicion) {
      this.datos.fecha = fechaParam;
    }
  }

  // Gestión de participantes — checkbox binding
  toggleParticipante(id: string): void {
    const lista = this.datos.participantes ?? [];
    const idx = lista.indexOf(id);
    if (idx === -1) lista.push(id);
    else lista.splice(idx, 1);
    this.datos.participantes = [...lista];
  }

  esParticipante(id: string): boolean {
    return (this.datos.participantes ?? []).includes(id);
  }

  horaFinValida(): boolean {
    if (!this.datos.horaFin || !this.datos.horaInicio) return true;
    return this.datos.horaFin > this.datos.horaInicio;
  }

  alEnviar(form: NgForm): void {
    if (form.invalid || !this.horaFinValida()) return;

    const payload = this.datos as Omit<Evento, 'id'>;

    if (this.modoEdicion && this.eventoId) {
      this.eventosService.actualizar(this.eventoId, payload);
    } else {
      this.eventosService.crear(payload);
    }
    this.router.navigate(['/calendario']);
  }

  alCancelar(): void {
    this.router.navigate(['/calendario']);
  }

  // trackBy para *ngFor de perfiles
  trackByPerfil(_: number, p: Perfil): string { return p.id; }
}
