# synapse-frontend — landing do Synapse

Repositório independente: HTML, CSS e JS puros, sem build de front e sem dependência de npm. Abre por `file://` ou por servidor estático.

## Rodar

```bash
python3 scripts/build_data.py          # regera data/catalog.js a partir de site-catalog.json
python3 scripts/build_data.py --check  # sai com 2 se estiver defasado
python3 -m http.server 8731 --bind 127.0.0.1
```

Os fatos vêm de `site-catalog.json`, que é gerado no repositório do Synapse e só copiado para cá. Nunca edite à mão. No Synapse:

```bash
python3 scripts/export_site_catalog.py --output ../synapse-frontend/site-catalog.json
```

Depois rode `build_data.py` aqui. Rode também depois de mudar `content/ptbr.json` ou `content/instalar.json`. O `schemaVersion` do arquivo precisa ser o que o `build_data.py` suporta; se o Synapse subir a versão, atualize o script antes.

## Estrutura

| Caminho | Papel |
|---|---|
| `index.html` | Marcação. Seções: hero, o que é, plugins, skills, instalar. |
| `assets/css/tokens.css` | Cópia do DS. Não editar à mão: vem de `knowledge-studio-ds/assets/tokens.css`. |
| `assets/css/styles.css` | Estilo da landing. Só tokens do DS, via `var()`. |
| `assets/js/app.js` | Números, abas de plugin, catálogo com busca e filtros, modal. |
| `assets/js/flows.js` | Diagramas SVG: visão macro (`macro`) e fluxo de cada plugin. |
| `assets/js/motion.js` | Movimento: partículas do hero, título por palavra, revelação ao rolar, contagem, barra de progresso. |
| `content/ptbr.json` | Texto editorial em português, escrito à mão. |
| `content/instalar.json` | Notas de instalação por plugin e por via (npx, Claude Code, Codex). Os comandos são montados em `app.js`; só afirme o que está nos READMEs do repositório. |
| `site-catalog.json` | Contrato vindo do Synapse. Não editar. |
| `data/catalog.js` | Gerado. Não editar. |
| `scripts/stage_pages.sh` | Monta `_site/` só com o que vai ao GitHub Pages. |
| `.github/workflows/pages.yml` | Publica no GitHub Pages. |
| `.agents/skills/` | Skills locais. `.claude/skills/` aponta para elas por link relativo. |

## Regras

1. Todo texto visível em português do Brasil. Aplique `escrita-tecnica-ptbr` e `stop-slop`.
2. Todo valor visual vem de tokens do DS, via `var()`. Nada de hex, cor nomeada ou px solto. Antes de entregar:
   `python3 .agents/skills/knowledge-studio-ds/scripts/lint_output.py <arquivo>` em cada arquivo mexido.
3. Estado nunca só por cor: sempre forma, borda ou palavra. Nos diagramas: skill = traço cheio, subagente = tracejado, hook = traço grosso, servidor MCP = pontilhado.
4. Afirme sobre plugin e skill só o que está no `SKILL.md`, no README ou nos scripts do repositório. Se não achar, pergunte em vez de inventar.
5. Número na página sai de `window.SYNAPSE`. Não escreva contagem à mão.
6. Sem framework, sem CDN, sem fonte externa. Precisa funcionar offline.
7. Modal usa `<dialog>`: Esc fecha, foco volta ao gatilho, `#skill-<id>` abre direto.
8. Conteúdo novo de skill ou plugin: use a skill `synapse-landing` (checklist).
9. Ideia ou mudança grande de layout: comece pelo `brainstorm`, uma pergunta por vez.

## Skills locais

- `knowledge-studio-ds`: design system. Fonte de tokens e regras de componente.
- `brainstorm`, `grilling`: alinhar antes de construir.
- `escrita-tecnica-ptbr`, `stop-slop`: texto.
- `synapse-landing`: como esta landing é montada e como estendê-la.

Sem o `impeccable` instalado aqui (Node 12). Se for usá-lo, rode fora desta máquina e traga o resultado para o DS.

## Movimento

Referência: antigravity.google (campo de partículas no hero, título que sobe por palavra, blocos que se revelam ao rolar, diagramas que se desenham). Regras desta página:

- Só `opacity` e `transform`. Duração e easing vêm de `--mov-dur` e `--mov-ease` em `styles.css`.
- Tudo respeita `prefers-reduced-motion`: sem partículas animadas, sem pacotes nos diagramas, conteúdo já visível.
- Entrada animada de card é exceção deste tema de landing; o DS (§17.3) proíbe isso no app. Não copie para telas de produto.
- Novo bloco que deve se revelar: adicione o seletor em `marcar(...)` no `motion.js`.

## Pendências de design (o DS não cobre)

A landing usa o tema do app. O DS não mede hero de marketing nem overlay (§1.2, §9.9, §29.3). Foram derivados dos tokens: hero, modal, abas de plugin, diagrama. Valide com o time antes de tratar como definitivo.
