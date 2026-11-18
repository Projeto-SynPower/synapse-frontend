## 19. LINGUAGEM DE INTERFACE

Português do Brasil, em tom direto de colega de trabalho. A interface fala
com a pessoa ("Boa tarde, Marina.", "Alertas que precisam de você") e nomeia a
consequência, não só o fato técnico. A saudação acompanha o horário: "Bom
dia" até 12h, "Boa tarde" até 18h, "Boa noite" depois (os limites exatos não
foram observados).

### 19.1 Rótulos de botão

Verbo no infinitivo + objeto, com maiúscula só na primeira palavra: "Criar
base", "Adicionar dados", "Testar chat", "Reautenticar conector", "Revisar
políticas", "Abrir Chunk Studio", "Ver perguntas sem fonte". Nome de produto
ou módulo mantém a maiúscula ("Chunk Studio").

Nunca "OK", "Enviar" ou "Confirmar" sozinhos: o botão diz o que vai
acontecer.

### 19.2 Vocabulário do domínio

O público é curador de conhecimento, e alguns termos técnicos **são** o
vocabulário dele. Estes ficam como estão, sempre com a mesma grafia:

```
base (de conhecimento)   fonte   conector   documento   chunk
embedding                pipeline   publicação   agente   PII   OCR   API
token                    masking    lineage
```

Nomes de módulo que o app mantém em inglês, como nome próprio: "Chunk
Studio", "Retrieval Lab", "Auditoria & Lineage". Não traduza nem crie
variações. Nos rótulos de navegação, o app une pares com `&` ("Fontes &
Conectores", "Fontes & Documentos"); siga o mesmo nos rótulos, e use "e" em
frases.

O resto é português. Rótulo de interface em inglês é erro, inclusive o
acessível: o app hoje tem "Toggle Sidebar" como nome do botão, e o certo é
"Alternar barra lateral". Estado de conector "Auth" é jargão; na lista de
alertas o app já diz "erro de autenticação", e o badge deve dizer o mesmo
("Reautenticar").

### 19.3 Formatos (padrão brasileiro)

| Tipo | Certo | Observado no app (corrigir) |
|---|---|---|
| Inteiro | 12.480 · 3.621 / 5.670 | — (correto) |
| Moeda | US$ 42,18 | "US$ 42.18" (no KPI Uso) |
| Percentual | 94% · 64% | — (correto) |
| Score | 78/100 | — (correto) |
| Tempo relativo | há 14 h · há 5 meses · há 144 dias | "há 5mês", "há 144d" |
| Contagem | 1 publicada · 2 publicadas | "1 publicadas" |
| Separador de meta | `Comercial · Camila Ferreira` | "1 fonte· 1 erro" (falta espaço) |
| Data e hora | 06/05/2026 22:11 | "Token expirado em 2026-05-06 22:11", "Pausado … em 2026-05-04" |
| Reticências | "Buscar bases, documentos, perguntas…" (caractere …) | três pontos "..." |

Plural concorda com o número: "1 pendência", "4 pendências". Confiança é
sempre percentual para o usuário ("41%"), nunca "0.41" ao lado de outra que
diz "81%".

### 19.4 Tom e mensagens

- **Alerta**: o quê + impacto + ação (§10.1). "O conector parou de
  sincronizar há 14h. Documentos novos não estão entrando na base."
- **Erro técnico** aparece em linha secundária, depois da explicação humana:
  "Erro — credencial expirada (401)". O código HTTP não é a manchete.
- **Recomendação** diz o próximo passo e quando: "Recomendado revisar antes da
  próxima publicação."
- **Hipótese** é marcada como hipótese: "Possível lacuna de conteúdo sobre
  integrações com WhatsApp Business."
