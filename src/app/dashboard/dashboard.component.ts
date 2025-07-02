import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, MatCardModule, NgxChartsModule],
})
export class DashboardComponent {
  estatisticas = {
    totalSimulacoes: 124,
    mediaROI: 42.5,
    economiaTotal: 195000,
    simulacoesPorSetor: [
      { name: 'Comércio', value: 50 },
      { name: 'Tecnologia', value: 38 },
      { name: 'Educação', value: 21 },
      { name: 'Outros', value: 15 },
    ],
  };
}
