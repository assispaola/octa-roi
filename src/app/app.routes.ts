import { Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: FormularioComponent,
  },
  { path: 'dashboard', component: DashboardComponent },
];
