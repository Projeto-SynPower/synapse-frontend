## 1. MARCA E IDENTIDADE

O AI Knowledge Studio é uma ferramenta de **governança de conhecimento para
agentes de IA**: conecta fontes, revisa o que entra, testa respostas com
evidência e publica bases para agentes, APIs e copilotos. A identidade visual
serve a esse trabalho: calma, técnica e confiável. A interface não pode
parecer "mágica". O usuário precisa ver de onde veio cada resposta e o que
está quebrado.

### 1.1 Logo / Mark

Observado no topo da sidebar:

- **Símbolo**: círculo de ~40px com `--gradient-brand` e um ícone de brilhos
  (sparkles) branco no centro.
- **Nome**: "AI Knowledge" em peso 600, `--sidebar-foreground`, seguido de
  "Studio" em peso 400 e cinza, cerca de 16px. O cinza medido (`#6D717C`)
  não é token; a skill usa `--muted-foreground`.

O arquivo vetorial do símbolo não foi capturado. Em protótipo, monte o círculo
com `--gradient-brand` e o ícone `Sparkles` do Lucide (§18).

### 1.2 Dois mundos: app shell e marketing

O site tem **dois mundos visuais**, e esta skill cobre um só:

- **App shell** (`[data-app-shell]`, tudo sob `/app`) — branco, cinza frio e
  índigo `--primary`, com Inter e Geist. É o escopo desta skill.
- **Marketing** (o `:root` fora do shell) — escuro, com marca dupla ciano
  `oklch(78% .16 200)` e violeta `oklch(68% .2 295)`, gradiente ciano→violeta,
  malha radial de brilho e **Instrument Serif** como display.

Não misture os dois. Gradiente ciano→violeta, glow colorido ou serifa dentro
de uma tela do app são erro. Uma landing page ou peça de campanha pertence ao
tema de marketing, cujos tokens ainda não entraram no `tokens.json` (§29.3).

### 1.3 Cabeçalho de página (elemento de marca principal)

O elemento de marca mais forte do app é o **cabeçalho de página**, e ele se
repete em toda tela observada. Medido no print do Cockpit:

```
COCKPIT DE CONHECIMENTO                  ← eyebrow: 12px, 500–600, CAIXA ALTA,
                                            tracking largo, --primary
Boa tarde, Marina.                       ← H1: --font-display, ~36px, peso
                                            regular/médio, --foreground
Saúde das bases, processamentos,…        ← subtítulo: ~15px, --muted-foreground
                        [+ Criar base] [⤒ Adicionar dados] [▢ Testar chat]
                         ↑ CTA --gradient-brand   ↑ secundários com ícone
```

- O eyebrow é **índigo**, não cinza. É o único texto em `--primary` fora de
  link e ação, e nomeia o módulo.
- O H1 fala com a pessoa e **muda com o horário** ("Bom dia", "Boa tarde",
  "Boa noite"), ou nomeia o conjunto ("Suas bases governadas"). Ele não é
  bold: a hierarquia vem do tamanho.
- O subtítulo diz o que a tela mostra em uma frase.
- As ações ficam à direita, alinhadas pela base do bloco de texto, com
  **um** CTA de gradiente. Todas têm ícone à esquerda do rótulo.

### 1.4 Regra dos tokens de marca

No app shell, `--brand`, `--brand-2` e `--primary` são a mesma cor
(`#3F46AC`). Use sempre `--primary`: `--brand` existe para o tema de marketing,
onde as duas cores de marca diferem. O gradiente de marca (`--gradient-brand`)
é o único lugar em que o índigo ganha profundidade, e ele fica reservado ao
CTA principal.
