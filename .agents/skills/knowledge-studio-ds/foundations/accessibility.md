## 20. ACESSIBILIDADE (WCAG 2.2 AA — inegociável)

Acessibilidade é a prioridade 1 desta skill: quando fidelidade ao app e
acessibilidade conflitam, a acessibilidade vence e o conflito vai para o
backlog do app (§29.1). Esta seção aponta onde isso já acontece.

### 20.1 Contraste (WCAG 1.4.3 / 1.4.11)

Texto normal 4.5:1, texto grande (24px, ou 18.66px em negrito) 3:1, e
componente de interface e indicador de foco 3:1. Pares verificados em §3.2 e
§27.2. Par novo passa por `scripts/check_contrast.py` antes de entrar numa
tela.

O print do Cockpit mostrou quatro pares de texto pequeno que reprovam no app:
badge de sucesso (3.98:1), badge de aviso (3.33:1), rótulo de grupo da
sidebar (3.36:1) e papel no rodapé (3.91:1). As correções estão em §3.2 e
§10.1. O nome "Studio" no logotipo também fica abaixo (3.91:1), mas logotipo
é exceção da WCAG 1.4.3.

### 20.2 Cor nunca é o único canal (WCAG 1.4.1)

Todo status tem a palavra (§10.1). Barra de progresso tem o percentual
escrito. Erro de campo tem mensagem.

Dois pontos do app comunicam só por cor e precisam de texto equivalente:
o **ponto de severidade** do alerta (texto oculto "Erro:", "Atenção:",
"Aviso:" antes do título) e o **ponto de notificação** do sino (contagem no
nome acessível).

### 20.3 Teclado (WCAG 2.1.1 / 2.1.2 / 2.4.7)

Tudo o que se clica se alcança com Tab e se aciona com Enter ou Espaço. Card
clicável inteiro é um link ou botão de verdade, não um `div` com `onClick`.
`⌘K` abre a busca e Esc fecha.

### 20.4 Ordem de foco (WCAG 2.4.3)

Sidebar → topbar → cabeçalho de página → conteúdo, na ordem visual. Dentro do
Cockpit, KPIs antes dos blocos.

### 20.5 Foco visível (WCAG 2.4.7 / 2.4.11)

<!-- ⚠️  Esta seção é CONTRATO de script: `gen_tokens_css.py` confere que os
     três valores abaixo aparecem aqui antes de escrever o anel de foco no
     tokens.css. Mantenha-os em sincronia com `focus_ring` do tokens.json. -->

Anel de foco visível: outline de **2px** sólido em `var(--primary)`, com
offset 2px. Dá 7.83:1 sobre branco e 6.61:1 no escuro, porque `--primary`
troca com o tema.

**Isto diverge do app, de propósito.** O app usa o anel do shadcn:
`--ring`, que é o índigo a 50% de alpha. Esse anel dá **2.44:1** sobre branco
e **2.84:1** no escuro, abaixo do piso de 3:1 para indicador de foco (WCAG
1.4.11). Telas geradas com esta skill usam o anel acima; a correção no app
está no backlog (§29.1). Nunca `outline: none` sem substituto.

### 20.6 Alvos de toque e clique (WCAG 2.5.8)

Mínimo de **24×24px** (WCAG 2.5.8, nível AA), que é o que o lint cobra. O app é
de uso em desktop e denso: o menor controle observado é o botão-ícone de 28px,
e o botão principal tem 40px. Ação principal de tela fica em 36px ou mais.
Ícone de 16px dentro de um botão de 28px está certo: a área é do botão.

### 20.7 Rótulos, nomes e ARIA

- Botão só com ícone tem `aria-label` em português ("Alternar barra lateral",
  não "Toggle Sidebar").
- Campo tem `<label>` visível. Placeholder não é rótulo. A exceção é a busca
  da topbar, que o padrão de mercado mostra sem rótulo visível: ali o
  `aria-label` ("Buscar bases, documentos e perguntas") é obrigatório.
- Seletor de tema: grupo com `role="radiogroup"` e nome acessível ("Tema"),
  cada botão com o nome do tema ("Claro", "Sistema", "Escuro").
- Badge de status que também é filtro diz isso no nome acessível.

### 20.8 Leitores de tela

Lista de alertas e de processamentos é `<ul>`. Contador ("4 ativos") entra no
nome da região. Progresso usa `role="progressbar"` com `aria-valuenow`. Dado
tabular vai em `<table>`, não em grade de `div`.

### 20.9 Estados e feedback acessíveis

Mudança de status ao vivo (processamento concluído, conector com erro) é
anunciada numa região `aria-live="polite"`. Toast não rouba o foco.

### 20.10 Movimento e animação (WCAG 2.3.3 / 2.3.1)

Todo movimento respeita `prefers-reduced-motion` (§17.5). Pulso de
"Sincronizando" para quando o usuário pede menos movimento.

### 20.11 Daltonismo e visão de cores

Os estados usam matizes diferentes (verde, âmbar, vermelho, azul) **e**
palavras diferentes. A palavra é o que garante a leitura para quem não
distingue verde de vermelho.

### 20.12 Usuário interrompido

Não é requisito deste produto. O equivalente aqui é o **usuário interrompido**:
o curador volta ao Cockpit entre outras tarefas, e cada bloco precisa se
explicar sozinho (título, contador, ação), sem depender do que ele leu antes.

### 20.13 Zoom, reflow e redimensionamento (WCAG 1.4.4 / 1.4.10)

A 200% de zoom, a faixa de KPIs quebra em mais linhas e nada corta. Container
de texto sem altura fixa em px.

### 20.14 Dark mode acessível (princípios)

Os pares do escuro são verificados em separado (§27.2). Três combinações do
app reprovam hoje no escuro (§27.4).
