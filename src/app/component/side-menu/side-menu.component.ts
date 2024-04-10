import { Component, OnInit } from '@angular/core';
import { LoggedCompanyService } from '../../utils/logged-company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  isValidated = false;

  constructor(private router: Router, private LoggedCompanyService: LoggedCompanyService) { }

  ngOnInit(): void {
    this.isValidated = this.LoggedCompanyService.isValidated();
  }

  navigateHome(event: MouseEvent): void {
    event.preventDefault();

    const confirmation = confirm('Tem certeza que deseja voltar e iniciar o processo? Os dados serão perdidos.');
    if (confirmation) {
      this.router.navigate(['/register']);
    }
  }

}
