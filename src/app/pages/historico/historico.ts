import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstacionamentoService } from '../../core/services/estacionamento';
import { RegistroEstacionamento } from '../../core/models/registro-estacionamento';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico.html',
  styleUrl: './historico.css',
})
export class Historico implements OnInit {
  registros: RegistroEstacionamento[] = [];

  termoBusca = '';
  filtroData = '';
  filtroStatus = '';

  modalAberto = false;
  registroSelecionado: RegistroEstacionamento | null = null;

  constructor(private estacionamentoService: EstacionamentoService) {}

  ngOnInit(): void {
    this.registros = this.estacionamentoService.listarRegistros();
  }

  get registrosFiltrados(): RegistroEstacionamento[] {
    return this.registros.filter((r) => {
      const busca = this.termoBusca.trim().toLowerCase();
      const matchBusca =
        !busca ||
        r.placa.toLowerCase().includes(busca) ||
        r.modelo.toLowerCase().includes(busca);

      const matchStatus = !this.filtroStatus || r.status === this.filtroStatus;

      const matchData =
        !this.filtroData ||
        new Date(r.entrada).toISOString().slice(0, 10) === this.filtroData;

      return matchBusca && matchStatus && matchData;
    });
  }

  calcularTempo(registro: RegistroEstacionamento): string {
    const fim = registro.saida ? new Date(registro.saida) : new Date();
    const inicio = new Date(registro.entrada);
    const minutos = Math.floor((fim.getTime() - inicio.getTime()) / 60000);
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h ${mins}m`;
  }

  formatarMinutos(minutos?: number): string {
    if (!minutos) return '—';
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${h}h ${m}m`;
  }

  abrirDetalhes(registro: RegistroEstacionamento): void {
    this.registroSelecionado = registro;
    this.modalAberto = true;
  }

  fecharDetalhes(): void {
    this.registroSelecionado = null;
    this.modalAberto = false;
  }
}