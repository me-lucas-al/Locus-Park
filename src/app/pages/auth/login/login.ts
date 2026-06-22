import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario = '';
  senha = '';
  senhaVisivel = false;
  erroLogin = '';

  constructor(private router: Router) {}

  entrar(): void {
    this.erroLogin = '';

    if (!this.usuario.trim() || !this.senha.trim()) {
      this.erroLogin = 'Preencha o usuário e a senha.';
      return;
    }

    // Credenciais fixas por enquanto (substituir por serviço de auth)
    if (this.usuario === 'admin' && this.senha === '123456') {
      this.router.navigate(['/']);
    } else {
      this.erroLogin = 'Usuário ou senha incorretos.';
    }
  }
}