import { Pipe, PipeTransform } from '@angular/core';
import { Evento, ColorEvento } from '../models/modelos';

// Pipe personalizado: filtra eventos por color
@Pipe({ name: 'filtroEventos', standalone: true })
export class FiltroEventosPipe implements PipeTransform {
  transform(eventos: Evento[], colorFiltro: ColorEvento | 'todos'): Evento[] {
    if (!eventos) return [];
    if (colorFiltro === 'todos') return eventos;
    return eventos.filter(e => e.color === colorFiltro);
  }
}
