## 9. SUPERFÍCIES E SOBREPOSIÇÕES

### 9.1 Cards

Dois tipos, medidos no CSS e conferidos no print:

| Tipo | Raio | Fundo | Borda | Sombra | Onde no Cockpit |
|---|---|---|---|---|---|
| **Glass** (`.rounded-xl.glass`) | 18px | `--surface-1` | `--border` | `--shadow-sm`, hover `--shadow-md` | KPIs e os quatro blocos (Alertas, Processamentos, Bases, Conectores) |
| **Simples** (`.rounded-lg.border`) | 14px | `--card` | `--border` a 40% (medido `#F0F2F4`) | nenhuma | cada item dentro de um bloco |

O Cockpit usa os dois **aninhados**: o bloco é glass, e cada item dentro dele é
um card simples, com ~8px entre um e outro. A borda de 40% é quase invisível
de propósito: separa os itens sem competir com a borda do bloco.

Card clicável tem hover e usa o glass. Card estático não finge que é
clicável.

### 9.2 Card de KPI

Medido no print: ~248×113px, glass, padding de 16px.

```
Qualidade média                         ◔   ← rótulo ~13px --muted-foreground; ícone 16px
78 /100                                     ← valor ~30px peso 500 --foreground; "/100" menor, --muted-foreground
+3 vs. semana passada                       ← contexto 12px --muted-foreground
```

O contexto é o que dá sentido ao número: a variação ("+3 vs. semana
passada"), a decomposição ("1 publicadas · 1 em revisão") ou o risco ("31
docs sensíveis · 7 negados/24h"). KPI sem linha de contexto não entra.

**Ícone no canto superior direito, colorido pelo significado** (medido):

| KPI | Ícone (Lucide) | Cor |
|---|---|---|
| Bases | `Database` | `--primary` |
| Fontes & Documentos | `FileText` | `--warning` |
| Qualidade média | `Gauge` | `--success` |
| Governança | `ShieldCheck` | `--primary` |
| Respostas com fonte | `Sparkles` | `--success` |
| Uso (24h) | `Zap` | `--primary` |

A regra que o print sugere: `--primary` para métrica de volume, `--success`
para métrica de qualidade, `--warning` quando o card carrega pendência ("17
para revisar · 4 falhas"). É **inferida** de seis exemplos; confirme se a cor
muda com o valor (§29.2). O ícone é decorativo (`aria-hidden`), porque o
rótulo já diz o que é.

### 9.3 Card de base e lista em card

**Lista em card** (os blocos do Cockpit), medida no print:

```
┌ glass ────────────────────────────────────────────────────────────┐
│ ⚠ Alertas que precisam de você                          4 ativos │ ← cabeçalho
│ ┌ simples ──────────────────────────────────────────────────────┐ │
│ │ • Título do item                               [ação ou badge]│ │ ← item
│ │   linha de detalhe                                            │ │
│ └───────────────────────────────────────────────────────────────┘ │
│   … (8px entre itens)                                             │
└───────────────────────────────────────────────────────────────────┘
```

- **Cabeçalho**: ícone de 16px + título de ~15px peso 600, e à direita um
  contador ("4 ativos") ou "Ver todos →", ambos em `--muted-foreground`. O
  ícone é `--primary` (`TrendingUp`, `Plug`, `Clock`), exceto no bloco de
  alertas, em que é `TriangleAlert` em `--warning`.
- **Item**: card simples; título de ~15px peso 500; detalhe de 12–13px em
  `--muted-foreground`; badge ou ação à direita, alinhado ao título.
- Os itens não se separam por divisória: cada um é um card.

Itens observados:

| Bloco | Título | Detalhe | À direita |
|---|---|---|---|
| Bases que precisam de ação | "Base Comercial" | "12 pendências · qualidade 64" | badge de base |
| Conectores | "SharePoint — Jurídico" | "Token expirado em …" | badge de conector |
| Últimos processamentos | "Confluence — Espaço Engineering" | "Engenharia & Arquitetura · há 144d" + progresso (§10.4) | badge de processamento |
| Alertas | ver §10.1 | | ação ghost |

O nome de origem usa travessão com espaços: `Serviço — Espaço`.

**Card de base de conhecimento** (tela de Bases, observado só no HTML):

```
Base Comercial                                   [Revisar]
Propostas, casos de sucesso, battlecards…
Itens 3.402     Fontes 1     Atualizada há 5 meses
Cobertura de embeddings                      88%
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
1 fonte   Pipeline
Comercial · Camila Ferreira                   12 PII
```

Ordem fixa: nome e status, descrição de uma linha, trio de métricas, barra de
cobertura, links para fontes e pipeline, e rodapé com área, responsável e
contagem de PII. O link de fontes mostra o erro quando há ("1 fonte · 1
erro"). Base sem dados continua com o mesmo card, com zeros.

### 9.4 Popover

`--popover`, `--border`, `--shadow-lg`, `--radius-md`. Padrão shadcn, não
medido.

### 9.5 Tooltip

Obrigatório em item de sidebar colapsada e em botão-ícone (§7.2). Padrão
shadcn.

### 9.6 Modal (uso restrito)

Não observado. Use para confirmação de ação irreversível (publicar, excluir
base, revogar acesso), nunca para formulário longo. O scrim não foi medido
(§29.4).

### 9.7 Painel lateral de detalhe

Não observado. Candidato natural para detalhe de processamento ou de
conector sem sair do Cockpit.

### 9.8 Painéis flutuantes

Não usados no app. Não introduza barra de ferramentas flutuante.

### 9.9 Superfícies fora do escopo

Widget flutuante de contato, banner de campanha e hero de marketing não
existem no app shell. Se o pedido for de uma peça dessas, ela pertence ao tema
de marketing (§1.2).

### 9.10 Overlays escapam do container (regra de implementação)

Menu, popover e tooltip renderizam em portal (padrão Radix no shadcn), nunca
dentro do card com `overflow: hidden`.
