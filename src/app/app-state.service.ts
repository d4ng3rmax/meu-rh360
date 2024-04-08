import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private companyConfiguredSource = new BehaviorSubject<boolean>(false);
  companyConfigured$ = this.companyConfiguredSource.asObservable();

  setCompanyConfigured(isConfigured: boolean): void {
    this.companyConfiguredSource.next(isConfigured);
  }
}
