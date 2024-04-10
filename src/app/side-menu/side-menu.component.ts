import { Component, OnInit } from '@angular/core';
import { LoggedService } from '../utils/logged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  isValidated = false;

  constructor(private router: Router, private LoggedService: LoggedService) { }

  ngOnInit(): void {
    this.isValidated = this.LoggedService.isValidated();
  }

  navigateHome(event: MouseEvent): void {
    event.preventDefault();

    const confirmation = confirm('Tem certeza que deseja voltar e iniciar o processo? Os dados serão perdidos.');
    if (confirmation) {
      this.router.navigate(['/register']);
    }
  }

}
