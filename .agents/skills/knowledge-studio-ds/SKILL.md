---
name: knowledge-studio-ds
description: >
  Design system do AI Knowledge Studio (app de governança de bases de
  conhecimento para agentes de IA, em shadcn/ui + Tailwind v4). Use SEMPRE que
  for criar, alterar, prototipar ou revisar qualquer tela, componente, card,
  dashboard, formulário, estado ou texto de interface do Knowledge Studio,
  mesmo sem o nome da skill no pedido. Isso inclui pedidos como "tela de
  pipelines", "card de conector", "cockpit", "página de publicação", "chat
  com os dados", "Chunk Studio", "Retrieval Lab", "perfis de ingestão",
  "auditoria e lineage", "badge de status da base", "mockup de adicionar
  dados", a versão escura de uma tela, ou "isso está no padrão do app?". Traz os tokens
  medidos no CSS do app (claro e escuro), o vocabulário de status, os padrões
  de tela observados e verificadores de contraste, lint e dominância de cor.
metadata:
  version: "0.2.0"
  last-updated: "2026-09"
---

# AI Knowledge Studio Design System

Quando esta skill é aplicada, o resultado tem que parecer uma tela do AI
Knowledge Studio: branca e cinza-fria, índigo só onde se age, status sempre
escrito e todo problema acompanhado da ação que o resolve.

Quem paga o preço de um atalho aqui é o **curador de conhecimento** (a
persona do app é "Marina Costa, Curadora · ACME"). Ele publica bases que
agentes vão usar para responder a outras pessoas. Um status ambíguo, um
número de confiança escondido ou um alerta sem ação vira documento com PII
publicado ou resposta sem fonte chegando a um cliente. Na dúvida, a tela
mostra mais estado e mais evidência, não menos.

## Regra de ouro

**Superfície neutra, índigo só na ação, status sempre com a palavra.**

Teste de cinco segundos: aperte os olhos diante da tela.
1. A primeira cor que salta deve ser o CTA principal. Se um card, uma faixa ou
   o cabeçalho salta em índigo antes dele, está errado.
2. Cubra mentalmente todas as cores de status. Cada estado continua legível
   pela palavra ("Bloqueada", "Erro", "Sincronizando")? Se não, está errado.

Em qualquer conflito entre as regras abaixo, a ordem de prioridade é sempre a
mesma:

1. **Acessibilidade (WCAG 2.2 AA)** — nunca sacrificada. Onde o próprio app
   reprova (anel de foco, destrutivo no escuro), a skill corrige.
2. **Fidelidade aos tokens medidos** — `scripts/tokens.json`, nada no olho.
3. **Consistência** — reutilizar o padrão existente vence inventar variação nova.
4. **Expressão visual** — só depois das três acima.

## Como usar esta skill

1. **Comece pelo dado canônico.** Cores, raios, sombras, tipografia e alturas
   estão em `scripts/tokens.json`. Em código do app, use as classes Tailwind
   de §28.6. Em protótipo isolado, importe `assets/tokens.css` e use
   `var(--token)`. Nunca redigite a paleta.
2. **Reutilize antes de criar.** Cabeçalho de página, card de KPI, lista de
   alertas, card de base, badge de status e botões já existem (§1.3, §8–§10).
3. **Escolha o padrão certo**: Cockpit (§14), listagem (§13.1), formulário
   (§15).
4. **Aplique as restrições de qualidade em todo resultado, sem exceção**:
   acessibilidade (§20), linguagem (§19) e modo escuro (§27).
5. **Verifique antes de entregar** — ver "Antes de entregar" no fim.

A skill foi extraída do CSS computado, do HTML do Cockpit e de Bases, e de um
print do Cockpit (modo Avançado, tema claro) cujas cores foram amostradas
pixel a pixel. O que não saiu dessas fontes está marcado como **inferido** ou
**não observado**; o tema escuro ainda não foi visto renderizado. Quando a
skill não cobrir um caso, derive a resposta do padrão shadcn/ui com os tokens
desta skill e do princípio mais próximo (§2.1), e **diga na entrega o que foi
derivado**. Em dúvida real, prefira o mais neutro, o mais legível e o mais
explícito, nessa ordem.

