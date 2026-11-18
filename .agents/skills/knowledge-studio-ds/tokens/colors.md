## 3. DESIGN TOKENS

Todo valor desta seção foi **medido** no CSS computado do app
(`[data-app-shell]` para o tema claro, `[data-app-shell].dark` para o escuro) e
vive em `scripts/tokens.json`. O app declara as cores em `oklch()`; a skill
guarda o equivalente sRGB em hex, porque é o que os verificadores de contraste
medem. A conversão usa o mesmo recorte de gama dos fallbacks oficiais do
Tailwind v4: `--color-blue-500` sai `#2B7FFF`, idêntico ao hex que o Tailwind
publica. Em tela P3 o app mostra essas cores um pouco mais saturadas; em sRGB
são as mesmas. O `oklch()` original de cada token está em `_oklch_source` no
`tokens.json`, para quem precisar copiar o valor exato do app.

### 3.1 Cor — Paleta canônica (produção)

A paleta tem duas camadas, e a distinção importa para decidir o que usar.

**Papéis semânticos** (o que a interface usa no dia a dia). Os nomes são os do
app e seguem o padrão shadcn/ui: `var(--primary)` na skill é o mesmo
`--primary` do app. Como escrever a classe Tailwind de cada papel está em
§28.6.

```
Papel                     Claro      Uso observado
--background              #FFFFFF    fundo da página
--foreground              #12161B    texto principal
--surface-1               #FFFFFF    card "glass" (§9.1)
--surface-2               #F5F7F9    faixa, cabeçalho de lista, hover de linha
--surface-3               #EDF0F4    trilho de progresso, fundo afundado
--card / --popover        #FFFFFF    card simples, menus
--primary / --brand       #3F46AC    ação primária, item ativo, link, foco
--primary-foreground      #FCFCFC    texto sobre --primary
--secondary / --muted     #EDF0F4    botão secundário, chip neutro
--muted-foreground        #5F646A    texto de apoio (subtítulo, meta, rótulo)
--accent                  #E9EBF3    hover e seleção leve (tinta de índigo)
--accent-foreground       #21265F    texto sobre --accent
--destructive             #CC272E    erro, ação destrutiva
--success                 #00884B    concluído, saudável
--warning                 #B67700    atenção — NUNCA como texto no claro
--info                    #006AA5    informativo, em andamento
--success-soft            #E6F3ED    fundo de badge de sucesso (token a 10%)
--success-border          #8AC8AC    borda de badge de sucesso (token a 40%)
--warning-soft / -border  #F8F1E6 / #DEC08A
--destructive-soft / -border  #FAE9EA / #E89B9F
--info-soft / -border     #E6F0F6 / #8ABAD6
--border                  #DADEE3    borda de card e divisória
--input                   #E1E5EA    borda de campo
--ring                    #3F46AC80  anel de foco do app (ver §20.5)
--sidebar                 #E1E6F3    fundo da sidebar (cinza lavanda)
--sidebar-accent          #CFD6E6    item de sidebar em hover/ativo
--sidebar-border          #AEB4C5    borda da sidebar
```

**Rampas do Tailwind em uso** (`red`, `orange`, `amber`, `emerald`, `teal`,
`sky`, `blue`, `indigo`, `violet`, `purple`, `rose`). O Tailwind v4 só emite as
variáveis dos degraus que o projeto usa, então a lista em `tokens.json` é
exatamente o conjunto de degraus que o app usa — não a rampa inteira. Degrau
que não está lá (`sky-400`, `violet-600`) não existe neste sistema.

**Os tokens `*-soft` e `*-border`** não existem com nome no app: são a regra
que ele aplica em todo badge, medida no print do Cockpit com erro de até 1
por canal. Fundo = token semântico a 10% sobre branco; borda = o mesmo token
a 40%. A skill dá nome a eles para que uma tela gerada não precise de cor
literal.

**O que o print mostrou sobre as rampas:** nada no Cockpit usa as rampas.
Badge, ícone de KPI, ponto de severidade e ícone de bloco usam os tokens
semânticos (`--success`, `--warning`, `--destructive`, `--info`,
`--primary`). As rampas continuam no `tokens.json` porque o CSS do app as
emite, mas o uso delas em outras telas não foi observado. Não as use para
status: status é token semântico.

Duas rampas entram como **correção de contraste**, porque o app reprova ali
(§3.2): `--emerald-700` para texto de badge de sucesso e `--amber-800` para
texto de badge de aviso. Os degraus 300–600 nunca são texto sobre branco.

### 3.2 Contraste — verificação com os tokens reais

<!-- ⚠️  Esta tabela é CONFERIDA por `scripts/tests/test_contrast_table.py`:
     cada linha marcada ✓ AA / ✓ AAA é recalculada contra o mesmo motor que o
     resto da skill usa. Ao trocar a paleta, recalcule com
         python3 scripts/check_contrast.py <texto> <fundo>
     e reescreva as linhas. -->

