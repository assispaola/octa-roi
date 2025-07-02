import { Injectable } from '@angular/core';
import { EntradaCalculo } from '../../models/entradaCalculo';
import { SaidaCalculo } from '../../models/saidaCalculo';

@Injectable({ providedIn: 'root' })
export class SaidaCalculoService {
  private readonly TAXA_AUTOMACAO = 0.8;
  private readonly TAXA_MELHORIA_OPORTUNIDADES = 0.8;
  private readonly TAXA_CONVERSAO = 0.18;

  calcular(dados: EntradaCalculo): SaidaCalculo {
    const {
      salarioEstimado,
      atendentes,
      repeticao,
      oportunidades,
      ticketMedio,
    } = dados;

    // 1) Diagnóstico de Atendimento
    const custoMensal = salarioEstimado * atendentes;
    const economia = custoMensal * (repeticao / 100) * this.TAXA_AUTOMACAO;
    const roi = (economia / custoMensal) * 100;

    // 2) Diagnóstico de Vendas
    const oppMelhoradas =
      oportunidades * (1 + this.TAXA_MELHORIA_OPORTUNIDADES);
    const adicionais = oppMelhoradas - oportunidades;
    const novasVendas = Math.round(adicionais * this.TAXA_CONVERSAO);
    const receita = novasVendas * ticketMedio;

    return {
      economia: Number(economia.toFixed(2)),
      roi: Number(roi.toFixed(2)),
      novasVendas,
      receita: Number(receita.toFixed(2)),
    };
  }
}
