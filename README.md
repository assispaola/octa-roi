# ✨ Calculadora de ROI - OctaDesk

Esta é uma aplicação web interativa desenvolvida em **Angular 17 Standalone** com foco na coleta de leads e cálculo automatizado de ROI (Retorno Sobre Investimento) a partir de dados reais de operação e vendas. O projeto foi desenvolvido como solução para um desafio técnico.

---

## 🏛 Contexto do Desafio

A OctaDesk quer ajudar empresas a visualizarem os benefícios financeiros de automatizar seu atendimento via chatbot. O desafio propõe construir uma calculadora de ROI que:

- Colete dados da empresa
- Realize os cálculos de economia e ROI
- Mostre os resultados de forma amigável
- Capture e armazene os dados dos leads
- Registre eventos de conversão para ferramentas de análise (GTM)
- Gere relatório interno com base em crescimento e dúvidas repetidas por setor

---

## 📈 Funcionalidades

- Formulário de múltiplos passos com validação
- Cálculo de ROI e economia com base nos dados informados
- Armazenamento de dados do lead em Google Sheets
- Registro de eventos de conversão no Google Tag Manager
- Captura de parâmetros UTM, GCLID e FBCLID
- Tela de resultado com simulação e opções de ação
- Serviço dedicado para lógica de cálculo e separação de responsabilidades

---

## 🎨 Design System

### Componentes UI Utilizados

- `MatStepper` para navegação por etapas
- `MatFormField`, `MatInput`, `MatSelect`, `MatButton`, `MatIcon`
- Layout centralizado e responsivo com `Flexbox`
- Cores da identidade visual da marca Octadesk
- Ícones que reforçam o contexto dos dados (ex: economia, ROI)

### Princípios de Design Adotados

- Clareza e foco no conteúdo
- Tom educativo e moderno
- Facilidade de leitura e preenchimento

### Boas Práticas

- Inputs bem agrupados
- Textos explicativos
- Responsividade desde o MVP

---

## 📊 Tecnologias e Ferramentas

- **Angular 17 Standalone API**
- **Angular Material**
- **RxJS**
- **TypeScript**
- **SheetDB** (para integração com Google Sheets)
- **Google Tag Manager** (via `dataLayer`)

---

## 📚 Estrutura de Pastas

```bash
src/
  app/
    components/
      formulario/            # Formulário principal (multi-step)
      resultado/             # Tela de resultado do ROI
      relatorio/             # Relatório interno por setor
    dashboard/               # Dashboard futuro
    models/                  # Interfaces: Lead, Entrada, Saída
    services/                # Lógica de negócio e integrações
    shared/                  # Módulo compartilhado de UI
    app.routes.ts            # Rotas principais (standalone)
    app.config.ts            # Configuração da aplicação
```

---

## 🔄 Fluxo do Usuário

1. Acessa a página inicial
2. Preenche os dados da empresa, atendimento e vendas
3. Ao clicar em "Calcular":
   - Os dados são validados
   - O ROI é calculado localmente via `SaidaCalculoService`
   - Um objeto `LeadCompleto` é criado
   - Os dados são enviados para uma planilha via `LeadService`
   - O evento `conversao_lead` é disparado para o GTM
   - O usuário é redirecionado para a tela de resultado

---

## 📝 Como Funciona o Envio para Planilha

- A aplicação envia os dados via POST para um endpoint gerado pelo [SheetDB](https://sheetdb.io/)
- Os dados são salvos diretamente em uma aba do Google Sheets associada
- Isso permite que a equipe filtre leads por setor, data, crescimento mensal, etc.

> ✅ Ideal para um MVP, com possibilidade de migração para banco de dados futuramente

---

## 📁 Clonando e Executando o Projeto

```bash
git clone https://github.com/seuusuario/octa-roi.git
cd octa-roi
npm install
ng serve
```

Acesse em `http://localhost:4200`

---

## 📂 Documentação Técnica

### Serviços

- `LeadService`: Envia os dados para a planilha externa
- `SaidaCalculoService`: Contém a lógica de cálculo do ROI
- `RastreamentoService`: Captura UTM, GCLID e FBCLID da URL
- `ArmazenamentoService`: Gerencia `localStorage` para dados temporários
- `AnaliticosService`: Dispara evento de conversão para o GTM

### Interfaces e Tipagem

- `EntradaCalculo`: Dados de operação e vendas
- `SaidaCalculo`: Resultado do cálculo
- `LeadCompleto`: Combina entrada, saída, dados da empresa e rastreamento

### Estratégia de Navegação

- Rotas standalone com `loadComponent`
- Uso de `Router Navigation Extras` para enviar `state` para a tela de resultado

### Validações

- Todas as etapas do formulário usam `FormGroup` com `Validators`

### Responsividade e Acessibilidade

- Layout baseado em Flexbox
- Inputs com `mat-label` para acessibilidade
- Ícones com descrição contextual

---

## 💡 Melhorias Futuras

- Criar dashboard com filtros por setor e por data
- Armazenar dados em banco de dados real (ex: Firebase, Supabase)
- Automação de envios para CRM
- Componente de loading entre etapas

---

## 🚀 Autora

**Paola Santos de Assis**\
Desenvolvedora Front-End Angular

 aqui prints ou link para vídeo demonstrativo / deploy hospedado (opcional)