Pares já verificados no tema claro (texto normal, < 18px):

```
--foreground / #fff: 18.16:1 ✓ AAA
--foreground / --surface-3: 15.89:1 ✓ AAA
--muted-foreground / #fff: 5.97:1 ✓ AA
--muted-foreground / --surface-2: 5.56:1 ✓ AA
--muted-foreground / --muted: 5.22:1 ✓ AA
--primary / #fff: 7.83:1 ✓ AAA
--primary / --surface-2: 7.29:1 ✓ AAA
--primary / --accent: 6.58:1 ✓ AA
--primary / --sidebar: 6.27:1 ✓ AA
--primary-foreground / --primary: 7.63:1 ✓ AAA
--accent-foreground / --accent: 11.71:1 ✓ AAA
--sidebar-foreground / --sidebar: 15.01:1 ✓ AAA
--sidebar-accent-foreground / --sidebar-accent: 13.35:1 ✓ AAA
--destructive / #fff: 5.39:1 ✓ AA
#fff / --destructive: 5.39:1 ✓ AA
--success / #fff: 4.54:1 ✓ AA
--info / #fff: 5.83:1 ✓ AA
--amber-700 / #fff: 5.03:1 ✓ AA
--amber-800 / --amber-100: 6.36:1 ✓ AA
--emerald-700 / --emerald-100: 4.72:1 ✓ AA
--sky-700 / --sky-100: 5.09:1 ✓ AA
--violet-700 / --violet-100: 6.15:1 ✓ AA
--rose-700 / --rose-100: 5.02:1 ✓ AA
--red-700 / #fff: 6.42:1 ✓ AA
--destructive / --destructive-soft: 4.60:1 ✓ AA
--info / --info-soft: 5.04:1 ✓ AA
--emerald-700 / --success-soft: 4.70:1 ✓ AA
--amber-800 / --warning-soft: 6.32:1 ✓ AA
--muted-foreground / --sidebar: 4.78:1 ✓ AA
```

Pares que **reprovam** e por isso estão na banlist de texto (`tokens.json`):

```
--warning / #fff       3.73:1  ✗  use --amber-700 (5.03:1) para texto de aviso
--ring / #fff          2.44:1  ✗  nem como indicador de foco (piso 3:1) — §20.5
--sky-600 / #fff       4.02:1  ✗
--emerald-600 / #fff   3.65:1  ✗
--violet-500 / #fff    4.40:1  ✗
--rose-500 / #fff      3.75:1  ✗
```

Pares que o **app usa hoje e reprovam** (medidos no print do Cockpit). A skill
já gera a versão corrigida; o app precisa corrigir na fonte (§29.1):

```
--success / --success-soft   3.98:1  ✗  badge "Ativa", "Concluído"  → --emerald-700 (4.70)
--warning / --warning-soft   3.33:1  ✗  badge "Revisar"             → --amber-800 (6.32)
#777C86 / --sidebar          3.36:1  ✗  rótulo de grupo da sidebar  → --muted-foreground (4.78)
#6D717C / --sidebar          3.91:1  ✗  papel no rodapé da sidebar  → --muted-foreground (4.78)
```

`--success` passa com folga mínima (4.54:1). Use-o só em texto de peso 500 ou
mais, nunca em texto de 12px (`--fs-xs`) em cinza de fundo — sobre
`--surface-2` ele cai abaixo do piso.

### 3.3 Regra de dominância do índigo (60-30-10)

No app, "azul" é o índigo `--primary`. A proporção observada no Cockpit e na
tela de Bases:

- **~60% neutro** — `--background`, `--surface-*`, `--card`, `--border`. É a
  área de trabalho: tudo o que o usuário lê fica aqui.
- **~30% estrutural** — a sidebar (`--sidebar`, cinza lavanda) e os estados de
  navegação (`--sidebar-accent`, `--accent`). É um índigo **dessaturado**, não
  o índigo cheio: a estrutura se vê, mas não compete.
- **~10% de ação e identidade** — `--primary` cheio e `--gradient-brand`: o
  CTA da página, o seletor de modo, a barra do item ativo, o eyebrow, os
  ícones de bloco, a barra de progresso e o foco. Um CTA com gradiente por
  tela.

A cor de status (`--success`, `--warning`, `--destructive`, `--info` e suas
rampas) é **condicional**: só aparece quando o estado existe, e não conta na
proporção. Uma tela de alertas cheia de vermelho não viola a regra; uma tela
com cards de fundo índigo, sim.

`scripts/check_dominance.py` mede essa proporção nas declarações de CSS (ver
§25.1).
