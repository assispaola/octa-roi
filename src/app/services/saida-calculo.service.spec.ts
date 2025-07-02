import { TestBed } from '@angular/core/testing';
import {SaidaCalculoService} from './saida-calculo.service';

describe('SaidaCalculoService', () => {
  let service: SaidaCalculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaidaCalculoService);
  });

  it('deve calcular corretamente economia e roi', () => {
    const resultado = service.calcular({
      atendentes: 10,
      repeticao: 50, // 50%
      salarioEstimado: 2000,
      visitasMensais: 0,
      interessadosMensais: 0,
      oportunidades: 100,
      vendasMensais: 0,
      ticketMedio: 1000,
    });
    expect(resultado.economia).toBeGreaterThan(0);
    expect(resultado.roi).toBeGreaterThan(0);
    expect(resultado.novasVendas).toBeGreaterThan(0);
    expect(resultado.receita).toBeGreaterThan(0);
  });
});
