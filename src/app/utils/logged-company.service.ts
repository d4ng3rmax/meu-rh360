import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedCompanyService {
  isValidated(): boolean {
    const companyData = JSON.parse(sessionStorage.getItem('companyData') || '{}');
    return !!companyData.menuValidated;
  }
}
