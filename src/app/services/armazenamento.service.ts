// src/app/servicos/armazenamento.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArmazenamentoService {
  salvar<T>(chave: string, valor: T): void {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  recuperar<T>(chave: string): T | null {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : null;
  }

  remover(chave: string): void {
    localStorage.removeItem(chave);
  }

  limparTudo(): void {
    localStorage.clear();
  }
}
