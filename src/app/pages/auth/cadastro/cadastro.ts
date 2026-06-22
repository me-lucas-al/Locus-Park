import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  senhaVisivel = false;
  confirmarSenhaVisivel = false;
  erro = '';

  form = {
    nomeEmpresa: '',
    cnpj: '',
    totalVagas: null as number | null,
    nomeUsuario: '',
    senha: '',
    confirmarSenha: '',
  };

  constructor(private router: Router) {}

  concluir(): void {
    this.erro = '';

    const { nomeEmpresa, cnpj, totalVagas, nomeUsuario, senha, confirmarSenha } = this.form;

    if (!nomeEmpresa.trim() || !cnpj.trim() || !totalVagas || !nomeUsuario.trim() || !senha || !confirmarSenha) {
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    if (senha !== confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    if (senha.length < 6) {
      this.erro = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    // Aqui futuramente chama o serviço de cadastro
    // Por ora redireciona para o login
    this.router.navigate(['/login']);
  }
}