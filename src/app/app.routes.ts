import { Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';

// Definição das rotas da aplicação
export const routes: Routes = [
  // Rota padrão: carrega o formulário
  {
    path: '',
    component: FormularioComponent,
  },

  // Rota para a página de resultado (lazy-loaded)
  {
    path: 'resultado',
    loadComponent: () =>
      import('./pages/resultado/resultado.component').then(
        (m) => m.ResultadoComponent
      ),
  },

  // Rota para a página de relatório (lazy-loaded)
  {
    path: 'relatorio',
    loadComponent: () =>
      import('./pages/relatorio/relatorio.component').then(
        (m) => m.RelatorioComponent
      ),
  },

  // Qualquer rota desconhecida redireciona para a home
  {
    path: '**',
    redirectTo: '',
  },
];
