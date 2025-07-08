// Envio dos dados

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeadCompleto } from '../../models/leadCompleto';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private urlApi = 'https://sheetdb.io/api/v1/ihvzo74bxj7va';

  constructor(private http: HttpClient) {}

  enviar(lead: LeadCompleto) {
    return this.http.post(this.urlApi, { data: lead });
  }
}
