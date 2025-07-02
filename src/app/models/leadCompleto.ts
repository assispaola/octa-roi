import { EntradaCalculo } from './entradaCalculo';
import { SaidaCalculo } from './saidaCalculo';

export interface LeadCompleto extends EntradaCalculo, SaidaCalculo {
  nome: string;
  email: string;
  telefone: string;
  url: string;
  setor: string;
  funcionarios: number;
  dataEnvio: string;

  // extras opcionais de rastreamento
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  fbclid?: string;
}
