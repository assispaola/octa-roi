import { Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';

export const routes: Routes = [
  {
    path: '',
    component: FormularioComponent,
  },
  {
    path: 'resultado',
    loadComponent: () =>
      import('./pages/resultado/resultado.component').then(
        (m) => m.ResultadoComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
  {
    path: 'relatorio',
    loadComponent: () =>
      import('./pages/relatorio/relatorio.component').then(
        (m) => m.RelatorioComponent
      ),
  },
];
