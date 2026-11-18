## 24. ANTI-PADRÕES (o que nunca fazer)

### 24.1 Cor e identidade

- Card, faixa ou cabeçalho com fundo `--primary` ou gradiente.
- Gradiente ciano→violeta ou glow colorido (tema de marketing) no app.
- `--warning` como texto no tema claro (3.73:1).
- `--brand` no lugar de `--primary` no app shell.
- Texto de badge em `--success` ou `--warning` (reprova com 11px); use
  `--emerald-700` e `--amber-800` sobre o fundo `*-soft` (§10.1).
- Status em rampa (`--emerald-100`, `--sky-700`) em vez do token semântico.

### 24.2 Tokens, tipografia e espaçamento

- Hex, `rgb()` ou `oklch()` literal em tela; tudo sai de token.
- Serifa em tela de produto; display é Geist.
- Raio fora da escala (7px, 8px, 16px).
- Texto abaixo de 12px.

### 24.3 Componentes e layout

- Segundo CTA com gradiente.
- Ação de alerta como botão primário: ela é ghost (§8.1).
- Itens de bloco separados por divisória: cada item é um card simples (§9.3).
- H1 ou valor de KPI em bold.
- KPI sem linha de contexto.
- Lista de itens acima da faixa de KPIs no Cockpit.
- Card estático com hover de card clicável.

### 24.4 Formulários e tabelas

- Erro de campo só pela cor da borda, sem mensagem.
- Placeholder como único rótulo.
- Dado tabular em grade de `div`.

### 24.5 Movimento e microinterações

- Animar `width`, `height`, `top`, `left`, `margin` ou `padding`.
- Spinner sozinho para processamento que tem percentual.
- Animação de entrada em card ou KPI.

### 24.6 UX operacional e acessibilidade

- Status só por cor, inclusive o ponto de severidade do alerta sem texto
  oculto.
- Alerta sem ação.
- `outline: none` sem substituto, ou anel de foco em `--ring` (2.44:1).
- Rótulo acessível em inglês ("Toggle Sidebar").
- Formato de número ou moeda fora do padrão brasileiro (§19.3).

## 25. CHECKLISTS DE ENTREGA

`scripts/check_checklist.py <arquivo>` automatiza o que se decide por leitura
do código e imprime os itens abaixo marcados como manuais. Os dois juntos são
o checklist; nenhum dos dois sozinho.

### 25.1 Identidade e cor

- [ ] Área neutra domina; índigo cheio só em ação, ativo, link e foco
  (`check_dominance.py` aproxima; o olho decide).
- [ ] Um CTA com gradiente por tela, com texto `#fff`.
- [ ] Nada do tema de marketing.

### 25.2 UI e consistência

- [ ] Componente do catálogo reutilizado em vez de inventado.
- [ ] Status do vocabulário fechado de §10.1, sem sinônimo, em badge com a
  anatomia medida (pílula, `*-soft`, `*-border`).
- [ ] Cabeçalho de página no formato de §1.3.

### 25.3 Acessibilidade (WCAG 2.2 AA — bloqueante)

- [ ] Pares novos verificados com `check_contrast.py`.
- [ ] Foco visível com o anel de §20.5, nos dois temas.
- [ ] Alvo de clique de 24px ou mais.

### 25.4 Responsividade e layout

- [ ] KPIs quebram de 6 para 3 e 2 colunas sem cortar texto.
- [ ] Zoom de 200% sem rolagem horizontal.

### 25.5 Conteúdo e linguagem

- [ ] Botões com verbo + objeto.
- [ ] Números, moeda, data e tempo relativo no padrão de §19.3.
- [ ] Plural concorda com o número.

### 25.6 UX e heurísticas

- [ ] Todo alerta tem impacto e ação.
- [ ] Todo número de qualidade aparece junto do que mede.

### 25.7 Performance e microinterações

- [ ] Blocos carregam de forma independente.
- [ ] Movimento reduzido respeitado.

### 25.8 Design review (fechamento)

- [ ] O resultado passa no teste de cinco segundos da Regra de ouro.
- [ ] O que foi derivado (não observado) está dito na entrega.
