import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { useRegisterMutation } from '../../../core/domains/auth/auth.hooks';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  errorMessage = '';

  form = {
    companyName: '',
    cnpj: '',
    totalSpots: null as number | null,
    username: '',
    password: '',
    confirmPassword: '',
  };

  private readonly router = inject(Router);
  private readonly registerMutation = useRegisterMutation();
  private readonly toastService = inject(ToastService);

  onSubmit(): void {
    console.log('Register.onSubmit chamado com form:', this.form);
    this.errorMessage = '';

    const { companyName, cnpj, totalSpots, username, password, confirmPassword } = this.form;

    if (!companyName.trim() || !cnpj.trim() || !totalSpots || !username.trim() || !password || !confirmPassword) {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      this.toastService.error(this.errorMessage);
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      this.toastService.error(this.errorMessage);
      return;
    }

    if (password.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      this.toastService.error(this.errorMessage);
      return;
    }

    this.registerMutation.mutate(
      {
        username: username,
        password: password,
        companyName: companyName,
        name: username,
      },
      {
        onSuccess: () => {
          this.toastService.success('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        onError: () => {
          this.errorMessage = 'Erro ao realizar o cadastro. Verifique as informações ou se o usuário já existe.';
          this.toastService.error(this.errorMessage);
        },
      }
    );
  }
}