import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Evento, Perfil } from '../../models/modelos';
import { EventosService } from '../../services/eventos.service';
import { PerfilesService } from '../../services/perfiles.service';
import { DuracionEventoPipe } from '../../pipes/duracion-evento.pipe';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DuracionEventoPipe],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  evento: Evento | undefined;
  participantes: Perfil[] = [];
  creador: Perfil | undefined;

  etiquetasColor: Record<string, string> = {
    azul: 'Azul', verde: 'Verde', rojo: 'Rojo', naranja: 'Naranja', morado: 'Morado'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventosService: EventosService,
    private perfilesService: PerfilesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.evento = this.eventosService.obtenerPorId(id);
    if (!this.evento) { this.router.navigate(['/calendario']); return; }

    // Carga creador y participantes desde el servicio de perfiles
    this.creador = this.perfilesService.obtenerPorId(this.evento.creadoPor);
    this.participantes = (this.evento.participantes ?? [])
      .map(pid => this.perfilesService.obtenerPorId(pid))
      .filter(Boolean) as Perfil[];
  }

  get fechaFormateada(): string {
    if (!this.evento) return '';
    const [y, m, d] = this.evento.fecha.split('-').map(Number);
    return new Date(y, m - 1, d)
      .toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  alEliminar(): void {
    if (!this.evento) return;
    if (confirm(`¿Eliminar "${this.evento.titulo}"?`)) {
      this.eventosService.eliminar(this.evento.id);
      this.router.navigate(['/calendario']);
    }
  }

  // trackBy para *ngFor de participantes
  trackByPerfil(_: number, p: Perfil): string { return p.id; }
}
