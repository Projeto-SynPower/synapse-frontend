### 3.4 Elevação e Sombra

As sombras do tema claro são **frias e baixas**: a tinta é `oklch(20% .02 255)`
(um grafite azulado), nunca preto puro. No escuro, a tinta passa a ser preto
com alpha alto, porque sombra fria não aparece sobre fundo escuro (§27).

| Token | Uso observado |
|---|---|
| `--shadow-sm` | card "glass" em repouso, botão branco `h-10` |
| `--shadow-md` | hover de card "glass", CTA com gradiente |
| `--shadow-lg` | camada flutuante (menu, popover). Não observado em tela; mesma família |
| `--shadow-glow` | anel de 1px índigo translúcido em destaque. No claro é só contorno |
| `--shadow-sidebar` | separação da sidebar: 1px de borda + sombra lateral longa |
| `--shadow-primary-sm` | botão pequeno `h-[30px]` em `--primary` |

Card simples (`rounded-lg border`) **não tem sombra**. A regra é: sombra
comunica que a superfície é interativa (reage a hover) ou flutua; borda
sozinha comunica agrupamento.

### 3.5 Blur, Glass, Overlay e Opacidade

- **Gradiente.** `--gradient-brand` (índigo 48% → 42%, 135°) é exclusivo do CTA
  principal da página. `--gradient-brand-soft` é uma lavagem de índigo a 8%/4%
  para faixa de destaque. Nenhum dos dois pinta card ou seção inteira.
- **Glass.** No app shell a classe `.glass` resolve para `--surface-1` opaco:
  o nome ficou, a translucidez não. Não reintroduza `backdrop-filter` em card.
- **Blur.** `--blur-sm` (8px) e `--blur-2xl` (40px) existem no CSS; o uso não
  foi observado. Reserve para chrome sobreposto.
- **Overlay e opacidade.** O scrim de modal e a opacidade de desabilitado não
  foram capturados (§29.4). Até lá, siga o padrão do shadcn/ui que o app usa.

### 3.6 Raio (border-radius)

O app parte de `--radius: 14px` e deriva a escala por soma. Raios são grandes
e suaves — é parte da identidade:

| Token | Valor | Classe | Uso observado |
|---|---|---|---|
| `--radius-default` | 4px | `rounded` | botão-ícone `h-7` |
| `--radius-sm` | 10px | `rounded-sm` | — |
| `--radius-md` | 12px | `rounded-md` | botão outline `h-9`, botão pequeno, abas segmentadas |
| `--radius-lg` / `--radius` | 14px | `rounded-lg` | botões `h-9`/`h-10`, card simples |
| `--radius-xl` | 18px | `rounded-xl` | card "glass" |
| `--radius-2xl` | 22px | `rounded-2xl` | — |
| `--radius-3xl` | 26px | `rounded-3xl` | — |
| `--radius-full` | 9999px | `rounded-full` | badge, ponto de severidade, avatar, símbolo da marca, barra de progresso |

Filho tem raio menor ou igual ao do pai: botão de 14px dentro de card de 18px,
nunca o contrário. `rounded-full` foi observado no print em toda forma de
pílula ou círculo.

### 3.7 Espaçamento (base 4px)

Base de 4px (`--spacing: .25rem` do Tailwind). O token `--sp-N` vale `N × 4px`
e corresponde à classe de número N do Tailwind: `--sp-4` = `p-4` = 16px. Use
só os degraus da escala; valor fora dela é decisão a justificar, não um
número no olho.

### 3.8 Altura de controle e ícone

A altura dos controles é o que foi medido, e ela define a densidade do app:

| Token | Altura | Onde |
|---|---|---|
| `--size-control-lg` | 40px (`h-10`) | CTA e botão principal do cabeçalho de página |
| `--size-control-md` | 36px (`h-9`) | botão ghost e outline em barras de ação |
| `--size-control-sm` | 30px (`h-[30px]`) | botão pequeno primário, aba segmentada |
| `--size-control-xs` | 28px (`h-7`) | botão-ícone, aba compacta |

O tamanho de ícone não foi medido. O shadcn/ui usa 16px (`size-4`) dentro de
botão, e é o ponto de partida até a confirmação (§29.4).

### 3.9 Motion (tokens)

`--dur-default` (150ms) com `--ease-default` (`cubic-bezier(.4, 0, .2, 1)`) é a
transição padrão do app: a mesma que o Tailwind aplica em `transition`.
`--dur-spin` (1s) e `--dur-pulse` (2s) são os loops de carregamento. Regras de
uso em §17.

### 3.10 Superfície e Z-index

As camadas de superfície são `--background` → `--surface-1`/`--card` →
`--surface-2` → `--surface-3` (§2.2). Z-index usa a escala do Tailwind
(`--z-10` … `--z-50`); camadas nominais para header fixo, sidebar, popover e
toast ainda não foram mapeadas (§29.4). Nunca `z-index: 9999`.
