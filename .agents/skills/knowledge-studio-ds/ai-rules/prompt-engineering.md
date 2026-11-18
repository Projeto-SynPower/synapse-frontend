## 22. COMO A IA DEVE INTERPRETAR ESTA SKILL

### 22.1 Hierarquia de prioridades (em conflito, o de cima vence)

1. Acessibilidade (§20).
2. Fidelidade aos tokens medidos (`tokens.json`).
3. Consistência com os padrões observados (§7–§14).
4. Expressão visual nova.

Fidelidade ao app **não** vence acessibilidade: onde o app reprova contraste,
a skill corrige e registra a divergência (§20.5, §27.5).

### 22.2 Dominância de cor — a regra que mais se erra

O erro típico é pintar o card de destaque, a seção de KPIs ou o cabeçalho de
índigo porque "é a cor da marca". No app, o índigo cheio é só ação e identidade:
um CTA com gradiente, o item ativo, o eyebrow, o seletor de modo, a barra de
progresso, o foco. Área grande é branca ou cinza frio (§3.3).

O segundo erro mais provável: pintar a ação de cada alerta de índigo. No
Cockpit ela é ghost; quatro alertas com quatro botões primários acabam com a
hierarquia (§8.1).

### 22.3 Reutilizar vs. criar componente (árvore de decisão)

Padrão do app (§7–§13) → componente shadcn com tokens da skill → composição
dos existentes → componente novo justificado (§6).

### 22.4 Quando simplificar vs. adensar

Visão geral (Cockpit): no máximo cerca de 4 itens por bloco e "Ver todos →".
Tela de trabalho (lista de documentos, pipeline): adense, com controles de
36px e tabela. O modo Avançado adensa; o Simples resume (§16).

### 22.5 Preencher lacunas com coerência

Muita coisa está marcada "não observado". Para esses casos: derive do padrão
shadcn/ui usando os tokens desta skill, siga o princípio mais próximo de §2.1
e diga no resultado o que foi derivado, para alguém confirmar.

## 23. PROMPT ENGINEERING (gerar telas consistentes)

### 23.1 Regras invioláveis (a IA nunca faz)

- Cor, raio, sombra ou fonte fora do `tokens.json`.
- Dois CTAs com gradiente na mesma tela.
- Status só por cor, sem a palavra.
- Alerta sem ação.
- Texto de interface em inglês fora do vocabulário de §19.2.
- Tema de marketing (ciano, violeta, Instrument Serif) dentro do app.

### 23.2 O que todo prompt de geração deve fixar

A tela e o ponto do fluxo (fonte → processamento → base → publicação → uso),
o papel do usuário, o modo (Simples ou Avançado), o tema e o destino do código
(app Tailwind ou protótipo com `tokens.css`).

### 23.3 Modelo de prompt (preencher)

```
Tela: <nome> em /app/<rota>, ponto do fluxo: <fonte|processamento|base|publicação|uso>
Usuário: <papel>, modo <Simples|Avançado>, tema <claro|escuro>
Objetivo: <o que a pessoa precisa decidir ou fazer>
Dados: <objetos, estados do vocabulário de §10.1, números>
Destino: <componente React no app (Tailwind) | HTML com assets/tokens.css>
Siga knowledge-studio-ds: cabeçalho §1.3, um CTA, status com texto.
```

### 23.4 Como validar a saída de uma IA

Rode `lint_output.py` e `check_checklist.py` no arquivo gerado, e depois passe
pelos itens manuais de §25. O resultado ainda precisa passar pelo olho: o
teste da Regra de ouro (SKILL.md) leva cinco segundos.
