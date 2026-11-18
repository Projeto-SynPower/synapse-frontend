## 28. INTEGRAÇÃO COM TAILWIND V4 E SHADCN/UI

O app **é** um projeto Tailwind v4 + shadcn/ui. Escrever tela para ele
significa usar as classes utilitárias do projeto, não colar o `tokens.css`.

### 28.1 As colisões de nome

Os papéis semânticos (`--primary`, `--card`, `--border`) têm o mesmo nome no
app e na skill, e isso é deliberado. As rampas diferem: no app são
`--color-red-500` (namespace de tema do Tailwind v4), e na skill são
`--red-500`. Em código do app escreva a classe `bg-red-500`, nunca a variável.

### 28.2 O padrão de repasse

O `@theme` capturado repassa **só três** papéis ao Tailwind:
`--color-background`, `--color-foreground` e `--color-border`. O Tailwind v4
emite apenas as variáveis de tema que o projeto usa, então as classes
confirmadas são `bg-background`, `text-foreground` e `border-border`.

Para os outros papéis, o app escreve a variável direto na classe:
`bg-[var(--primary)]`, `bg-[var(--surface-1)]`. Faça igual. `bg-primary` ou
`text-muted-foreground` só funcionam se o `@theme` do projeto tiver
`--color-primary` ou `--color-muted-foreground`, o que não foi observado.
Confirme no `globals.css` antes de usar a forma curta.

### 28.3 Ponte para os tokens semânticos do shadcn

A skill não precisa de ponte: os nomes já são os do shadcn. `--surface-1`,
`--surface-2`, `--surface-3`, `--success`, `--warning`, `--info`, `--brand` e
`--gradient-brand` são extensões do app sobre o shadcn.

### 28.4 O que o lint NÃO cobre em projeto Tailwind

`lint_output.py` lê cor, raio e espaçamento em CSS e em classe com valor
arbitrário (`rounded-[7px]`). Ele não sabe se `p-5` está no ritmo certo, nem
se `bg-primary` pintou um card inteiro. Em código Tailwind, o checklist de
§25 é o instrumento principal, e `check_dominance.py` mede a proporção.

### 28.5 Duas cópias dos tokens: como acusar divergência

`scripts/check_consumer.py app/globals.css` compara o CSS do app com o
`tokens.json`. Ele entende `oklch()`, então o hex da skill e o oklch do app
contam como a mesma cor quando o sRGB bate. Compara o bloco
`[data-app-shell]` (o tema claro do app), não o `:root`, que é o tema de
marketing.

### 28.6 Tabela token → utilitária

| Token | Classe | Fonte |
|---|---|---|
| `--background` / `--foreground` | `bg-background` / `text-foreground` | `@theme` capturado |
| `--border` | `border-border` | `@theme` capturado |
| `--primary` | `bg-[var(--primary)]`, `text-[var(--primary)]` | classe observada |
| `--surface-1` | `bg-[var(--surface-1)]` | classe observada |
| `--muted-foreground`, `--card`, demais papéis | `text-[var(--muted-foreground)]`, `bg-[var(--card)]` | mesmo padrão |
| `--gradient-brand` | `bg-gradient-brand` | utilitária própria observada |
| `--shadow-glow` | `shadow-glow` | utilitária própria observada |
| card "glass" | `glass` | utilitária própria observada |
| `--radius-md` / `--radius-lg` / `--radius-xl` | `rounded-md` / `rounded-lg` / `rounded-xl` | observada |
| `--size-control-lg` / `--size-control-md` | `h-10` / `h-9` | observada |
| `--sp-4` | `p-4`, `gap-4` | escala do Tailwind |

### 28.7 Um mecanismo de estilização por projeto

No app, classes utilitárias. Em protótipo isolado (HTML solto), importe
`assets/tokens.css` e use `var(--token)`. Não misture os dois no mesmo
arquivo.
