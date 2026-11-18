## 5. LAYOUT SYSTEM

### 5.1 Shell da aplicação

```
┌──────────────┬───────────────────────────────────────────────────────────┐
│ (✦) AI Know- │ [▯] App › Início  [🔍 Buscar bases… ⌘K] [🏢 ACME · Pessoas ▾]│
│    ledge St. │                                 [☀|🖥|☾] [🔔•] [⇥]          │
│ [Simp|Avanç] ├───────────────────────────────────────────────────────────┤
│ TRABALHAR    │        Cabeçalho de página (§1.3)                          │
│  ▌Início     │        6 KPIs                                              │
│   …          │        ┌── coluna principal ──────┐ ┌── lateral ───┐      │
│ PREPARAR …   │        │ Alertas                   │ │ Bases        │      │
│ CONSUMIR …   │        │ Últimos processamentos    │ │ Conectores   │      │
│ GOVERNANÇA … │        └──────────────────────────┘ └──────────────┘      │
│ CONFIGURAR … │                                                            │
│ (MC) Marina  │                                                            │
└──────────────┴───────────────────────────────────────────────────────────┘
```

Medido no print (viewport de 2560px, escala 1:1):

- **Sidebar**: ~260px de largura, fundo `--sidebar`, borda direita de 1px em
  `--sidebar-border` mais `--shadow-sidebar`.
- **Topbar**: 85px de altura, fundo `--background`, borda inferior de 1px em
  `--border`. Controles de 40px de altura (§7.3).

### 5.2 Container e Max-width

O conteúdo do Cockpit ocupa **~1552px, centralizado** na área à direita da
sidebar. É compatível com `max-width: 1600px` e padding horizontal de 24px;
confirme no código. Larguras de container do Tailwind (`--container-sm` 24rem
… `--container-7xl` 80rem) seguem valendo para formulário e texto
(`--container-3xl`).

### 5.3 Grid de conteúdo

Medido no print:

- **KPIs**: 6 cards de ~248×113px, com gap de 12px (`--sp-3`). No estreito
  quebram para 3 e depois 2 colunas.
- **Blocos**: duas colunas na proporção **2:1** (~1030px e ~506px), com gap de
  16px (`--sp-4`). A coluna principal tem os blocos de ação e de
  acompanhamento (alertas, processamentos); a lateral, os de situação (bases,
  conectores).
- **Ritmo**: 24px (`--sp-6`) entre cabeçalho, faixa de KPIs e blocos. Dentro
  do card, 16px de padding (`--sp-4`), e os itens internos com ~8px de
  intervalo (`--sp-2`).
- **Grid de bases** (tela de Bases): cards de mesma altura, em 3 colunas no
  desktop. O gap não foi medido.

### 5.4 Breakpoints (tokens)

Os breakpoints são os padrões do Tailwind v4 (`--bp-sm` 40rem, `--bp-md` 48rem,
`--bp-lg` 64rem, `--bp-xl` 80rem, `--bp-2xl` 96rem). O app não os redefine no
CSS capturado, então valem os padrões. Layout mobile-first: cresce por
`min-width`.

### 5.5 Sidebar (dimensões e estados)

~260px, fundo `--sidebar`, itens de 32px de altura com 8px de recuo das
bordas. Estados e agrupamento em §7.1.

### 5.6 Toolbars e barras de ação

Barra de filtro acima de grid: abas segmentadas (§7.6) à esquerda, ação
primária no cabeçalho de página, não na barra.

### 5.7 Alinhamento

Número de KPI alinhado à esquerda com o rótulo. Badge de status alinhado à
direita da linha do item, na mesma altura do título.

### 5.8 Ritmo vertical

Cabeçalho, faixa de KPIs e blocos são três faixas com 24px (`--sp-6`) entre
elas (§5.3). Dentro do card, título e conteúdo ficam a `--sp-4`.

### 5.9 Espaço em branco (white space)

Espaço separa grupos; borda separa cards. Não use as duas coisas para o mesmo
fim.

### 5.10 Empty spaces (áreas sem conteúdo)

Uma base sem dados ("Onboarding de Novos Times": 0 itens, 0 fontes, 0%) aparece
como card normal com zeros e status "Rascunho". Não é escondida. Estado vazio
de página inteira não foi observado (§10.4).
