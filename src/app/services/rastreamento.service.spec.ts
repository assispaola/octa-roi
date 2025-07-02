import { TestBed } from '@angular/core/testing';
import { RastreamentoService } from '../core/services/rastreamento.service';


describe('RastreamentoService', () => {
  let service: RastreamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RastreamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
