import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
})
export class ResultadoComponent {
  saidaCalculo: any;
  isGeneratingPdf = false;

  constructor(private router: Router) {
    // Captura os dados vindos da navegação via router
    const navigation = this.router.getCurrentNavigation();
    this.saidaCalculo = navigation?.extras?.state;

    // Evita acesso direto via /resultado sem dados
    if (!this.saidaCalculo) {
      this.router.navigate(['/']);
    }
  }

  // Gera o PDF com os dados exibidos na tela
  async gerarPdf(): Promise<void> {
    if (this.isGeneratingPdf) return;
    this.isGeneratingPdf = true;

    try {
      const elemento = document.getElementById('resultados-container');
      if (!elemento) {
        console.error('Elemento para captura não encontrado');
        return;
      }

      // Captura o conteúdo da tela com qualidade aumentada
      const canvas = await html2canvas(elemento, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
        removeContainer: true,
        imageTimeout: 30000,
      } as any);

      const imgData = canvas.toDataURL('image/png', 0.95);

      // Instância do PDF com dimensões A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 14;
      const contentWidth = pageWidth - margin * 2;
      const headerHeight = 30;
      const availableHeight = pageHeight - headerHeight - margin;

      // Adiciona cabeçalho à primeira página
      this.adicionarCabecalho(pdf, margin);

      // Calcula altura da imagem proporcional ao tamanho disponível
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let yPosition = headerHeight;
      let remainingHeight = imgHeight;
      let sourceY = 0;

      // Adiciona primeira parte da imagem
      const heightToShow = Math.min(remainingHeight, availableHeight);
      pdf.addImage(
        imgData,
        'PNG',
        margin,
        yPosition,
        imgWidth,
        heightToShow,
        undefined,
        'FAST'
      );
      remainingHeight -= heightToShow;
      sourceY += heightToShow;

      // Gera páginas adicionais se o conteúdo for maior que 1 página
      while (remainingHeight > 0) {
        pdf.addPage();
        this.adicionarCabecalho(pdf, margin);

        const heightToShow = Math.min(remainingHeight, availableHeight);
        const sourceHeight = (heightToShow * canvas.width) / imgWidth;

        // Cria novo canvas com a próxima "fatia"
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        if (tempCtx) {
          tempCanvas.width = canvas.width;
          tempCanvas.height = sourceHeight;

          tempCtx.drawImage(
            canvas,
            0,
            (sourceY * canvas.width) / imgWidth,
            canvas.width,
            sourceHeight,
            0,
            0,
            canvas.width,
            sourceHeight
          );

          const tempImgData = tempCanvas.toDataURL('image/png', 0.95);
          pdf.addImage(
            tempImgData,
            'PNG',
            margin,
            headerHeight,
            imgWidth,
            heightToShow
          );
        }

        remainingHeight -= heightToShow;
        sourceY += heightToShow;
      }

      // Salva o arquivo com nome automático
      const nomeArquivo = this.gerarNomeArquivo();
      pdf.save(nomeArquivo);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      this.isGeneratingPdf = false;
    }
  }

  // Adiciona cabeçalho padrão no PDF
  private adicionarCabecalho(pdf: jsPDF, margin: number): void {
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const textoData = `Gerado em: ${dataAtual}`;
    const larguraTextoData = pdf.getTextWidth(textoData);

    pdf.setFontSize(14);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Relatório OCTA ROI', margin, margin + 8);

    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 120);
    pdf.text(textoData, pageWidth - margin - larguraTextoData, margin + 8);

    // Linha de separação
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(margin, margin + 14, pageWidth - margin, margin + 14);
  }

  // Gera nome do arquivo baseado na data atual
  private gerarNomeArquivo(): string {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const hora = String(dataAtual.getHours()).padStart(2, '0');
    const minuto = String(dataAtual.getMinutes()).padStart(2, '0');

    return `relatorio-octa-roi-${ano}${mes}${dia}-${hora}${minuto}.pdf`;
  }
}
