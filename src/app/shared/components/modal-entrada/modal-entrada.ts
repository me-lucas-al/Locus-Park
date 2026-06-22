import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstacionamentoService } from '../../../core/services/estacionamento';

@Component({
  selector: 'app-modal-entrada',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-entrada.html',
  styleUrl: './modal-entrada.css',
})
export class ModalEntrada {
  @Output() fechar = new EventEmitter<void>();
  @Output() confirmado = new EventEmitter<void>();

  erro = '';

  dados = {
    vaga: null as number | null,
    placa: '',
    tipo: 'Carro',
    modelo: '',
    mensalista: false,
  };

  constructor(private estacionamentoService: EstacionamentoService) {}

  confirmar(): void {
    this.erro = '';

    if (!this.dados.vaga || !this.dados.placa.trim() || !this.dados.modelo.trim()) {
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const vagaOcupada = this.estacionamentoService
      .listarVagas()
      .find((v) => v.numero === this.dados.vaga && v.status === 'Ocupada');

    if (vagaOcupada) {
      this.erro = `A vaga ${this.dados.vaga} já está ocupada.`;
      return;
    }

    this.estacionamentoService.registrarEntrada({
      placa: this.dados.placa.toUpperCase().trim(),
      modelo: this.dados.modelo.trim(),
      cor: '',
      vaga: Number(this.dados.vaga),
    });

    this.limpar();
    this.confirmado.emit();
    this.fechar.emit();
  }

  limpar(): void {
    this.dados = { vaga: null, placa: '', tipo: 'Carro', modelo: '', mensalista: false };
    this.erro = '';
  }
}