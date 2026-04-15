import { Pipe, PipeTransform } from '@angular/core';

// Pipe personalizado: convierte "09:00" y "10:30" en "1h 30min"
@Pipe({ name: 'duracionEvento', standalone: true })
export class DuracionEventoPipe implements PipeTransform {
  transform(horaInicio: string, horaFin?: string): string {
    if (!horaFin) return '';
    const [h1, m1] = horaInicio.split(':').map(Number);
    const [h2, m2] = horaFin.split(':').map(Number);
    const totalMin = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (totalMin <= 0) return '';
    const horas = Math.floor(totalMin / 60);
    const mins  = totalMin % 60;
    if (horas === 0) return `${mins}min`;
    if (mins === 0)  return `${horas}h`;
    return `${horas}h ${mins}min`;
  }
}
