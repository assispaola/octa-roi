import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ArmazenamentoService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  salvar(chave: string, valor: any): void {
    if (this.isBrowser) {
      try {
        const valorString = JSON.stringify(valor);
        localStorage.setItem(chave, valorString);
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
      }
    }
  }

  obter<T>(chave: string): T | null {
    if (this.isBrowser) {
      try {
        const valor = localStorage.getItem(chave);
        return valor ? JSON.parse(valor) : null;
      } catch (error) {
        console.error('Erro ao obter do localStorage:', error);
        return null;
      }
    }
    return null;
  }

  remover(chave: string): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(chave);
      } catch (error) {
        console.error('Erro ao remover do localStorage:', error);
      }
    }
  }

  limpar(): void {
    if (this.isBrowser) {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Erro ao limpar localStorage:', error);
      }
    }
  }

  existe(chave: string): boolean {
    if (this.isBrowser) {
      try {
        return localStorage.getItem(chave) !== null;
      } catch (error) {
        console.error('Erro ao verificar existência no localStorage:', error);
        return false;
      }
    }
    return false;
  }

  obterChaves(): string[] {
    if (this.isBrowser) {
      try {
        return Object.keys(localStorage);
      } catch (error) {
        console.error('Erro ao obter chaves do localStorage:', error);
        return [];
      }
    }
    return [];
  }

  tamanho(): number {
    if (this.isBrowser) {
      try {
        return localStorage.length;
      } catch (error) {
        console.error('Erro ao obter tamanho do localStorage:', error);
        return 0;
      }
    }
    return 0;
  }
}
