import { Pipe, PipeTransform } from '@angular/core';
import { Evento } from '../models/modelos';

// Pipe personalizado: filtra y ordena eventos de un día concreto
@Pipe({ name: 'eventosPorDia', standalone: true })
export class EventosPorDiaPipe implements PipeTransform {
  transform(eventos: Evento[], fecha: string): Evento[] {
    if (!eventos || !fecha) return [];
    return eventos
      .filter(e => e.fecha === fecha)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
  }
}
