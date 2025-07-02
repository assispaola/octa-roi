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
    const navigation = this.router.getCurrentNavigation();
    this.saidaCalculo = navigation?.extras?.state;

    if (!this.saidaCalculo) {
      this.router.navigate(['/']); // evita acessar /resultado direto
    }
  }

  async gerarPdf(): Promise<void> {
    if (this.isGeneratingPdf) return;

    this.isGeneratingPdf = true;

    try {
      const elemento = document.getElementById('resultados-container');

      if (!elemento) {
        console.error('Elemento não encontrado');
        return;
      }

      // Configurações otimizadas para html2canvas
      const canvas = await html2canvas(elemento, {
        allowTaint: true,
        useCORS: true,
        scale: 2, // Melhor qualidade
        logging: false, // Remove logs desnecessários
        backgroundColor: '#ffffff', // Fundo branco consistente
        removeContainer: true,
        imageTimeout: 30000, // Timeout para imagens
      } as any);

      const imgData = canvas.toDataURL('image/png', 0.95); // Compressão otimizada
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true, // Compressão do PDF
      });

      // Configurações de página
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 14;
      const contentWidth = pageWidth - margin * 2;
      const headerHeight = 30; // Aumentado para dar mais espaço ao cabeçalho
      const availableHeight = pageHeight - headerHeight - margin;

      // Adiciona cabeçalho
      this.adicionarCabecalho(pdf, margin);

      // Calcula dimensões da imagem
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let yPosition = headerHeight;
      let remainingHeight = imgHeight;

      // Primeira página
      const heightToShow = Math.min(remainingHeight, availableHeight);
      pdf.addImage(
        imgData,
        'PNG',
        margin,
        yPosition,
        imgWidth,
        heightToShow,
        undefined,
        'FAST' // Compressão rápida
      );

      remainingHeight -= heightToShow;
      let sourceY = heightToShow;

      // Páginas adicionais se necessário
      while (remainingHeight > 0) {
        pdf.addPage();
        this.adicionarCabecalho(pdf, margin);

        const heightToShow = Math.min(remainingHeight, availableHeight);

        // Cria um canvas temporário para a parte restante
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        if (tempCtx) {
          const sourceHeight = (heightToShow * canvas.width) / imgWidth;
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

      // Salva o arquivo
      const nomeArquivo = this.gerarNomeArquivo();
      pdf.save(nomeArquivo);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    } finally {
      this.isGeneratingPdf = false;
    }
  }

  private adicionarCabecalho(pdf: jsPDF, margin: number): void {
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();

    // Título
    pdf.setFontSize(14);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Relatório OCTA ROI', margin, margin + 8);

    // Data - posicionada à direita
    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 120);
    const textoData = `Gerado em: ${dataAtual}`;
    const larguraTextoData = pdf.getTextWidth(textoData);
    pdf.text(textoData, pageWidth - margin - larguraTextoData, margin + 8);

    // Linha separadora com mais espaço
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.3);
    pdf.line(margin, margin + 14, pageWidth - margin, margin + 14);
  }

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
