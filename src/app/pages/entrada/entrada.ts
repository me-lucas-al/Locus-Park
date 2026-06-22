import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstacionamentoService } from '../../core/services/estacionamento';
import { Vaga } from '../../core/models/vaga';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrada.html',
  styleUrl: './entrada.css',
})
export class Entrada implements OnInit, OnDestroy {
  vagasDisponiveis: Vaga[] = [];
  vagasLivres = 0;
  vagasOcupadas = 0;
  totalVagas = 0;

  horaAtual = '';
  dataAtual = '';
  toastVisivel = false;

  private clockInterval: ReturnType<typeof setInterval> | null = null;
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  entrada = {
    placa: '',
    modelo: '',
    tipo: 'Carro',
    vaga: 0,
    mensalista: false,
  };

  constructor(private estacionamentoService: EstacionamentoService) {}

  ngOnInit(): void {
    this.carregarDados();
    this.atualizarRelogio();
    this.clockInterval = setInterval(() => this.atualizarRelogio(), 1000);
  }

  ngOnDestroy(): void {
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }

  carregarDados(): void {
    this.vagasLivres = this.estacionamentoService.getVagasLivres();
    this.vagasOcupadas = this.estacionamentoService.getVagasOcupadas();
    this.totalVagas = this.estacionamentoService.getTotalVagas();
    this.vagasDisponiveis = this.estacionamentoService
      .listarVagas()
      .filter((v) => v.status === 'Livre');
  }

  atualizarRelogio(): void {
    const agora = new Date();

    this.horaAtual = agora.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    this.dataAtual = agora.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    });

    // Capitaliza primeira letra
    this.dataAtual =
      this.dataAtual.charAt(0).toUpperCase() + this.dataAtual.slice(1);
  }

  confirmarEntrada(): void {
    if (
      !this.entrada.placa.trim() ||
      !this.entrada.modelo.trim() ||
      !this.entrada.vaga
    ) {
      return;
    }

    this.estacionamentoService.registrarEntrada({
      placa: this.entrada.placa.toUpperCase().trim(),
      modelo: this.entrada.modelo.trim(),
      cor: '',
      vaga: Number(this.entrada.vaga),
    });

    this.limparFormulario();
    this.carregarDados();
    this.exibirToast();
  }

  limparFormulario(): void {
    this.entrada = {
      placa: '',
      modelo: '',
      tipo: 'Carro',
      vaga: 0,
      mensalista: false,
    };
  }

  exibirToast(): void {
    this.toastVisivel = true;
    this.toastTimeout = setTimeout(() => {
      this.toastVisivel = false;
    }, 3000);
  }
}