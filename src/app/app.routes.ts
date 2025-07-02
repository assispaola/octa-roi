import { Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';

export const routes: Routes = [
  {
    path: '',
    component: FormularioComponent,
  },
  {
    path: 'resultado',
    loadComponent: () =>
      import('./components/resultado/resultado.component').then(
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
      import('./components/relatorio/relatorio.component').then(
        (m) => m.RelatorioComponent
      ),
  },
];
