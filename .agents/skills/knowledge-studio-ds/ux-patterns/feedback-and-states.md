## 10. FEEDBACK E ESTADOS

### 10.1 Vocabulário de status e alerta acionável

**Vocabulário de status.** Cada objeto tem o seu conjunto fechado de estados.
Não crie sinônimos: "Revisar" é "Revisar" em toda tela.

| Objeto | Estado | Tom | Fonte |
|---|---|---|---|
| Base | Ativa | success | print |
| Base | Revisar | warning | print |
| Base | Bloqueada | destructive | print |
| Base | Publicada · Em revisão · Processando · Rascunho | success · warning · info · neutro | só no HTML; tom inferido |
| Processamento | Rodando (ícone `Clock`) | info | print |
| Processamento | Concluído (ícone `CircleCheck`) | success | print |
| Processamento | Avisos · Erro | warning · destructive | só no HTML; tom inferido |
| Conector | Sincronizando | info | print |
| Conector | Auth | destructive | print |
| Conector | Pausado | neutro | print |

**Anatomia do badge** (medida no print):

- Pílula (`rounded-full`), 21px de altura, ~8px de padding horizontal, texto
  de 11px peso 500. Status de processo leva ícone de 12px antes da palavra;
  status de base e de conector, não.
- **Com tom**: fundo `--<tom>-soft`, borda de 1px `--<tom>-border`, texto no
  token do tom. É a regra do app: o token a 10% no fundo e a 40% na borda
  (§3.1).
- **Neutro** (Pausado, Rascunho): fundo `--muted`, borda `--border`, texto
  `--muted-foreground`.

**Correção de contraste.** No app, o texto do badge é o próprio token, e dois
tons reprovam o AA com 11px (§3.2). Nas telas geradas pela skill:

| Tom | Texto no app | Texto na skill |
|---|---|---|
| success | `--success` (3.98:1 ✗) | `--emerald-700` (4.70:1) |
| warning | `--warning` (3.33:1 ✗) | `--amber-800` (6.32:1) |
| destructive | `--destructive` (4.60:1) | `--destructive` |
| info | `--info` (5.04:1) | `--info` |

Fundo e borda continuam os do app. A diferença de cor do texto é pequena à
vista e passa a norma.

Duas regras que valem sempre:

- O badge sempre tem a palavra. Cor sozinha nunca comunica estado (§20.2).
- "Auth" é jargão. O detalhe do item já diz "Token expirado em …", e o
  alerta diz "erro de autenticação". Para tela nova, prefira "Reautenticar"
  (§19.2).

**Alerta acionável** ("Alertas que precisam de você"), medido no print:

```
┌ card simples ───────────────────────────────────────────────────────────┐
│ ● SharePoint Jurídico com erro de autenticação     Reautenticar conector │
│   O conector parou de sincronizar há 14h. Documentos novos não estão     │
│   entrando na base.                                                      │
└──────────────────────────────────────────────────────────────────────────┘
  ↑ ponto de 8px: --destructive (erro), --warning (atenção), --info (aviso)
```

- **Três partes**: título (~15px, peso 500, diz o problema), descrição (~13px,
  `--muted-foreground`, diz o impacto e a recomendação) e ação ghost à
  direita (§8.1).
- **Ordem**: por severidade, erro primeiro.
- **O ponto de severidade só por cor não basta** (WCAG 1.4.1). O app não tem
  equivalente textual da severidade; a skill exige um texto só para leitores
  de tela antes do título ("Erro:", "Atenção:", "Aviso:") e um título que
  nomeie o problema.
- Alerta sem ação não entra na lista. Se não há o que fazer, é informação e
  vai para outro lugar.

### 10.2 Toast

Não observado. Para confirmação de ação concluída (base publicada, conector
reautenticado), use o Toast (Sonner) do shadcn, que não rouba o foco.

### 10.3 Snackbar

Não usado. Use Toast.

### 10.4 Progresso

**Processamento em andamento**, medido no print:

```
Confluence — Espaço Engineering                               [◷ Rodando]
Engenharia & Arquitetura · há 144d
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░
embedding · 64% · Gerando embeddings (3.621 / 5.670 chunks)
```

- Barra de **6px**, largura total do item. Preenchimento com
  `--gradient-brand`, que vai de `#4447AD` a `#413AA1` no trecho preenchido;
  trilho em `--muted`. Pontas arredondadas.
- Linha técnica em `--font-mono`, ~11px, `--muted-foreground`, no formato
  `etapa · percentual · descrição (feito / total unidade)`.
- **Concluído** troca a barra por uma linha de resultado em fonte normal, de
  12px: "12 chunks adicionados, 0 falhas".

**Cobertura** (card de base, observado só no HTML): rótulo e percentual na
mesma linha ("Cobertura de embeddings 88%"), com a barra abaixo, na mesma
regra de cor.

O percentual está sempre escrito. A barra ilustra, não informa sozinha. Use
`role="progressbar"` com `aria-valuenow` (§20.8).

### 10.5 Carregamento

Não observados. O Cockpit se diz "em tempo real": carregue cada bloco de forma
independente, com skeleton no formato do card, para um conector lento não
travar a tela inteira.

### 10.6 Estado vazio

Observado só o vazio de uma base ("Rascunho", zeros, 0% de cobertura), que
mantém o card. Estado vazio de lista deve dizer por que está vazio e oferecer
a ação: "Nenhuma fonte conectada. [Adicionar dados]".

### 10.7 Nota inline

Não observado.
