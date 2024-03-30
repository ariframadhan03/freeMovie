import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  showMobileSidebar!: boolean;

  mobileSidebarHandler(): void {
    this.showMobileSidebar = !this.showMobileSidebar;
  }
}
