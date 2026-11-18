## 27. MODO ESCURO

### 27.1 A regra

O tema se escolhe na topbar, num seletor de **três estados**: Claro, Sistema
e Escuro (§7.3). "Sistema" segue `prefers-color-scheme`. O app aplica o
escuro com a classe `.dark` no `[data-app-shell]`, e o `tokens.css` usa o
mesmo seletor.

O escuro redefine **os mesmos nomes** em `[data-app-shell].dark`. Nenhuma tela
usa token "de escuro" próprio: `var(--background)` troca sozinho. O
`tokens.css` emite o bloco escuro assim, a partir do grupo `dark` do
`tokens.json`, onde os valores ficam com prefixo `dark-` só para que o
verificador de contraste consiga medir os pares.

A cor estrutural continua marcando ação, não pintando superfície. No escuro o
índigo clareia para `#8393FF`, e a mesma regra de §3.3 vale: fundo cinza-grafite,
índigo só no que é clicável.

### 27.2 Rampa de superfícies

```
--background  #11151B   página
--card        #13181E   card simples
--surface-1   #171C22   card "glass"
--surface-2   #1E232A   faixa, hover
--surface-3   #252B32   trilho, área afundada
--sidebar     #06080D   sidebar — MAIS escura que a página no escuro
```

<!-- ⚠️  Esta tabela é CONFERIDA por `scripts/tests/test_contrast_table.py`. -->

Pares já verificados no escuro:

```
  --dark-foreground / --dark-background  15.86:1 ✓ AAA
  --dark-foreground / --dark-card  15.46:1 ✓ AAA
  --dark-foreground / --dark-popover  15.16:1 ✓ AAA
  --dark-foreground / --dark-surface-3  12.38:1 ✓ AAA
  --dark-muted-foreground / --dark-background  5.91:1 ✓ AA
  --dark-muted-foreground / --dark-surface-2  5.10:1 ✓ AA
  --dark-primary / --dark-background  6.61:1 ✓ AA
  --dark-primary / --dark-sidebar  7.23:1 ✓ AAA
  --dark-primary-foreground / --dark-primary  6.99:1 ✓ AA
  --dark-accent-foreground / --dark-accent  11.86:1 ✓ AAA
  --dark-sidebar-foreground / --dark-sidebar  17.36:1 ✓ AAA
  --dark-sidebar-accent-foreground / --dark-sidebar-accent  14.83:1 ✓ AAA
  --dark-success / --dark-background  7.30:1 ✓ AAA
  --dark-warning / --dark-background  8.99:1 ✓ AAA
  --dark-info / --dark-background  7.48:1 ✓ AAA
  --dark-destructive / --dark-background  4.58:1 ✓ AA
  --dark-success / --dark-success-soft  6.12:1 ✓ AA
  --dark-warning / --dark-warning-soft  7.41:1 ✓ AAA
  --dark-info / --dark-info-soft  6.22:1 ✓ AA
  --red-400 / --dark-destructive-soft  5.68:1 ✓ AA
```

Os quatro últimos pares são de badge, com fundo e borda **derivados** pela
regra do claro (token a 10% e a 40%, aqui sobre `--dark-card`). O escuro não
foi visto em print, então os valores são ponto de partida (§29.2). O texto do
badge destrutivo no escuro vai para `--red-400`, porque `--dark-destructive`
sobre o próprio fundo dá 4.10:1.

### 27.3 Papel de cada cor no escuro

- `--warning` no escuro (`#EFA831`) **pode** ser texto (8.99:1), ao contrário
  do claro. A banlist de texto vale para o tema claro.
- `--destructive` no escuro passa como texto sobre a página (4.58:1), mas cai
  para 4.46:1 sobre `--card`. Texto de erro em card escuro usa peso 600 e
  tamanho 14px ou mais, ou vai para `--rose-300`.
- As sombras viram preto com alpha 30–55%. Borda (`--border`) passa a ter
  alpha, então é translúcida sobre qualquer superfície.

### 27.4 Pares verificados

Os pares aprovados estão em §27.2. Os que **reprovam** hoje no app:

```
--dark-destructive-foreground / --dark-destructive  3.90:1  ✗  botão destrutivo cheio
#fff / --dark-destructive           4.00:1  ✗  nem com branco puro passa
--dark-ring / --dark-background     2.84:1  ✗  anel de foco do app
--sidebar-primary / --dark-sidebar  2.56:1  ✗  não é redefinido no escuro
```

### 27.5 Erros que esta seção existe para impedir

1. **Botão destrutivo cheio no escuro com texto claro.** Reprova (3.90:1 com o
   `--destructive-foreground` do app, 4.00:1 com branco puro). Use
   a variante outline com texto `--destructive` sobre a página, ou texto
   escuro sobre o vermelho, até o app corrigir o token (§29.1).
2. **CTA com gradiente e `--primary-foreground`.** O gradiente de marca não é
   redefinido no escuro e continua índigo escuro. O `--primary-foreground` do
   escuro é quase preto, e sobre o gradiente dá 2.16–2.82:1. Texto de CTA com
   gradiente é **sempre** `#fff`, nos dois temas (6.86–8.98:1).
3. **Indicador de ativo com `--sidebar-primary` no escuro.** Herda o índigo do
   claro e some sobre a sidebar escura (2.56:1). Use `--primary`.
4. **Sidebar mais clara que a página.** No escuro ela é mais escura
   (`#06080D`), e é isso que a separa.
