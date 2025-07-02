import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { SharedUiModule } from '../../shared/shared-ui.module';
import { RastreamentoService } from '../../core/services/rastreamento.service';
import { SaidaCalculoService } from '../../core/services/saida-calculo.service';
import { EntradaCalculo } from '../../models/entradaCalculo';
import { LeadCompleto } from '../../models/leadCompleto';
import { SaidaCalculo } from '../../models/saidaCalculo';
import { Router } from '@angular/router';
import { ArmazenamentoService } from '../../core/services/armazenamento.service';
import { LeadService } from '../../core/services/lead.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [SharedUiModule],
})
export class FormularioComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  formularioEmpresa!: FormGroup;
  formularioOperacao!: FormGroup;
  formularioVendas!: FormGroup;
  saidaCalculo: SaidaCalculo | null = null;
  rastreamento: any = {};
  mostrarLegenda = false;

  constructor(
    private fb: FormBuilder,
    private rastreamentoService: RastreamentoService,
    private saidaCalculoService: SaidaCalculoService,
    private router: Router,
    private armazenamentoService: ArmazenamentoService,
    private leadService: LeadService
  ) {}

  ngOnInit(): void {
    this.formularioEmpresa = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      url: ['', Validators.required],
      setor: ['', Validators.required],
      funcionarios: [null, [Validators.required, Validators.min(1)]],
    });

    this.formularioOperacao = this.fb.group({
      atendentes: [null, [Validators.required, Validators.min(1)]],
      repeticao: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      salarioEstimado: [null, [Validators.required, Validators.min(0)]],
    });

    this.formularioVendas = this.fb.group({
      visitasMensais: [null, [Validators.required, Validators.min(0)]],
      interessadosMensais: [null, [Validators.required, Validators.min(0)]],
      oportunidades: [null, [Validators.required, Validators.min(0)]],
      vendasMensais: [null, [Validators.required, Validators.min(0)]],
      ticketMedio: [null, [Validators.required, Validators.min(0)]],
      crescimentoMensal: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });

    this.rastreamento = this.rastreamentoService.obterParametrosDeCampanha();

    this.armazenamentoService.salvar('dadosRelatorio', {
      setor: this.formularioEmpresa.value.setor,
      repeticao: this.formularioOperacao.value.repeticao,
      crescimento: this.formularioVendas.value.crescimentoMensal,
    });
  }

  irParaProximoStep(): void {
    this.stepper.next();
  }

  finalizarFormulario(): void {
    if (
      this.formularioEmpresa.invalid ||
      this.formularioOperacao.invalid ||
      this.formularioVendas.invalid
    ) {
      return;
    }

    const entrada: EntradaCalculo = {
      ...this.formularioOperacao.value,
      ...this.formularioVendas.value,
    };

    this.saidaCalculo = this.saidaCalculoService.calcular(entrada);

    const lead: LeadCompleto = {
      ...this.formularioEmpresa.value,
      ...entrada,
      ...this.saidaCalculo,
      ...this.rastreamento,
      dataEnvio: new Date().toISOString(),
    };

    // ✅ Enviar lead para planilha via API (SheetDB ou outra)
    this.leadService.enviar(lead).subscribe({
      next: () => {
        console.log('✅ Lead enviado para a planilha com sucesso');
        // Navega para tela de resultado somente após envio bem-sucedido
        this.router.navigate(['/resultado'], {
          state: this.saidaCalculo ?? {},
        });
      },
      error: (error) => {
        console.error('❌ Falha ao enviar lead para planilha', error);
        // Mesmo com erro, pode navegar se preferir:
        this.router.navigate(['/resultado'], {
          state: this.saidaCalculo ?? {},
        });
      },
    });

    //  Redireciona para a rota com os dados do cálculo
    this.router.navigate(['resultado'], { state: this.saidaCalculo ?? {} });
  }
}