## Mapa de referências

Cada arquivo é dono das suas seções (§) e é mantido de forma independente. A
numeração § permite referência cruzada tipo "ver §N.M" de qualquer lugar da
skill.
| Arquivo | § | Abra quando |
|---|---|---|
| `tokens/brand-identity.md` | §1 | montar o cabeçalho de página; pedido parece de landing ou campanha (tema de marketing) |
| `foundations/visual-philosophy.md` | §2 | decidir qual superfície vai atrás de qual; desempatar algo que a skill não cobre |
| `tokens/colors.md` | §3 | precisar do hex de um papel ou de uma rampa; propor par de cor; checar se um tom pode ser texto |
| `tokens/scales.md` | §3.4–§3.10 | escolher sombra, raio, espaçamento, altura de controle, duração ou z-index |
| `tokens/typography.md` | §4 | definir tamanho e peso de título, KPI, meta; usar Geist ou mono |
| `tokens/layout-grid.md` | §5 | montar o shell, a grade de KPIs ou de cards, a sidebar |
| `components/principles.md` | §6 | o componente pedido não está no catálogo |
| `components/navigation.md` | §7 | mexer na sidebar, topbar, workspace, breadcrumb, filtro segmentado ou ⌘K |
| `components/inputs-actions.md` | §8 | escolher a variante de botão; montar campo, menu ou upload |
| `components/surfaces-overlays.md` | §9 | montar card (glass ou simples), KPI, card de base, lista em card, modal ou popover |
| `ux-patterns/feedback-and-states.md` | §10 | escrever ou colorir um status; montar alerta, progresso, vazio ou carregamento |
| `components/data-visualization.md` | §11 | a tela tem tabela, filtro, feed ou gráfico |
| `components/collaboration-ai.md` | §12 | avatar, badge de PII, chat com os dados, fonte e confiança de resposta |
| `components/screen-structures.md` | §13 | estruturar uma página de listagem ou de detalhe |
| `screen-patterns/dashboards-and-forms.md` | §14–§15 | montar ou mudar o Cockpit; qualquer formulário ou wizard |
| `ux-patterns/operational-modes.md` | §16 | a tela muda entre modo Simples e Avançado, ou depende de permissão |
| `tokens/motion-icons.md` | §17–§18 | adicionar transição, animação de carregamento ou ícone |
| `ux-patterns/language.md` | §19 | escrever qualquer texto: botão, alerta, número, moeda, data, tempo relativo |
| `foundations/accessibility.md` | §20 | anel de foco, alvo de clique, ARIA, teclado, leitor de tela |
| `foundations/ux-principles.md` | §21 | justificar uma decisão de fluxo ou de hierarquia |
| `ai-rules/prompt-engineering.md` | §22–§23 | escrever prompt de geração de tela ou validar a saída de outra IA |
| `ai-rules/anti-patterns-checklist.md` | §24–§25 | revisar uma tela; fechar a entrega |
| `foundations/performance.md` | §26 | lista longa, bloco que carrega dado ao vivo, rede instável |
| `tokens/dark-mode.md` | §27 | qualquer coisa no tema escuro |
| `ai-rules/tailwind-integration.md` | §28 | escrever código para o app (Tailwind/shadcn) ou comparar tokens com o `globals.css` |
| `tokens/palette-backlog.md` | §29 | um valor está marcado como inferido; encontrar divergência entre o app e a skill |

Alguns temas aparecem em mais de um lugar por natureza. Nesses casos, **o
arquivo dono do § é a fonte de verdade** e os outros apenas apontam para ele,
para não duplicar conteúdo que poderia divergir com o tempo.

## Cheat sheet — o mínimo que vale para todo resultado

