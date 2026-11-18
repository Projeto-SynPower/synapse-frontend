## 11. DADOS E VISUALIZAÇÃO

### 11.1 Tabela de dados

Nenhuma tabela foi observada nas telas capturadas: o app lista em cards. Para
listas longas (documentos de uma base, chunks, logs de acesso), use a Table do
shadcn com cabeçalho em `--surface-2`, texto de coluna `--fs-xs` em
`--muted-foreground`, linha com hover `--surface-2` e números alinhados à
direita com `tabular-nums`.

### 11.2 Data grid

Não observado.

### 11.3 Paginação

Não observada.

### 11.4 Filtros

Filtro por status é o controle segmentado de §7.6. Filtro por base aparece na
URL (`/app/data-sources?kb=kb-comercial`): o filtro é compartilhável e
sobrevive ao recarregar a página. Siga isso.

### 11.5 Kanban

Não usado.

### 11.6 Feed de processamentos

"Últimos processamentos" funciona como feed. Cada item tem a origem
("Confluence — Espaço Engineering" ou "Upload — Política de Home Office
2026.pdf"), a base de destino e o tempo ("Políticas de RH · há 144d"), o badge
de processamento e, abaixo, a barra com a linha técnica (em andamento) ou a
linha de resultado (concluído) — §10.4. O cabeçalho do bloco tem ícone `Clock`
e "Ver todos →".

### 11.7 Timeline

Não observada.

### 11.8 Calendário

Não usado.

### 11.9 Gráficos

Nenhum gráfico foi observado. O app comunica métrica por **número com
contexto** (§9.2) e **barra de progresso** (§10.4). Antes de propor um
gráfico, confirme que um número com variação não resolve.

Se um gráfico entrar, a série principal é `--primary` (ou `--gradient-brand`
em barra, como no progresso) e as secundárias vêm das rampas de acento
(`--violet-500`, `--teal-900`, `--sky-600`). Nunca use as cores de status
para série que não é status.
