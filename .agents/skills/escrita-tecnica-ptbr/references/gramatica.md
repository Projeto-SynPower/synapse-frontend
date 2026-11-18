# Gramática e Vocabulário

Referência de consulta para revisar texto pronto. Concentra os erros mais frequentes na documentação técnica escrita
em português, incluindo os que passam despercebidos por soarem naturais.

## Tabela de Conteúdos

- [Crase](#crase)
- [Concordância](#concord%C3%A2ncia)
- [Regência](#reg%C3%AAncia)
- [Pronomes relativos](#pronomes-relativos)
- [Construções a evitar](#constru%C3%A7%C3%B5es-a-evitar)
- [Antropomorfismo: verbo humano em artefato de software](#antropomorfismo-verbo-humano-em-artefato-de-software)
- [Hífen e ortografia](#h%C3%ADfen-e-ortografia)
- [Estrangeirismos](#estrangeirismos)
- [Glossário: traduz ou não traduz](#gloss%C3%A1rio-traduz-ou-n%C3%A3o-traduz)
- [Números, unidades e datas](#n%C3%BAmeros-unidades-e-datas)
- [Pontuação](#pontua%C3%A7%C3%A3o)
  - [Vírgula](#v%C3%ADrgula)
  - [Dois-pontos](#dois-pontos)
  - [Ponto e vírgula](#ponto-e-v%C3%ADrgula)
  - [Parênteses](#par%C3%AAnteses)
  - [Travessão](#travess%C3%A3o)
  - [Os três traços](#os-tr%C3%AAs-tra%C3%A7os)
  - [Ponto final em listas](#ponto-final-em-listas)
  - [Aspas](#aspas)

## Crase

Crase é a fusão da preposição `a` com o artigo `a`. Existe apenas antes de palavra feminina que aceita artigo.

| Correto | Errado | Por quê |
| -- | -- | -- |
| Devido **à** latência adicional | Devido a latência adicional | "latência" é feminino e aceita artigo |
| Quanto **à** segurança | Quanto a segurança | idem |
| Referente **à** tabela `syn_ai_users` | Referente a tabela | idem |
| Devido **a** alterações no schema | Devido às alterações (se indefinido) | plural sem artigo definido não leva crase |
| Chamada **ao** endpoint | Chamada à endpoint | "endpoint" é masculino |
| Passa **a** processar em background | Passa à processar | antes de verbo nunca há crase |
| Retorna **a** ele | Retorna à ele | antes de pronome pessoal não há crase |
| **A** partir da versão 2 | À partir da versão 2 | "a partir de" nunca leva crase |

Teste rápido: troque a palavra feminina por uma masculina equivalente. Se o resultado pedir "ao", havia crase; se
pedir apenas "a", não havia. Em "referente à tabela", a troca produz "referente ao índice", o que confirma a crase.

## Concordância

**Verbal.** O sujeito comanda o verbo, mesmo distante dele.

- "A lista de parâmetros obrigatórios **é** validada.": o sujeito é "a lista", e não "parâmetros".
- "Cerca de 20% dos artefatos **falharam**.": a porcentagem concorda com o termo que a especifica.
- "**Haja vista** os relatórios": expressão invariável; nunca "haja visto".
- "**Fazem** dois anos" → "**Faz** dois anos": "fazer" no sentido de tempo decorrido é impessoal.
- "**Houve** três execuções": "haver" no sentido de existir não vai para o plural.

**Nominal.** Adjetivo concorda com o substantivo.

- "Anexo **as** evidências" e "Segue **anexa** a documentação": "anexo" varia com o substantivo.
- "É **proibida** a entrada" (com artigo) / "É proibido entrada" (sem artigo).
- "**Bastante** documentos" → "**Bastantes** documentos" quando equivale a "muitos".
- Um adjetivo depois de dois substantivos de gêneros diferentes vai para o masculino plural: "requisição e resposta
  **validados**".

## Regência

Verbos e nomes que a documentação técnica usa e costuma errar:

| Construção correta | Erro comum |
| -- | -- |
| **implicar** algo (sem preposição): "a mudança implica reprocessamento" | implica **em** reprocessamento |
| **visar a** um objetivo: "a refatoração visa a reduzir acoplamento" | visa reduzir *(tolerado, mas prefira o primeiro)* |
| **obedecer a**: "o serviço obedece ao contrato" | obedece o contrato |
| **preferir** X **a** Y: "prefira composição a herança" | prefira composição **do que** herança |
| **certificar-se de que** | certificar-se que |
| **na medida em que** (causa) / **à medida que** (proporção) | usar um pelo outro |
| **ao encontro de** (a favor) / **de encontro a** (contra) | usar um pelo outro |

## Pronomes relativos

- **cujo** concorda com o substantivo seguinte e nunca admite artigo: "o agente **cujo código** é `SYN_COPILOT`" —
  jamais "cujo o código".
- **onde** refere-se a lugar físico. Para contexto abstrato, use **em que** / **no qual**: "o cenário **em que** o
  token expira", não "onde o token expira".
- **o mesmo** não substitui pronome: "recebe o payload e valida **o mesmo**" → "e o valida".

## Construções a evitar

| Evite | Escreva |
| -- | -- |
| a nível de segurança | no nível de segurança / quanto à segurança |
| enquanto que | enquanto |
| através do Dagster *(através = atravessando)* | por meio do Dagster / com o Dagster |
| vai estar processando *(gerundismo)* | processa / processará |
| é feita a validação dos dados | a API valida os dados |
| o mesmo deve ser configurado | ele deve ser configurado / configure-o |
| tem como objetivo principal descrever | descreve |
| é importante notar que o sistema valida | o sistema valida |
| de forma a garantir | para garantir |
| possibilita a realização de consultas | permite consultar |

## Antropomorfismo: verbo humano em artefato de software

Verbo de fala, moradia, nascimento, morte, conhecimento, vontade ou emoção não se aplica a artefato de
software. Verbo humano ou emocional aplicado a código,
serviço, rota, tabela ou aplicação é erro de prolixidade: ele substitui o verbo de engenharia que carrega o dado. A
regra completa, com a lista de substituições, está na seção 5 da [SKILL.md](../SKILL.md). As correções abaixo são as
recusas mais frequentes.

| Recusado | Exigido |
| -- | -- |
| o serviço fala com o banco | o serviço comunica com a base de dados |
| o BFF só sabe falar com o `ai-agents` | o BFF encaminha requisições apenas para o `ai-agents` |
| o worker conversa com a fila | o worker consome mensagens da fila |
| nenhuma rota tem onde morar | nenhuma rota está registrada no roteador |
| o handler mora em `routes/chat.py` | o handler está definido em `routes/chat.py` |
| falta o app irmão | o módulo `apps/agent-studio/api` ainda não existe |
| a thread nasce no primeiro POST e morre em 24h | o primeiro `POST` cria a thread, que expira em 24 horas |
| o parser entende tabelas | o parser extrai tabelas |
| o job não enxerga a variável | o job não recebe a variável |
| o validador reclama do payload | o validador rejeita o payload com `422` |
| o sistema quer um token válido | o sistema exige um token válido |

Duas exigências acompanham a proibição: voz ativa com o componente como sujeito, e vocabulário estritamente de
engenharia. Escreva "o `Writer` persiste os vetores", e não "os vetores acabam persistidos" nem "o `Writer` cuida dos
vetores".

Termo consagrado importado do inglês técnico não é metáfora e permanece: nó pai, nó filho, processo órfão, *daemon*,
*handshake*.

## Hífen e ortografia

Segundo o Acordo Ortográfico vigente:

- Sem hífen: **autoatendimento**, **autoinstrução**, **infraestrutura**, **coautor**, **contrassenha**,
  **extraoficial**, **semiautomático**, **microsserviço** (dobra o "s").
- Com hífen: **pré-requisito**, **pós-processamento**, **pré-commit** *(quando não for o literal `pre-commit`)*,
  **multi-tenant** *(estrangeirismo composto, mantém a forma original)*, **e-mail**.
- O prefixo repete a consoante antes de vogal: **sub-rotina**, **inter-relacionado**.

Acentuação que a documentação técnica erra: **críticos**, **múltiplos**, **automático**, **específico**, **público**,
**série**, **índice**, **êxito**, **contêiner** (aportuguesado; `container` em código permanece).

## Estrangeirismos

Verbo importado recebe conjugação portuguesa e não leva itálico depois da primeira ocorrência: mockar/**mockadas**,
vetorizar/**vetorizado**, commitar/**commitado**, rotear/**roteado**, parsear/**parseado**.

Substantivo estrangeiro em itálico na primeira menção do documento; depois, texto normal. Plural segue o inglês quando
a forma é reconhecível: *chunks*, *tokens*, *embeddings*. Evite formas híbridas como "chunkes".

Sigla estabelecida dispensa itálico e explicação: API, HTTP, JWT, SQL, RAG, SSE, CI/CD, ADR, MR. Sigla menos comum é
expandida na primeira ocorrência: "TTFB (*Time to First Byte*)", "APM (Application Performance Monitoring)".

## Glossário: traduz ou não traduz

**Mantenha em inglês** (com itálico na primeira menção): *chunk*, *chunking*, *embedding*, *tenant*, *changeset*,
*parser*, *stream*/*streaming*, *branch*, *commit*, *merge*, *rebase*, *squash*, *deploy*, *build*, *job*, *asset*,
*sensor*, *payload*, *endpoint*, *token*, *hash*, *mock*, *retrieval*, *reranking*, *hotspot*, *bucket*, *cursor*,
*keyset*, *rollback*, *timeout*.

**Traduza** os termos abaixo. O corpus já usa a forma portuguesa, e misturar as duas deixa o texto irregular:

| Inglês | Português usado no corpus |
| -- | -- |
| request | requisição |
| response | resposta |
| layer | camada |
| query *(no texto corrido)* | consulta |
| database | banco de dados |
| environment | ambiente |
| deployment *(o ato)* | implantação |
| default | padrão |
| feature | funcionalidade |
| performance | desempenho |
| storage | armazenamento |
| overview | visão geral |
| guidelines | diretrizes |
| troubleshooting | *(mantido: é título de seção consagrado)* |

`query` permanece em inglês quando nomeia o objeto do sistema (`syn_ai_sql_queries`, "a *query* cadastrada em
`/queries`") e vira "consulta" no texto descritivo. A regra geral: se o termo aponta para um artefato nomeado no
código, mantenha; se descreve o conceito, traduza.

## Números, unidades e datas

- Espaço entre valor e unidade: **50 ms**, **120 caracteres**, **768 tokens**, **8 GB**.
- Vírgula como separador decimal: **0,75**. Ponto de milhar apenas acima de quatro dígitos: **10.000**.
- Datas em `dd/mm/aaaa` no corpo do texto e nos metadados de ADR: **10/03/2026**. Timestamps em exemplos de API ficam em
  ISO 8601 com `Z`: `2025-09-15T17:22:18.626803Z`.
- Numerais de um a dez por extenso no texto corrido ("quatro etapas críticas"); a partir de 11, em algarismos. Valores
  técnicos, versões e medidas sempre em algarismos, independentemente da grandeza: "3 retentativas", "Python 3.13".
- Intervalos com travessão sem espaço: **200–299**. Faixas de porta e código HTTP em `` ` ``: `` `4xx` ``.

## Pontuação

A norma do português distribui as funções entre sinais distintos. Escolher o sinal certo evita a fragmentação que o
travessão produz quando usado como sinal de uso geral.

### Vírgula

Marca o aposto explicativo, o adjunto deslocado e a enumeração. É o sinal padrão para intercalar informação curta.

- "O `AgentRegistry`, responsável por resolver o código do agente, é consultado em tempo de execução."
- "Em ambiente de produção, o sensor roda a cada 60 segundos."

Não separe sujeito de predicado com vírgula, mesmo quando o sujeito for longo: "A lista de artefatos pendentes de
indexação **é** processada em lote" não admite vírgula antes de "é".

### Dois-pontos

Anuncia o que vem em seguida: enumeração, explicação, citação ou bloco de código. A oração anterior deve estar completa.

- "O fluxo tem três etapas: validação, resolução e execução."
- "O motivo é simples: o `default_factory` do schema alimenta três chamadores distintos."

Use dois-pontos onde a tentação é usar travessão para explicar. Nos dois exemplos acima, o travessão funcionaria, mas
os dois-pontos indicam explicitamente a relação de anúncio.

### Ponto e vírgula

Separa orações coordenadas que já contêm vírgulas internas, e separa itens longos de uma enumeração.

- "O sensor consulta o GitLab a cada ciclo; o job, quando acionado, persiste o estado e chama a API externa."

### Parênteses

Isolam informação incidental, dispensável para a compreensão da frase: referência a arquivo, valor padrão, tradução de
sigla, nome técnico ao lado do nome humano.

- "A rota exige autenticação (via `Depends(get_current_user)`)."
- "Camada de Serviço (`api/services`)."
- "TTFB (*Time to First Byte*)."

### Travessão

Dois usos, e apenas eles:

1. **Separador de rótulo e glosa** em item de lista, entrada de índice, célula de tabela ou subtítulo de cabeçalho:

   ```markdown
   - **CopilotAgent** — conversação generalista e suporte ao usuário.
   # Automação de Reviews com PR-Agent — Diagrama de Sequência
   ```

2. **Aposto intercalado com par de travessões**, quando as vírgulas da frase já estão ocupadas em outra função:

   > "Para o uso atual da stack — depurar um comportamento específico — o Explore atende."

Em texto corrido, o travessão isolado quase sempre substitui um sinal mais preciso. Reescreva:

| Com travessão | Norma |
| -- | -- |
| "O padrão está em dois lugares — o schema e o asset." | "O padrão está em dois lugares: o schema e o asset." |
| "O Docling extrai tabelas — mas exige um serviço separado." | "O Docling extrai tabelas, mas exige um serviço separado." |
| "A validação ocorre na dependência — antes da regra de negócio." | "A validação ocorre na dependência, antes da regra de negócio." |
| "Isso quebra a renderização — o bloco aparece como texto." | "Isso quebra a renderização: o bloco aparece como texto." |

Quando nenhum sinal parecer adequado, divida a frase em duas.

### Os três traços

| Sinal | Nome | Função | Exemplo |
| -- | -- | -- | -- |
| `-` | hífen | compõe palavra | `pré-requisito`, `multi-tenant` |
| `–` | meia-risca | intervalo numérico | `200–299`, `1–5 MB` |
| `—` | travessão | os dois usos acima | `- **Termo** — glosa` |

### Ponto final em listas

Item que é frase completa termina em ponto. Fragmento curto ou rótulo não precisa. Mantenha o mesmo critério dentro da
mesma lista.

### Aspas

Aspas duplas retas (`"`) em exemplos de código. Aspas tipográficas quebram o copiar e colar. Para termo citado em
prosa, prefira itálico às aspas.
