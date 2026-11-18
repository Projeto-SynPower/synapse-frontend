## 4. TIPOGRAFIA

### 4.1 Família

- **Inter** (`--font-sans`) — todo o texto de interface.
- **Geist** (`--font-display`, com Inter de fallback) — títulos de página
  (`.font-display`), sempre com `--tracking-display` (-0.01em).
- **JetBrains Mono** (`--font-mono`) — linha técnica de processamento
  ("embedding · 64% · Gerando embeddings…"), atalho de teclado, ID.

O `:root` do site carrega **Instrument Serif** como display, mas isso é do
tema de marketing (§1.2). Dentro do app, display é Geist. Serifa em tela de
produto é erro.

### 4.2 Escala tipográfica e papéis

A escala é a do Tailwind (`--fs-xs` 12px … `--fs-7xl` 72px). Os tamanhos
abaixo foram **medidos no print do Cockpit** pela altura das maiúsculas, com
margem de ±1px. Os pesos saíram da espessura das hastes. O app é denso e vive
entre 11 e 15px, com dois saltos grandes: o H1 e o valor de KPI.

| Papel | Tamanho | Peso | Cor | Exemplo |
|---|---|---|---|---|
| H1 da página | ~36px (`--fs-4xl`), Geist | 400–500 | `--foreground` | "Boa tarde, Marina." |
| Valor de KPI | ~30px (`--fs-3xl`) | 500 | `--foreground` | "12.480" |
| Wordmark | ~16px | 600 + 400 | `--sidebar-foreground` | "AI Knowledge Studio" |
| Subtítulo da página | ~15px | 400 | `--muted-foreground` | "Saúde das bases…" |
| Título de bloco | ~15px | 600 | `--foreground` | "Alertas que precisam de você" |
| Título de item | ~15px | 500 | `--foreground` | "Base Comercial" |
| Botão | 14–15px | 500 | conforme a variante | "Criar base" |
| Item de navegação | ~13px | 500 (ativo 600) | ver §7.1 | "Bases de Conhecimento" |
| Rótulo de KPI, descrição | ~13px | 400 | `--muted-foreground` | "Qualidade média" |
| Eyebrow | 12px (`--fs-xs`), caixa alta, tracking largo | 500–600 | `--primary` | "COCKPIT DE CONHECIMENTO" |
| Meta e contexto | 12px (`--fs-xs`) | 400 | `--muted-foreground` | "4 pendências · qualidade 78" |
| Linha técnica | ~11px, `--font-mono` | 400 | `--muted-foreground` | "embedding · 64% · …" |
| Badge | 11px | 500 | ver §10.1 | "Sincronizando" |
| Rótulo de grupo da sidebar | ~11px, caixa alta, tracking largo | 500 | `--muted-foreground` (§3.2) | "TRABALHAR" |

Tamanhos de 13 e 15px não estão na escala do Tailwind; o app usa valor
arbitrário (`text-[13px]`, `text-[15px]`) ou os vizinhos `text-sm`/`text-base`.
Confirme no código antes de fixar um token (§29.4).

### 4.3 Regras de hierarquia e legibilidade

- Hierarquia vem de tamanho e peso, não de cor: título em `--foreground`,
  apoio em `--muted-foreground`. Os dois textos maiores (H1 e KPI) **não** são
  bold; o tamanho basta.
- Número importante é maior que o rótulo dele. O rótulo do KPI ("Bases") é
  pequeno; o valor ("6") é grande. Unidade ou denominador ("/100") sai menor
  e em `--muted-foreground`, na mesma linha de base.
- Meta de item em uma linha, separada por ` · ` (ponto médio com espaços).
- Nada abaixo de 12px.

### 4.4 Tokens de escala e números

Em projeto Tailwind, use as classes (`text-sm`, `font-semibold`,
`tracking-tight`). Em CSS puro, `var(--fs-sm)`, `var(--fw-semibold)`,
`var(--lh-normal)`. Número em coluna ou KPI que muda ao vivo usa
`font-variant-numeric: tabular-nums` para não pular de largura.
