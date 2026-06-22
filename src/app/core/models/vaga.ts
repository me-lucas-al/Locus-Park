export interface Vaga {
  id: number;
  numero: number;

  status: 'Livre' | 'Ocupada';

  placa?: string;
  modelo?: string;
  cor?: string;

  horarioEntrada?: Date;
}