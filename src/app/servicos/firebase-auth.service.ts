import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { environment } from '../../environments/environment';

export interface Usuario {
  id: string;
  email: string;
  nome?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private app;
  private auth;
  private usuarioAtualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
    
    // Escutar mudanças na autenticação
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const usuario: Usuario = {
          id: user.uid,
          email: user.email || '',
          nome: user.displayName || undefined
        };
        this.usuarioAtualSubject.next(usuario);
      } else {
        this.usuarioAtualSubject.next(null);
      }
    });
  }

  async login(email: string, senha: string): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, senha);
      console.log('Login realizado com sucesso:', userCredential.user.email);
      return true;
    } catch (error: any) {
      console.error('Erro no login:', error.message);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async registrar(email: string, senha: string, nome?: string): Promise<boolean> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, senha);
      
      // Atualizar displayName se fornecido
      if (nome && userCredential.user) {
        // Aqui você pode adicionar lógica para atualizar o displayName
        console.log('Usuário registrado com sucesso:', userCredential.user.email);
      }
      
      return true;
    } catch (error: any) {
      console.error('Erro no registro:', error.message);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Logout realizado com sucesso');
    } catch (error: any) {
      console.error('Erro no logout:', error.message);
      throw error;
    }
  }

  estaAutenticado(): boolean {
    return this.usuarioAtualSubject.value !== null;
  }

  getUsuarioAtual(): Usuario | null {
    return this.usuarioAtualSubject.value;
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado';
      case 'auth/wrong-password':
        return 'Senha incorreta';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/weak-password':
        return 'Senha muito fraca';
      case 'auth/email-already-in-use':
        return 'Email já está em uso';
      default:
        return 'Erro na autenticação';
    }
  }
} 