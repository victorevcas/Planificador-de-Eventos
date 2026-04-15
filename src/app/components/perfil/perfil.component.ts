import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Perfil } from '../../models/modelos';
import { PerfilesService } from '../../services/perfiles.service';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  perfiles: Perfil[] = [];
  perfilActivo: Perfil | null = null;
  mostrarFormNuevo = false;

  avatares = ['👤', '👩', '👨', '🧑', '👧', '👦', '🧔', '👱', '🧒'];
  nuevoPerfilDatos = { nombre: '', email: '', avatar: '👤' };

  constructor(
    private perfilesService: PerfilesService,
    private eventosService: EventosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.perfilesService.perfiles$.subscribe(p => {
      this.perfiles = p;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
    this.perfilesService.perfilActivo$.subscribe(p => {
      this.perfilActivo = p;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }

  totalEventos(perfilId: string): number {
    return this.eventosService.obtenerTodos()
      .filter(e => e.creadoPor === perfilId || e.participantes?.includes(perfilId))
      .length;
  }

  activarPerfil(id: string): void {
    this.perfilesService.activar(id);
    this.router.navigate(['/calendario']);
  }

  cerrarSesion(): void {
    this.perfilesService.cerrarSesion();
  }

  eliminarPerfil(id: string): void {
    if (confirm('¿Eliminar este perfil? Sus eventos no se eliminarán.')) {
      this.perfilesService.eliminar(id);
    }
  }

  alCrearPerfil(form: NgForm): void {
    if (form.invalid) return;
    this.perfilesService.crear({
      nombre: this.nuevoPerfilDatos.nombre,
      email: this.nuevoPerfilDatos.email,
      avatar: this.nuevoPerfilDatos.avatar
    });
    this.nuevoPerfilDatos = { nombre: '', email: '', avatar: '👤' };
    this.mostrarFormNuevo = false;
    form.resetForm();
  }

  trackByPerfil(_: number, p: Perfil): string { return p.id; }
}
