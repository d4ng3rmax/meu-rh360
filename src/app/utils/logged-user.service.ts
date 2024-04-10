import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  isValidated(): boolean {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    return !!userData.fullname;
  }
}
