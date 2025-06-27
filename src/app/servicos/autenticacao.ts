import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  id: number;
  email: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private usuarioAtualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  // Simular usuários para teste
  private usuarios = [
    { id: 1, email: 'admin@bemestar.com', senha: '123456', nome: 'Administrador' },
    { id: 2, email: 'usuario@bemestar.com', senha: '123456', nome: 'Usuário Teste' },
    
  ];

  constructor() {
    // Verificar se há usuário salvo
    const usuarioSalvo = localStorage.getItem('usuario_atual');
    if (usuarioSalvo) {
      this.usuarioAtualSubject.next(JSON.parse(usuarioSalvo));
    }
  }

  login(email: string, senha: string): boolean {
    const usuario = this.usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
      const usuarioLogado = { id: usuario.id, email: usuario.email, nome: usuario.nome };
      localStorage.setItem('usuario_atual', JSON.stringify(usuarioLogado));
      this.usuarioAtualSubject.next(usuarioLogado);
      return true;
    }
    
    return false;
  }

  logout(): void {
    localStorage.removeItem('usuario_atual');
    this.usuarioAtualSubject.next(null);
  }

  estaAutenticado(): boolean {
    return this.usuarioAtualSubject.value !== null;
  }

  getUsuarioAtual(): Usuario | null {
    return this.usuarioAtualSubject.value;
  }
} 