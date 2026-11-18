## 17. MICROINTERAÇÕES E MOTION

### 17.1 Durações e easing (tokens em §3.9)

Uma duração só para transição de estado: `--dur-default` (150ms) com
`--ease-default`. É a do `transition` do Tailwind, e o app não a sobrescreve.
Hover de card (sombra `--shadow-sm` → `--shadow-md`), hover de botão e troca
de aba usam essa duração.

### 17.2 Estados de microinteração (por gatilho)

- **Hover de card interativo**: sombra sobe um degrau. Nada se move.
- **Processamento rodando**: barra de progresso com percentual em texto
  ("embedding · 64%"). Não use spinner sozinho para trabalho com progresso
  mensurável.
- **Sincronizando**: badge de status; a classe `animate-pulse` (`--dur-pulse`, 2s) é aceitável no
  ponto de status, nunca no card inteiro.

### 17.3 Transições de layout

Colapso da sidebar é a única transição de layout observada. Não anime entrada
de card, KPI ou lista.

### 17.4 Propriedades seguras e limites

Anime só `opacity`, `transform`, `box-shadow`, `background-color`,
`border-color` e `color`. Nunca `width`, `height`, `top`, `left`, `margin` ou
`padding`.

### 17.5 Movimento reduzido

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

A duração vai a quase zero em vez de `none`: o estado final continua sendo
aplicado, e listeners de `transitionend` continuam disparando.

## 18. ICONOGRAFIA

Os ícones do print têm as formas do **Lucide**, que é o padrão do shadcn/ui.
Observados: `House`, `Database`, `MessageSquare`, `Plug`, `Workflow`,
`Scissors`, `Gauge`, `ShieldCheck`, `History`, `Send`, `Code`, `Settings`,
`PanelLeft`, `Search`, `Building2`, `ChevronDown`, `Sun`, `Monitor`, `Moon`,
`Bell`, `LogOut`, `Plus`, `Upload`, `FileText`, `Sparkles`, `Zap`,
`TriangleAlert`, `TrendingUp`, `Clock`, `CircleCheck`. Os nomes são de
identificação visual; confirme no código antes de tratar um nome como exato.

Medido: 16px na sidebar, nos botões, nos KPIs e nos cabeçalhos de bloco; 12px
dentro de badge. Traço de linha, `currentColor`.

Cor do ícone:

- Na sidebar, cinza de apoio; no item ativo, `--primary`.
- No KPI e no cabeçalho de bloco, colorido pelo significado (§9.2, §9.3).
- No botão, a cor do texto do botão.

Regras que valem com qualquer biblioteca: um conjunto só por tela, ícone
nunca é o único rótulo de uma ação (§20.7), e ícone de status acompanha a
palavra do status em vez de substituí-la. Emoji não é ícone de interface.
