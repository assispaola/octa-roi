// Envio dos dados

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeadCompleto } from '../models/entradaCalculo';

@Injectable({ providedIn: 'root' })
export class LeadService {
  private urlApi = 'https://sua-api-ou-mock.io/leads'; // Substitua aqui pelo seu endpoint

  constructor(private http: HttpClient) {}

  enviar(lead: LeadCompleto) {
    return this.http.post(this.urlApi, lead);
  }
}
