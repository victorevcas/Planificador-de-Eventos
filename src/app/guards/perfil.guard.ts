import { CanActivateFn } from '@angular/router';

// Guard funcional: permite siempre acceder a /perfil
// Es la página donde el usuario selecciona o crea su perfil
export const perfilGuard: CanActivateFn = () => true;
