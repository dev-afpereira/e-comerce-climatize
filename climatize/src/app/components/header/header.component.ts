import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedIn: boolean = false; // Variável para armazenar o estado de login

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$; // Assinando o Observable do estado de login
  }

  ngOnInit() {
    // Assinando o observable para capturar mudanças no estado de login
    this.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }

  openLogin() {
    this.router.navigate(['/login']);
  }
}
