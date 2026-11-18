## 14. DASHBOARDS

O Cockpit (`/app/cockpit`) é o dashboard de referência.

### 14.1 Hierarquia de leitura (de cima para baixo)

1. **Cabeçalho** (§1.3) — saudação, o que a tela mostra, três ações.
2. **Faixa de 6 KPIs** (§9.2) — a saúde em números.
3. **Duas colunas, 2:1** (§5.3):
   - principal: **Alertas que precisam de você** (o que exige ação agora) e,
     abaixo, **Últimos processamentos** (o que está acontecendo);
   - lateral: **Bases que precisam de ação** e, abaixo, **Conectores** (onde
     está o problema).

A ordem vai de "estou bem?" a "o que faço?" e depois a "onde". Não coloque
lista de itens acima dos KPIs, nem ponha a coluna lateral à esquerda.

### 14.2 KPIs

Seis, na mesma ordem em toda sessão, porque o curador aprende a ler a faixa
pela posição. Cada KPI responde uma pergunta de governança: quantas bases,
quanto conteúdo, que qualidade, que risco, que confiabilidade, que uso e a que
custo.

### 14.3 Cards e blocos de dashboard

Lista em card (§9.3): bloco glass com itens em card simples, cerca de 4 itens
visíveis e "Ver todos →" para o resto. Cada item tem status ou ação à
direita. Os quatro blocos observados têm ícone de cabeçalho: `TriangleAlert`
em `--warning` para alertas, e `Clock`, `TrendingUp` e `Plug` em `--primary`
para os demais.

### 14.4 Filtros de dashboard

O seletor de workspace (§7.4) é o filtro do Cockpit inteiro. Não há filtro
local observado.

### 14.5 Insights e resumo

O alerta já é o insight: "Possível lacuna de conteúdo sobre integrações com
WhatsApp Business" transforma "8 respostas sem fonte" em algo acionável.
Insight gerado precisa de números de apoio e de uma ação.

### 14.6 Detalhamento

Todo número e todo item do Cockpit leva à tela de detalhe correspondente, com
o filtro já aplicado na URL.

## 15. FORMULÁRIOS AVANÇADOS

Nenhum formulário foi observado. As regras abaixo derivam do resto do sistema
e do padrão shadcn/ui; a criação de base (`/app/knowledge-bases/new`) é o
primeiro formulário a capturar (§29.2).

### 15.1 Formulários longos

Coluna única em `--container-3xl`, seções com título, rótulo sempre visível
acima do campo.

### 15.2 Multi-step (Wizard)

Para criar base e conectar fonte: passos nomeados por tarefa ("Fonte",
"Processamento", "Políticas", "Revisar e publicar"). A revisão final mostra o
que vai entrar e os riscos (PII detectada) antes do botão de publicar.

### 15.3 Auto-save e rascunho

"Rascunho" já é um estado de base: salve o formulário como rascunho em vez de
perder o que foi preenchido.

### 15.4 Validação

Na saída do campo, com mensagem abaixo dele dizendo como corrigir. Erro nunca
só pela cor da borda (§24.4).

### 15.5 Feedback de envio

Botão em estado de carregamento com o texto da ação ("Publicando…") e, ao
concluir, Toast com o resultado em números ("12 chunks adicionados, 0
falhas").

### 15.6 Inputs, Selects, Autocomplete, Busca, Upload, Preview

Ver §8.3–§8.5.
