// ── Evento ────────────────────────────────────────────
export interface Evento {
  id: string;
  titulo: string;
  fecha: string;        // YYYY-MM-DD
  horaInicio: string;   // HH:mm
  horaFin?: string;     // HH:mm
  descripcion?: string;
  color: ColorEvento;
  creadoPor: string;    // id del perfil creador
  participantes: string[]; // ids de perfiles invitados
}

export type ColorEvento = 'azul' | 'verde' | 'rojo' | 'naranja' | 'morado';

// ── Perfil ────────────────────────────────────────────
export interface Perfil {
  id: string;
  nombre: string;
  email: string;
  avatar: string;      // emoji o inicial
  activo: boolean;
}

// ── Festivo (API) ─────────────────────────────────────
export interface Festivo {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
}
