
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { SharedUiModule } from '../../shared/shared-ui.module';
import { RastreamentoService } from '../../services/rastreamento.service';
import { SaidaCalculoService } from '../../services/saida-calculo.service';
import { EntradaCalculo } from '../../models/entradaCalculo';
import { LeadCompleto } from '../../models/leadCompleto';
import { SaidaCalculo } from '../../models/saidaCalculo';


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
    private saidaCalculoService: SaidaCalculoService
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
    });

    this.rastreamento = this.rastreamentoService.obterParametrosDeCampanha();
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

    console.log('📝 Lead completo:', lead);
  }
}
