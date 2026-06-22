import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstacionamentoService } from '../../../core/services/estacionamento';
import { VeiculoEstacionado } from '../../../core/models/veiculo-estacionado';

interface ItemCobranca {
  descricao: string;
  valor: number;
}

interface FormaPagamentoOpcao {
  valor: string;
  label: string;
}

@Component({
  selector: 'app-modal-saida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-saida.html',
  styleUrl: './modal-saida.css',
})
export class ModalSaida implements OnChanges {
  @Input() veiculo: VeiculoEstacionado | null = null;
  @Output() fechar = new EventEmitter<void>();
  @Output() confirmado = new EventEmitter<void>();

  agora = new Date();
  tempoDecorrido = '';
  itensCobranca: ItemCobranca[] = [];
  valorBase = 0;
  valorFinal = 0;
  convenio = '';
  formaPagamento = '';
  erro = '';

  formasPagamento: FormaPagamentoOpcao[] = [
    { valor: 'dinheiro', label: 'Dinheiro' },
    { valor: 'pix', label: 'PIX' },
    { valor: 'credito', label: 'Cartão de Crédito' },
    { valor: 'debito', label: 'Cartão de Débito' },
  ];

  constructor(private estacionamentoService: EstacionamentoService) {}

  ngOnChanges(): void {
    if (this.veiculo) {
      this.agora = new Date();
      this.convenio = '';
      this.formaPagamento = '';
      this.erro = '';
      this.calcularTudo();
    }
  }

  calcularTudo(): void {
    if (!this.veiculo) return;

    const entrada = new Date(this.veiculo.horarioEntrada);
    const diffMs = this.agora.getTime() - entrada.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    this.tempoDecorrido = `${h}h ${m}m`;

    // Composição da cobrança
    this.itensCobranca = [];
    const horas = Math.ceil(diffMin / 60);

    if (horas >= 8) {
      const dias = Math.ceil(horas / 8);
      this.valorBase = dias * 60;
      this.itensCobranca.push({ descricao: `Diária (8h ou mais)`, valor: this.valorBase });
    } else {
      this.valorBase = this.estacionamentoService.calcularValor(this.veiculo.horarioEntrada);
      this.itensCobranca.push({ descricao: `${horas}h de permanência`, valor: this.valorBase });
    }

    this.recalcular();
  }

  recalcular(): void {
    const desconto = this.convenio ? Number(this.convenio) / 100 : 0;
    this.valorFinal = this.valorBase * (1 - desconto);
  }

  confirmar(): void {
    this.erro = '';

    if (!this.formaPagamento) {
      this.erro = 'Selecione a forma de pagamento.';
      return;
    }

    if (!this.veiculo) return;

    this.estacionamentoService.registrarSaida(this.veiculo.id);
    this.confirmado.emit();
    this.fechar.emit();
  }
}