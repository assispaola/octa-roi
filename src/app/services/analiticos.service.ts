// Disparo de evento de conversão

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnaliticosService {
  registrarConversao() {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: 'conversao_lead' });
  }
}
