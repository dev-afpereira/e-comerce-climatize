// register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Registrar-se com Email e Senha
  register() {
    this.authService.registerWithEmail(this.email, this.password)
      .then(() => {
        console.log('Registro bem-sucedido');
        this.router.navigate(['/dashboard']);  // Redirecionar após o registro
      })
      .catch((error) => {
        console.error('Erro no registro:', error);
      });
  }

  // Registrar-se com Google
  registerWithGoogle() {
    this.authService.loginWithGoogle()
      .then(() => {
        console.log('Registro com Google bem-sucedido');
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('Erro no registro com Google:', error);
      });
  }
}