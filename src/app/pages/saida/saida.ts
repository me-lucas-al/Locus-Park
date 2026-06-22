import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstacionamentoService } from '../../core/services/estacionamento';
import { VeiculoEstacionado } from '../../core/models/veiculo-estacionado';
import { ModalSaida } from '../../shared/components/modal-saida/modal-saida';

@Component({
  selector: 'app-saida',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalSaida],
  templateUrl: './saida.html',
  styleUrl: './saida.css',
})
export class Saida implements OnInit {
  veiculos: VeiculoEstacionado[] = [];
  resultados: VeiculoEstacionado[] = [];
  termoBusca = '';
  buscaFocada = false;

  modalAberto = false;
  veiculoSelecionado: VeiculoEstacionado | null = null;

  constructor(private estacionamentoService: EstacionamentoService) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.veiculos = this.estacionamentoService.listarVeiculos();
  }

  onBusca(): void {
    const busca = this.termoBusca.trim().toLowerCase();
    if (!busca) {
      this.resultados = [];
      return;
    }

    this.resultados = this.veiculos.filter(
      (v) =>
        v.placa.toLowerCase().includes(busca) ||
        v.modelo.toLowerCase().includes(busca)
    );
  }

  selecionarVeiculo(veiculo: VeiculoEstacionado): void {
    this.veiculoSelecionado = veiculo;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.veiculoSelecionado = null;
  }

  onConfirmado(): void {
    this.limparBusca();
    this.carregarVeiculos();
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.resultados = [];
  }

  onBlur(): void {
    // Pequeno delay para permitir clique no resultado antes de perder foco
    setTimeout(() => { this.buscaFocada = false; }, 150);
  }
}