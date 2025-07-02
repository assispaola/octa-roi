import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RastreamentoService {
  private roteador = inject(Router);

  obterParametrosDeCampanha() {
    const params = this.roteador.parseUrl(this.roteador.url).queryParams;
    return {
      utm_source: params['utm_source'] || '',
      utm_medium: params['utm_medium'] || '',
      utm_campaign: params['utm_campaign'] || '',
      gclid: params['gclid'] || '',
      fbclid: params['fbclid'] || '',
    };
  }
}
