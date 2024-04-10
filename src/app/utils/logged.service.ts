import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {
  isValidated(): boolean {
    const companyData = JSON.parse(sessionStorage.getItem('companyData') || '{}');
    return !!companyData.menuValidated;
  }
}
