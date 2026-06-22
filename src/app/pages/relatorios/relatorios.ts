import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstacionamentoService } from '../../core/services/estacionamento';
import { RegistroEstacionamento } from '../../core/models/registro-estacionamento';

interface HoraEntry {
  hora: number;
  count: number;
}

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css',
})
export class Relatorios implements OnInit {
  registrosFinalizados: RegistroEstacionamento[] = [];
  entradasPorHora: HoraEntry[] = [];
  maxEntradas = 1;

  faturamentoTotal = 0;
  tempoMedio = '0h 0m';
  atendimentosConcluidos = 0;

  constructor(private estacionamentoService: EstacionamentoService) {}

  ngOnInit(): void {
    const todos = this.estacionamentoService.listarRegistros();

    this.registrosFinalizados = todos.filter((r) => r.status === 'Finalizado');
    this.atendimentosConcluidos = this.registrosFinalizados.length;

    // Faturamento total
    this.faturamentoTotal = this.registrosFinalizados.reduce(
      (acc, r) => acc + (r.valorTotal ?? 0), 0
    );

    // Tempo médio
    if (this.registrosFinalizados.length > 0) {
      const totalMin = this.registrosFinalizados.reduce(
        (acc, r) => acc + (r.tempoTotalMinutos ?? 0), 0
      );
      const mediaMin = Math.floor(totalMin / this.registrosFinalizados.length);
      const h = Math.floor(mediaMin / 60);
      const m = mediaMin % 60;
      this.tempoMedio = `${h}h ${m}m`;
    }

    // Entradas por hora (todos os registros, não só finalizados)
    const contagem: Record<number, number> = {};
    todos.forEach((r) => {
      const hora = new Date(r.entrada).getHours();
      contagem[hora] = (contagem[hora] ?? 0) + 1;
    });

    // Gera horas de 6h às 22h
    this.entradasPorHora = [];
    for (let h = 6; h <= 22; h++) {
      this.entradasPorHora.push({ hora: h, count: contagem[h] ?? 0 });
    }

    this.maxEntradas = Math.max(1, ...this.entradasPorHora.map((e) => e.count));
  }

  formatarMinutos(minutos?: number): string {
    if (!minutos) return '—';
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${h}h ${m}m`;
  }

  exportarCSV(): void {
    if (this.registrosFinalizados.length === 0) return;
    const sep = ';';

    const escapeField = (value: any) => {
      const s = value === null || value === undefined ? '' : String(value);
      const escaped = s.replace(/"/g, '""');
      const mustQuote = escaped.includes(sep) || escaped.includes('\n') || escaped.includes('"');
      return mustQuote ? `"${escaped}"` : escaped;
    };

    const header = ['Placa', 'Modelo', 'Cor', 'Vaga', 'Entrada', 'Saída', 'Tempo (min)', 'Valor (R$)'].join(sep);
    const linhas = this.registrosFinalizados.map((r) => {
      const entrada = new Date(r.entrada).toLocaleString('pt-BR');
      const saida = r.saida ? new Date(r.saida).toLocaleString('pt-BR') : '';
      const fields = [r.placa, r.modelo, r.cor, r.vaga, entrada, saida, r.tempoTotalMinutos ?? 0, r.valorTotal ?? 0];
      return fields.map((f) => escapeField(f)).join(sep);
    });

    const csv = [header, ...linhas].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}