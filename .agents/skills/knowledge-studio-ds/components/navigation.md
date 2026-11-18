## 7. NAVEGAÇÃO

### 7.1 Sidebar (navegação primária)

Observada nos dois modos (§16). No **Avançado** (print do Cockpit):

```
(✦) AI Knowledge Studio
[ Simples | ■Avançado■ ]
TRABALHAR
 ▌⌂ Início                          ← ativo
  ⛁ Bases de Conhecimento
  ▢ Chat com os Dados
PREPARAR
  Fontes & Conectores · Perfis de Ingestão · Pipelines · Chunk Studio
CONSUMIR
  Perfis de Recuperação · Retrieval Lab
GOVERNANÇA
  Governança · Auditoria & Lineage · Publicação
CONFIGURAR
  Integração · Configurações
──────────
(MC) Marina Costa                    [⇥]
     Curadora · ACME
```

No **Simples** (HTML do Cockpit): só dois grupos. TRABALHAR tem Início, Bases
de Conhecimento, Adicionar Dados e Chat com os Dados; PUBLICAR tem Publicação.

Anatomia medida:

| Elemento | Medida |
|---|---|
| Rótulo de grupo | ~11px, caixa alta, tracking largo. O app usa `#777C86` (3.36:1, reprova); a skill usa `--muted-foreground` (4.78:1) |
| Item | 32px de altura, recuo de 8px, ícone de 16px + rótulo de ~13px peso 500. Texto `#3C404A` (≈ `--sidebar-foreground` a 80%, 8.31:1); ícone mais claro, ≈ `--muted-foreground` |
| Item ativo | fundo `--sidebar-accent`, borda de 1px `--sidebar-border`, raio ~12px, **barra de 2px em `--primary` na borda esquerda**, ícone em `--primary`, rótulo peso 600 em `--foreground` |
| Rodapé | avatar (§12.1), nome ~13px peso 600, papel ~11px, e botão de sair |

- Os grupos seguem o fluxo do produto: trabalhar → preparar → consumir →
  governar → configurar. Item novo entra no grupo do seu ponto no fluxo.
- Os itens são tarefas ou módulos ("Chat com os Dados", "Chunk Studio"), não
  nomes de tabela.
- O indicador de ativo é `--primary` nos dois temas, nunca
  `--sidebar-primary` no escuro (§27.5).
- O papel no rodapé usa `#6D717C` no app (3.91:1, reprova); a skill usa
  `--muted-foreground`.

### 7.2 Sidebar colapsada

A sidebar colapsa pelo botão do topo ("Toggle Sidebar"). Colapsada, cada item
precisa de tooltip com o nome, porque o ícone sozinho não identifica a tarefa.
O rótulo acessível do botão deve estar em português: "Alternar barra lateral"
(§19.2).

### 7.3 Topbar

Observada, da esquerda para a direita. Todos os controles têm 40px de
altura e borda de 1px em `--border`:

1. **Botão da sidebar** (ícone `PanelLeft`, sem borda).
2. **Breadcrumb** (§7.5).
3. **Campo de busca** (§7.7), o elemento mais largo (~575px).
4. **Seletor de workspace** (§7.4).
5. **Seletor de tema**: grupo de três botões-ícone, Claro (`Sun`), Sistema
   (`Monitor`) e Escuro (`Moon`). O ativo tem fundo `--accent` e ícone
   `--accent-foreground`. É um controle de três estados, não um interruptor.
6. **Notificações**: botão-ícone `Bell` com borda; há não lidas quando aparece
   um ponto de ~6px em `--destructive` no canto superior direito. O ponto
   precisa de equivalente textual no nome acessível ("Notificações, 3 não
   lidas").
7. **Sair**: botão-ícone `LogOut` com borda. A mesma ação existe no rodapé
   da sidebar.

O cabeçalho de página (§1.3) fica abaixo, no conteúdo.

### 7.4 Seletor de workspace

Botão de 40px com borda, ícone `Building2`, texto `Organização · Área`
("ACME Holding · Pessoas") e chevron à direita. Abre um menu com as áreas
("ACME Holding · Comercial", "ACME Holding · Jurídico"). O workspace muda o
conjunto de bases visíveis, por isso fica sempre visível na topbar.

### 7.5 Breadcrumb

`App › Início`: os níveis anteriores em `--muted-foreground` e com link; o
atual em `--foreground` peso 500, sem link. Separador `ChevronRight` pequeno.

### 7.6 Controle segmentado

Duas variantes observadas:

**Modo de uso (sidebar)** — medido no print. Trilho de 38px com fundo
`#D4DAE9` (≈ `--sidebar-accent` a 70%) e raio ~12px. O segmento ativo tem
30px, fundo `--primary`, texto `--primary-foreground` peso 600 e sombra
baixa, com 4px de recuo do trilho. O inativo tem texto `#535862` (5.10:1).

**Filtro de status (tela de Bases)** — observado só no HTML:

```
[ Todas | Publicadas | Ativas | Em revisão | Processando | Rascunho | Bloqueadas ]
```

Raio `rounded-md` (12px), altura `--size-control-sm` (30px), sem sombra
(medido no CSS). O estado ativo dessa variante não foi visto em print; use o
padrão das Tabs do shadcn (fundo `--background` sobre trilho `--muted`), e não
o índigo da variante da sidebar. O índigo cheio fica reservado ao modo de uso,
que é uma escolha global.

A ordem dos filtros acompanha o ciclo de vida da base, e "Todas" vem
primeiro.

### 7.7 Command palette e busca global

Na topbar, um **campo de busca** de 40px com borda `--border`, ícone `Search`
à esquerda, placeholder "Buscar bases, documentos, perguntas…" e, à direita,
o atalho `⌘K` num `kbd` com fundo `--muted` e texto `--muted-foreground` em
`--font-mono`. Clicar ou apertar `⌘K` abre a paleta (Command do shadcn), cujo
conteúdo não foi observado. O placeholder diz **o que** se busca; como é
placeholder, o campo precisa de `aria-label` (§20.7).

### 7.8 Ações rápidas

As ações rápidas do Cockpit são os botões do cabeçalho ("Criar base",
"Adicionar dados", "Testar chat"). Não crie uma segunda barra de ações rápidas.

### 7.9 Navegação no mobile

No mobile, a sidebar do shadcn vira um drawer (Sheet). Não observado.
