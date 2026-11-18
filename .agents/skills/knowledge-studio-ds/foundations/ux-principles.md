## 21. PRINCÍPIOS DE UX (por que as regras existem)

### 21.1 Heurísticas de Nielsen que mais decidem aqui

As três que mais decidem neste produto:

- **Visibilidade do estado do sistema.** O Cockpit existe para isso: cada
  base, conector e processamento mostra o estado e há quanto tempo.
- **Ajudar a reconhecer, diagnosticar e recuperar de erros.** O alerta traz o
  diagnóstico em linguagem humana e o botão de recuperação (§10.1).
- **Prevenção de erro.** Publicar uma base com PII ou com chunks de baixa
  qualidade é o erro caro. O sistema avisa antes ("Recomendado revisar antes da
  próxima publicação").

### 21.2 Laws of UX (leis de design de interação)

- **Hick**: três ações no cabeçalho, uma delas destacada.
- **Miller / chunking**: KPI em três linhas; meta em uma linha com ` · `.
- **Jakob**: sidebar, `⌘K` e seletor de workspace estão onde o usuário de SaaS
  espera.

### 21.3 Princípios de Gestalt (organização visual)

Proximidade agrupa rótulo, valor e contexto do KPI. Região comum (o card)
agrupa os itens de uma lista. Similaridade: o mesmo estado tem o mesmo badge
em toda tela.

### 21.4 Progressive disclosure (revelar por etapas)

O seletor Simples/Avançado é disclosure no nível do produto (§16). No item,
o detalhe técnico fica na linha secundária e o detalhe completo fica na tela
de destino.

### 21.5 Affordance, feedback, discoverability, modelos mentais

O modelo mental do curador é um fluxo: **fonte → processamento → base →
publicação → uso por agentes**. A sidebar segue essa ordem, e toda tela nova
deve dizer em que ponto do fluxo o usuário está.

### 21.6 Síntese de frameworks (Material · Apple HIG · Fluent)

O app segue a linguagem do shadcn/ui: cartões com borda leve, raio grande e
controles compactos. Quando esta skill não cobrir um caso, o shadcn é a
referência antes de Material ou Fluent.
