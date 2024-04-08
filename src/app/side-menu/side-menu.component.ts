import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  isValidated = false;

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    this.isValidated = !!userData.menuValidated;
  }

}