```
Fontes:             Inter (UI) · Geist (títulos, tracking -0.01em) · JetBrains Mono (⌘K, IDs)
Página e card:      --background #FFFFFF · card com --border #DADEE3 + --shadow-sm
Texto:              --foreground #12161B · apoio --muted-foreground #5F646A
Ação:               --primary #3F46AC · CTA da página com --gradient-brand, texto #fff, UM por tela
                    ação de alerta = botão ghost em --foreground · "Ver todos →" em --muted-foreground
Cabeçalho:          eyebrow 12px CAIXA ALTA em --primary · H1 Geist ~36px peso regular · subtítulo ~15px
Sidebar:            --sidebar #E1E6F3 · ativo --sidebar-accent #CFD6E6
Status:             badge pílula 21px: fundo --<tom>-soft, borda --<tom>-border, texto 11px
                    no token do tom — exceto success → --emerald-700 e warning → --amber-800
                    (o app reprova ali). Sempre com a palavra. Nunca rampa para status.
Blocos:             bloco glass (18px, --shadow-sm) com itens em card simples (--border a 40%)
Raio:               4 / 10 / 12 / 14 / 18 / 22 / 26px (base --radius 14px) — nunca outro
Controles:          40px (h-10) cabeçalho · 36px (h-9) barra · 30px pequeno · 28px ícone
Espaçamento:        base 4px, --sp-N = N×4px = classe N do Tailwind
Foco:               outline 2px solid --primary, offset 2px (NÃO o --ring do app: 2.44:1)
Contraste mínimo:   4.5:1 texto · 3:1 texto grande · 3:1 UI e foco
Alvo de clique:     24×24px mínimo (WCAG 2.5.8); ação principal ≥ 36px
NUNCA texto (claro): --warning, --ring, os degraus 500/600 das rampas e os cinzas da sidebar
                    do app (#777C86, #6D717C) — use --muted-foreground
                    (nas rampas, use o degrau 700; lista em scripts/tokens.json)
Números:            12.480 · US$ 42,18 · 94% · 78/100 · há 5 meses
```

## Assets e scripts

- **`assets/tokens.css`** — `:root` com o tema claro e o bloco `.dark,
  [data-app-shell].dark` com o escuro, mais foco e movimento reduzido. Para
  protótipo isolado; no app, os tokens já existem.
- **`scripts/check_contrast.py <texto> <fundo>`** — contraste WCAG de
  qualquer par. Aceita token (`primary`, `dark-foreground`), hex e rgb().
- **`scripts/lint_output.py <arquivo>`** — cor, raio, espaçamento, sombra,
  fonte e token inexistente no que foi gerado.
- **`scripts/check_checklist.py <arquivo>`** — a parte automatizável do §25 e
  a lista dos itens manuais.
- **`scripts/check_dominance.py <css>`** — proporção neutro/estrutural/apoio
  (§3.3).
- **`scripts/check_consumer.py <globals.css>`** — divergência entre o app e a
  skill; entende `oklch()` (§28.5).


## Regras invioláveis

```
✗ Nunca inventar item novo quando um do catálogo já resolve.
✗ Nunca usar valor "no olho" — todo valor vem do tokens.json, sem exceção.
✗ Nunca dois CTAs com gradiente na mesma tela.
✗ Nunca status só por cor, nem alerta sem a ação que o resolve.
✗ Nunca tema de marketing (ciano, violeta, Instrument Serif) dentro do app.
```

## Antes de entregar

1. Rode `lint_output.py` e `check_checklist.py` no que foi gerado e corrija
   todo `[ERRO]`. `[AVISO]` exige decisão consciente: corrija ou explique por
   que passa.
2. Passe pelos itens manuais de §25 e pelo teste de cinco segundos da Regra de
   ouro.
3. Liste na entrega o que foi derivado em vez de observado. Tela que reprova
   contraste ou que pinta área com índigo não é pendência para anotar: é
   motivo para refazer.
