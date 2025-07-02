import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css'],
})
export class ResultadoComponent {
  saidaCalculo: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.saidaCalculo = navigation?.extras?.state;

    if (!this.saidaCalculo) {
      // Se acessarem diretamente a rota /resultado sem dados
      this.router.navigate(['/']);
    }
  }
}
