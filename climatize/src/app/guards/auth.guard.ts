import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      take(1),  // Pegue apenas o primeiro valor e complete a observação
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;  // Permitir navegação
        } else {
          this.router.navigate(['/login']);  // Redirecionar para login se não autenticado
          return false;
        }
      })
    );
  }
}
