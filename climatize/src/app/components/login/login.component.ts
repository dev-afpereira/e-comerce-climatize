// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  login() {
    this.authService.loginWithEmail(this.email, this.password);
  }

  register() {
    this.authService.registerWithEmail(this.email, this.password);
  }
}