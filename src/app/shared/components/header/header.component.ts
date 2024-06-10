import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatMenuModule, LogoComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userName: string | null;
  isLoggedIn: boolean;

  constructor(public auth: AuthService) {
    this.userName = this.auth.getUserName();
    this.isLoggedIn = auth.isLoggedIn();
  }

  openMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.remove('hidden');
    }
  }

  closeMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
    }
  }
}
