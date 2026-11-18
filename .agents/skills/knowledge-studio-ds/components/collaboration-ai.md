## 12. COLABORAÇÃO E IA

### 12.1 Avatar e responsável

Medido no rodapé da sidebar: círculo de 28px, fundo `--accent`, borda de 1px
`--sidebar-border`, iniciais ("MC") em `--accent-foreground` peso 600, com
nome e papel ao lado (§7.1). Onde a pessoa aparece como responsável (rodapé
do card de base), o app usa só o nome em texto: "Comercial · Camila Ferreira".

### 12.2 Badges

- **Badge de status** — §10.1 (vocabulário, anatomia e correção de
  contraste).
- **Badge de contagem de risco** — "6 PII", "28 PII" no card de base. Aparece
  só quando o número é maior que zero. Tom não observado em print; use
  warning.
- **Contador de bloco** — "4 ativos" ao lado do título da lista de alertas, em
  texto `--muted-foreground`, sem pílula.
- **Ponto de notificação** — 6px, `--destructive`, sobre o sino da topbar
  (§7.3).

### 12.3 Accordion

Não observado.

### 12.4 Comentários

Não observado.

### 12.5 Chat com os dados

"Chat com os Dados" (`/app/test-chat`) é onde o curador testa respostas antes
de publicar. A tela não foi capturada. O que o resto do app impõe a ela:

- **Resposta sempre com fonte.** O KPI "Respostas com fonte 94%" e o alerta
  "8 respostas sem fonte confiável" mostram que resposta sem fonte é um
  problema a sinalizar, não uma resposta normal.
- **Confiança visível.** "Confiança média 81%" e "Confiança média 0.41" são
  métricas de primeira classe. Mostre a confiança por resposta.
- **Pergunta sem fonte é lacuna de conteúdo**, e deve levar à ação de
  preencher ("Ver perguntas sem fonte").

### 12.6 Área de pergunta e evidência

Não observada. Quando entrar: campo de várias linhas com rótulo visível, base
em teste identificada acima do campo, e envio em botão primário pequeno.

**Evidência e fonte.** Todo número de qualidade (score, confiança, cobertura)
aparece junto do objeto que mede, e a origem de todo conteúdo é nomeada
("Confluence — Espaço Engineering"). Este é o princípio que diferencia o
produto (§2.1), e vale para qualquer componente novo.
