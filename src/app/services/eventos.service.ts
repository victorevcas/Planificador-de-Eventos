import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Evento, Festivo } from '../models/modelos';

@Injectable({ providedIn: 'root' })
export class EventosService {

  private claveStorage = 'planificador_eventos';
  private apiUrl = 'https://date.nager.at/api/v3/PublicHolidays';

  private eventosSubject = new BehaviorSubject<Evento[]>(this.cargarEventos());
  eventos$ = this.eventosSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerTodos(): Evento[] {
    return this.eventosSubject.getValue();
  }

  obtenerPorId(id: string): Evento | undefined {
    return this.obtenerTodos().find(e => e.id === id);
  }

  obtenerPorFecha(fecha: string): Evento[] {
    return this.obtenerTodos()
      .filter(e => e.fecha === fecha)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
  }

  crear(datos: Omit<Evento, 'id'>): Evento {
    const nuevo: Evento = { ...datos, id: this.generarId() };
    const eventos = [...this.obtenerTodos(), nuevo];
    this.guardar(eventos);
    return nuevo;
  }

  actualizar(id: string, cambios: Partial<Evento>): Evento | null {
    const eventos = this.obtenerTodos().map(e =>
      e.id === id ? { ...e, ...cambios } : e
    );
    this.guardar(eventos);
    return eventos.find(e => e.id === id) ?? null;
  }

  eliminar(id: string): void {
    const eventos = this.obtenerTodos().filter(e => e.id !== id);
    this.guardar(eventos);
  }

  obtenerFestivos(anio: number, pais: string = 'ES'): Observable<Festivo[]> {
    return this.http
      .get<Festivo[]>(`${this.apiUrl}/${anio}/${pais}`)
      .pipe(catchError(() => of([])));
  }

  private cargarEventos(): Evento[] {
    try {
      const raw = localStorage.getItem(this.claveStorage);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  private guardar(eventos: Evento[]): void {
    localStorage.setItem(this.claveStorage, JSON.stringify(eventos));
    // Emitir nueva copia del array para que el BehaviorSubject detecte el cambio
    this.eventosSubject.next([...eventos]);
  }

  private generarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
}
