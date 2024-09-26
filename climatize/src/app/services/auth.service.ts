import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private auth: Auth, private router: Router) {
    authState(this.auth).subscribe((user: User | null) => {
      this.isLoggedInSubject.next(!!user);
    });
  }

  // Registro e Login com Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result: { user: User | null }) => {
        console.log("Usuário autenticado:", result.user);
      })
      .catch((error: FirebaseError) => {
        console.error("Erro ao fazer login com Google:", error);
      });
  }

  // Registro com Email e Senha
  registerWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result: { user: User | null }) => {
        console.log("Usuário registrado:", result.user);
      })
      .catch((error: FirebaseError) => {
        console.error("Erro ao registrar com e-mail:", error);
      });
  }

  // Login com Email e Senha
  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: { user: User | null }) => {
        console.log("Usuário autenticado:", result.user);
      })
      .catch((error: FirebaseError) => {
        console.error("Erro ao fazer login com e-mail:", error);
      });
  }

  // Sair
  async logout() {
    await signOut(this.auth);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
