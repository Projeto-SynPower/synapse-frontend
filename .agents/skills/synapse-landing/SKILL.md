---
name: synapse-landing
description: Use when editing the Synapse landing page — adding a skill or plugin, changing a flow diagram, the modal, or the text. Keeps data generated, text in pt-BR and styling on design-system tokens.
---

# Landing do Synapse

Página estática na raiz deste repositório. Os fatos vêm do `site-catalog.json`, gerado no Synapse; o texto editorial é escrito à mão; o visual vem do design system.

## Fluxo de dados

`site-catalog.json` (copiado do Synapse) + `content/ptbr.json` + `content/instalar.json` → `scripts/build_data.py` → `data/catalog.js` (`window.SYNAPSE`) → `app.js`.

Nunca edite `data/catalog.js`. Rode `python3 scripts/build_data.py` e confira com `--check`.

## Adicionar uma skill

1. Ela precisa estar no `site-catalog.json`. Se não estiver, gere de novo no Synapse (veja `AGENTS.md`).
2. Escreva em `content/ptbr.json`, em `skills.<id>`: `resumo`, `oQueE`, `quando` (lista), `entrega` e, se couber, `nota`. Sem entrada, o modal cai no texto original do SKILL.md, que pode estar em inglês.
3. Rode o build e abra `#skill-<id>` para ver o modal.

## Adicionar um plugin

1. Entrada em `content/ptbr.json`, em `plugins.<id>`: `resumo`, `quando`, `limite`. Entrada em `content/instalar.json`, em `plugins.<id>`, com as notas de `npx`, `claude` e `codex`.
2. Fluxo em `assets/js/flows.js`: nós e arestas, coordenadas em viewBox de 600 de largura. Use só os tipos existentes (`skill`, `subagente`, `hook`, `servidor`, `regra`, `pessoa`, `saida`). Tipo novo exige classe em `styles.css` com token e forma distinta, nunca só cor.
3. Cada nó e cada seta do diagrama tem de existir nos SKILL.md, README ou scripts do plugin. Cite a fonte no commit.

## Movimento

Tudo em `assets/js/motion.js` e no fim de `styles.css`. Novo bloco com revelação: seletor em `marcar(...)`. Diagrama novo ganha entrada e pacotes sozinho, via `flows.js`. Só `opacity` e `transform`; teste com `prefers-reduced-motion: reduce`.

## Checagem antes de entregar

- `lint_output.py` limpo em cada arquivo mexido.
- Contraste lido nos dois temas (claro e `.dark`).
- 390 px sem rolagem horizontal da página. O diagrama rola dentro do próprio quadro.
- Teclado: Tab chega a filtros, cartões, abas (setas) e modal; Esc fecha o modal.
- Nenhum número escrito à mão.

## Armadilhas

- `fetch` não funciona em `file://`. Por isso o dado é um `.js`, não um `.json`.
- Rótulo de aresta no SVG leva um retângulo de fundo; sem ele a linha atravessa o texto.
- `<dialog>` fecha com Esc sem disparar clique: restaure o foco no evento `close`, não no clique.

## Vocabulário

Chame tudo de "skill". Não use "avulsa", "interna" nem selos de tipo. O filtro do catálogo usa só o nome do plugin.
