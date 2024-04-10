import { LoggedUserService } from '../utils/logged-user.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const logged = inject(LoggedUserService);

  if (logged.isValidated()) {
    return true;
  } else {
    alert('Acesso negado!');
    router.navigate(['']);
    return false;
  }
};
