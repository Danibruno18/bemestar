import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../../servicos/firebase-auth.service';
import { Router } from '@angular/router';

@Component({    
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: FirebaseAuthService,
    private router: Router) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async logar() {
    if (this.formLogin.valid) {
      this.loading = true;
      const { email, senha } = this.formLogin.value;
      
      try {
        await this.authService.login(email, senha);
        console.log('Login realizado com sucesso!');
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        console.error('Erro no login:', error.message);
        alert(error.message);
      } finally {
        this.loading = false;
      }
    }
  }
}