import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Perfil } from '../models/modelos';

@Injectable({ providedIn: 'root' })
export class PerfilesService {

  private claveStorage = 'planificador_perfiles';
  private claveActivo  = 'planificador_perfil_activo';

  private perfilesIniciales: Perfil[] = [
    { id: 'p1', nombre: 'Ana García',    email: 'ana@email.com',  avatar: '👩', activo: false },
    { id: 'p2', nombre: 'Luis Martínez', email: 'luis@email.com', avatar: '👨', activo: false },
  ];

  private perfilesSubject     = new BehaviorSubject<Perfil[]>(this.cargarPerfiles());
  private perfilActivoSubject = new BehaviorSubject<Perfil | null>(this.cargarPerfilActivo());

  perfiles$     = this.perfilesSubject.asObservable();
  perfilActivo$ = this.perfilActivoSubject.asObservable();

  obtenerTodos(): Perfil[] {
    return this.perfilesSubject.getValue();
  }

  obtenerPorId(id: string): Perfil | undefined {
    return this.obtenerTodos().find(p => p.id === id);
  }

  crear(datos: Omit<Perfil, 'id' | 'activo'>): Perfil {
    const nuevo: Perfil = { ...datos, id: this.generarId(), activo: false };
    const perfiles = [...this.obtenerTodos(), nuevo];
    this.guardar(perfiles);
    return nuevo;
  }

  actualizar(id: string, cambios: Partial<Perfil>): void {
    const perfiles = this.obtenerTodos().map(p =>
      p.id === id ? { ...p, ...cambios } : p
    );
    this.guardar(perfiles);
  }

  eliminar(id: string): void {
    const perfiles = this.obtenerTodos().filter(p => p.id !== id);
    this.guardar(perfiles);
    if (this.perfilActivoSubject.getValue()?.id === id) {
      this.cerrarSesion();
    }
  }

  activar(id: string): void {
    const perfil = this.obtenerPorId(id);
    if (!perfil) return;
    localStorage.setItem(this.claveActivo, id);
    this.perfilActivoSubject.next({ ...perfil });
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.claveActivo);
    this.perfilActivoSubject.next(null);
  }

  estaActivo(): boolean {
    return this.perfilActivoSubject.getValue() !== null;
  }

  private cargarPerfiles(): Perfil[] {
    try {
      const raw = localStorage.getItem(this.claveStorage);
      return raw ? JSON.parse(raw) : this.perfilesIniciales;
    } catch { return this.perfilesIniciales; }
  }

  private cargarPerfilActivo(): Perfil | null {
    try {
      const id = localStorage.getItem(this.claveActivo);
      if (!id) return null;
      return this.cargarPerfiles().find(p => p.id === id) ?? null;
    } catch { return null; }
  }

  private guardar(perfiles: Perfil[]): void {
    localStorage.setItem(this.claveStorage, JSON.stringify(perfiles));
    this.perfilesSubject.next([...perfiles]);
  }

  private generarId(): string {
    return 'p_' + Date.now().toString(36);
  }
}
