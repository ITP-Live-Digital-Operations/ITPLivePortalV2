import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'; // Corrected import path for MatSidenav
import { ViewChild } from '@angular/core';

/**
 * @title Autosize sidenav
 */

@Component({
  selector: 'app-charbel-side-nav',
  templateUrl: './charbel-side-nav.component.html',
  styleUrls: ['./charbel-side-nav.component.scss']
})
export class CharbelSideNavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
