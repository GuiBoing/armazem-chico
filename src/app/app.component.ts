import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
  title = 'armazem-chico';

  isNavOpen: boolean = false;

  toggleNav() {
    if (!this.isNavOpen) {
      document.getElementById("inside").style.marginLeft = "15rem";
      document.getElementById("sidenav").style.width = "15rem";
    } else {
      document.getElementById("sidenav").style.width = "0";
      document.getElementById("inside").style.marginLeft = "0";
    }
    this.isNavOpen = !this.isNavOpen;
  }
}
