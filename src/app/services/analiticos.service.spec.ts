import { TestBed } from '@angular/core/testing';
import { AnaliticosService } from '../core/services/analiticos.service';



describe('AnaliticosService', () => {
  let service: AnaliticosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnaliticosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
