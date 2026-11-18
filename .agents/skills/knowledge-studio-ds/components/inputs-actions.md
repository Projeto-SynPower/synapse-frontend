## 8. AÇÕES E ENTRADA DE DADOS

### 8.1 Botões

Variantes medidas no CSS computado e conferidas no print do Cockpit. Use a
variante pelo **papel**, não pela aparência:

| Variante | Altura | Raio | Fundo | Sombra | Quando |
|---|---|---|---|---|---|
| CTA | 40px `h-10` | 14px | `--gradient-brand` (medido: `#464DB3` → `#423EA4`), texto `#fff` | `--shadow-md` | a ação principal da página. Uma por tela |
| Secundário | 40px `h-10` | 14px | `--background` + borda `--border` | `--shadow-sm` | ações irmãs do CTA no cabeçalho |
| Ação de item (ghost) | ~36px | 14px | transparente, hover `--accent`; texto `--foreground` peso 500 | nenhuma | a ação que resolve um alerta ("Reautenticar conector"), à direita do item |
| Outline | 36px `h-9` | 12px | `--surface-1` + `--border` | nenhuma | ação dentro de card ou barra |
| Primário pequeno | 30px | 12px | `--primary`, texto `--primary-foreground` | `--shadow-primary-sm` | ação principal dentro de um card de detalhe. Medido no CSS, **não** visto no Cockpit |
| Ícone com borda | 40px | ~12px | `--background` + `--border` | nenhuma | ações globais da topbar (notificações, sair) |
| Ícone | 28px `h-7` | 4px | transparente, ativo `--accent` | nenhuma | ação só com ícone em barra compacta |

Regras:

- **Um CTA com gradiente por tela.** O gradiente é a assinatura da marca; dois
  CTAs competem e nenhum ganha.
- **Ícone à esquerda do rótulo** nos botões do cabeçalho: `Plus` em "Criar
  base", `Upload` em "Adicionar dados", `MessageSquare` em "Testar chat". Ícone
  de 16px, gap de 8px.
- **A ação de um alerta é ghost, não primária.** Com quatro alertas na tela,
  quatro botões índigo quebrariam a Regra de ouro. O que dá peso à ação é a
  posição (alinhada à direita do item) e o verbo.
- **Texto de botão é verbo + objeto**: "Criar base", "Reautenticar conector",
  "Revisar políticas" (§19.1).
- **Destrutivo** usa `--destructive`. No escuro, o preenchimento cheio com
  texto claro reprova (§27.5). Use a variante outline.
- Botão só com ícone tem `aria-label` em português.
- O foco segue §20.5, em todas as variantes.

### 8.2 Dropdown e menu

Seletor de workspace (§7.4) e menus do shadcn: fundo `--popover`, borda
`--border`, `--shadow-lg`, raio `--radius-md`. Não medido: siga o shadcn.

### 8.3 Inputs

Não observados nas telas capturadas. Base shadcn: altura 36px, borda
`--input`, fundo `--background`, raio `--radius-md`, texto `--fs-sm`. Rótulo
visível acima do campo, sempre. Placeholder não é rótulo (§20.7).

### 8.4 Select, autocomplete e busca inline

A busca global é a paleta `⌘K` (§7.7). A busca inline em listas não foi
observada.

### 8.5 Upload e adição de dados

"Adicionar Dados" (`/app/data-sources`) cobre upload de arquivo e conexão de
fonte. A tela não foi capturada. O que o Cockpit mostra do resultado: o nome
do arquivo, a base de destino e o desfecho ("12 chunks adicionados, 0
falhas"). Upload sempre informa quantos itens entraram e quantos falharam.

### 8.6 Máscaras e formatação

Formatos em §19.3.

### 8.7 Link de ação

"Ver todos →" no canto de um bloco leva à lista completa. Texto de 12–13px
em `--muted-foreground` (medido; não é `--primary`), seta como caractere e não
como ícone, sem sublinhado em repouso. O hover escurece para `--foreground`.
É discreto de propósito: no Cockpit ele concorre com os badges e as ações.
