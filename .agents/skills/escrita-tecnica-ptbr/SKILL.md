---
name: escrita-tecnica-ptbr
description: Padrão de escrita de documentação técnica em português brasileiro, extraído dos projetos Synchro (ai-agents, data-pipeline-orchestrator) e aplicável a qualquer repositório que documente em português. Use sempre que for criar, editar, revisar, traduzir ou expandir qualquer Markdown de documentação, incluindo `docs/**`, `README.md`, `tests/README.md`, ADRs, docs de tabelas de banco, guias de API e de jobs, e também ao gerar ou alterar diagramas Mermaid dentro desses documentos. Cobre voz, estrutura, gramática e pontuação do português, frase objetiva sem frases de efeito, uso correto do travessão, formatação mdformat de 120 colunas, tabelas, exemplos e diagramas. Acione mesmo quando o pedido for indireto ("documenta esse endpoint", "escreve um ADR pra essa decisão", "atualiza o README com o novo job", "revisa esse texto", "explica isso na doc") ou quando a documentação for subproduto de outra tarefa, como documentar código recém-escrito.
---

# Documentação Técnica Synchro

A documentação destes projetos é lida por desenvolvedores que precisam executar uma ação: integrar um endpoint, criar
um *changeset* ou entender por que uma decisão foi tomada. Cada frase deve reduzir o tempo entre a dúvida e a ação.

O padrão descrito aqui foi extraído de 75 documentos de dois projetos Synchro (`ai-agents` e
`data-pipeline-orchestrator`). Todos os nomes de arquivo, tabela e componente citados ao longo desta skill são exemplos
dessa origem, e não arquivos que precisem existir onde ela for usada. Se esta skill divergir de um documento vizinho no
repositório em que você está, siga o vizinho, porque a consistência local importa mais do que a regra geral.

Esta skill é autocontida: tudo de que ela precisa está no próprio diretório. Ver
[Instalação em outro projeto](#instala%C3%A7%C3%A3o-em-outro-projeto).

## Antes de escrever

Três passos que evitam a maior parte do retrabalho:

1. **Leia dois vizinhos.** Abra o documento mais próximo em propósito (outro ADR, outra doc de tabela, outro guia de
   job) e copie a estrutura dele. O padrão vigente de um repositório é o que está escrito dentro dele. Se o projeto
   ainda não tiver documentação, use direto os esqueletos de [references/modelos.md](references/modelos.md).
2. **Classifique o documento.** O tipo determina o esqueleto, a voz e o nível de detalhe. A tabela em
   [references/modelos.md](references/modelos.md) tem o esqueleto pronto de cada tipo.
3. **Confirme os fatos no código.** Extraia nomes de endpoint, campos de payload, nomes de coluna, variáveis de
   ambiente e valores padrão do fonte, e não da memória. Uma afirmação incorreta na documentação induz o leitor ao
   erro, o que é mais custoso do que a ausência da informação.

## Idioma

Documentação sob `docs/`, `README.md` e `tests/README.md` é escrita em **português (pt-BR)**. Quando o projeto tiver
um `AGENTS.md` ou `CLAUDE.md` com política de idioma, ela prevalece sobre esta seção.

Literais técnicos permanecem exatamente como aparecem no sistema e nunca são traduzidos: identificadores, nomes de
arquivo, endpoints, campos de API (`createdAt`, `agentCode`), tabelas (`syn_ai_kb_chunks`), variáveis de ambiente,
códigos de status, comandos e o conteúdo de blocos de código.

Termos técnicos sem equivalente consagrado ficam no original e em itálico na primeira menção: *chunks*, *tenant*,
*changeset*, *embedding*, *parser*, *stream*, *branch*, *deploy*. Termos com equivalente natural são traduzidos:
requisição, resposta, camada, consulta, banco de dados, ambiente, cadastro. O glossário completo, com os casos em
disputa, está em [references/gramatica.md](references/gramatica.md).

## Voz: escolhida pelo propósito, não pelo gosto

O corpus alterna três vozes de forma consistente. Escolher errado é o desvio de estilo mais visível.

| Propósito do documento | Voz | Exemplo real do corpus |
| -- | -- | -- |
| **Referência / arquitetura** — descreve o que o sistema é e faz | 3ª pessoa, sujeito é o componente | "O `AuthService` valida automaticamente se o token JWT recebido contém a permissão específica." |
| **Norma / decisão da equipe** — o time é o autor da escolha | 1ª pessoa do plural | "Utilizamos um modelo de arquitetura extensível baseado no padrão Registry/Factory." / "Decidimos adotar a estratégia de busca híbrida." |
| **Procedimento / tutorial** — o leitor vai executar passos | imperativo, dirigido a "você" | "Execute o build completo dos serviços." / "Antes de começar qualquer código, garanta que sua base está idêntica ao servidor." |

Um mesmo documento pode alternar: `guidelines.md` descreve normas em 1ª pessoa do plural e depois passa ao imperativo na
seção de fluxo Git. A alternância acompanha a mudança de propósito da seção e nunca ocorre dentro do mesmo parágrafo.

Três construções ficam de fora em qualquer voz: primeira pessoa do singular ("eu criei"); o leitor tratado como
terceiro, como em "o usuário deve executar" dentro de um tutorial, onde o correto é "execute"; e voz passiva quando o
agente é conhecido, como em "os vetores são persistidos pelo Writer", que se reescreve como "o Writer persiste os
vetores".

## Esqueleto do documento

```markdown
# Título Nominal do Documento

Parágrafo de abertura, sem cabeçalho, de uma a três frases. Diz o que é o documento e o que ele cobre.
Nomeia o produto em negrito na primeira menção: **Synchro Atlas**.

## Tabela de Conteúdos      <- apenas se houver 4 ou mais seções H2

- [Primeira Seção](#primeira-se%C3%A7%C3%A3o)
  - [Subseção](#subse%C3%A7%C3%A3o)

## Primeira Seção
```

**H1 único**, na primeira linha, em forma nominal: "Guia de Jobs e Pipelines", "Paginação", "Fluxo de
Desenvolvimento". Evite frase verbal e imperativo no título. Quando houver subtítulo, separe-o com travessão, que é um
dos dois usos legítimos do sinal: "Automação de Reviews com PR-Agent — Diagrama de Sequência".

**Parágrafo de abertura obrigatório.** Nenhum documento do corpus salta do H1 direto para um H2. Duas aberturas
funcionam bem:

- pelo documento: "Este documento descreve as formas de ingestão de dados no **Synchro Atlas**.";
- pelo sujeito: "A API suporta dois modos de paginação nos endpoints de listagem."

**Tabela de Conteúdos** a partir de quatro seções H2. Lista H2 no nível raiz e H3 indentados em dois espaços; não inclui
o H1 nem a própria Tabela de Conteúdos. As âncoras são percent-encoded, portanto gere-as com o script desta skill
(`scripts/docfmt.py`, relativo ao diretório onde ela está instalada):

```bash
python3 "$SKILL_DIR/scripts/docfmt.py" toc docs/arquivo.md --write
```

**Hierarquia sem saltos**: `#` → `##` → `###`. O uso de `####` é raro no corpus e indica que a seção já tem extensão
suficiente para virar documento próprio.

**Títulos de seção em Title Case**, com preposições, artigos e conjunções em minúscula: "Catálogo de Agentes Nativos",
"Ciclo de Vida dos Jobs", "Códigos de Status HTTP". É a forma dominante no corpus (79% dos H2/H3).

## A frase: objetiva, concisa, coesa

As regras a seguir respondem por quase toda a diferença entre um texto que se integra ao projeto e um que se destaca
dele por estilo próprio.

### 1. Uma ideia por frase, um assunto por parágrafo

A frase típica do corpus tem uma ou duas orações. Parágrafos têm de duas a quatro frases. Um parágrafo que passa de
cinco frases geralmente enumera itens, e o formato adequado para isso é uma lista ou uma tabela.

- **Diluído:** "É importante notar que o sistema, para garantir que os dados dos clientes não se misturem, o que é um
  requisito fundamental de segurança, utiliza uma estratégia de isolamento multi-tenant que é validada em cada
  requisição."
- **Direto:** "O sistema é multi-tenant: os dados de diferentes clientes não se misturam. O `AuthService` valida o
  isolamento em cada requisição."

### 2. Fato, depois consequência

O padrão mais recorrente do corpus é afirmar e em seguida explicar o efeito. Ele entrega a informação primeiro e a
justificativa depois, que é a ordem em que o leitor precisa delas.

> O agente `SYN_TITLEGEN` é deliberadamente **omitido** desta lista. Isso impede que qualquer cliente externo chame a
> rota `POST /agents/chat` passando o código do gerador de títulos.

### 3. Corte o que não carrega informação

Some sem perda: "é importante notar que", "vale ressaltar que", "de forma a", "no sentido de", "a nível de", "por meio
da utilização de", "tem como objetivo principal", "basicamente", "simplesmente".

- "Este documento tem como objetivo principal descrever" → "Este documento descreve"
- "É realizada a validação dos dados" → "A API valida os dados"
- "por meio da utilização do Dagster" → "com o Dagster"

Adjetivo só entra quando for verificável. "Rápido, ideal para PDFs com texto selecionável limpo" informa; "solução
robusta e poderosa" não informa nada.

Cortar redundância nunca significa cortar dado. Números, limites, versões, nomes de arquivo e prazos fornecidos pelo
autor permanecem no texto, mesmo que a frase fique mais longa. Se a fonte diz "3 a 4 vezes mais lento", o documento diz
3 a 4 vezes, e não "significativamente mais lento".

### 4. Afirme o fato; não construa frase de efeito

Frase de efeito é a sentença curta e conclusiva, colocada no fim de um parágrafo, que reafirma de modo enfático algo já
dito ou evidente. Ela soa como slogan, ocupa espaço e não acrescenta informação verificável. Os três formatos que mais
aparecem em texto gerado:

| Formato | Exemplo a evitar | Reescrita |
| -- | -- | -- |
| Contraste "X, não Y" | "Quem lista é a tela, não o backend." | "A listagem é montada pelo frontend a partir da resposta de `GET /threads`." |
| Aforismo conclusivo | "Um ADR sem riscos listados não foi avaliado de verdade." | "Registre também os riscos: eles são a parte da avaliação que o leitor futuro não consegue reconstruir." |
| Personificação do artefato | "O parágrafo virou lista e ainda não percebeu." | "Um parágrafo com mais de cinco frases geralmente enumera itens; use uma lista." |

O teste é direto: se apagar a frase não remove nenhuma informação do documento, ela é frase de efeito. Quando a ideia
importa, ela cabe dentro da frase que enuncia o fato, por meio de uma oração subordinada ou de uma explicação após
dois-pontos. A ênfase em documentação técnica vem da precisão do dado, não da forma da sentença.

Isso não proíbe explicar consequências. "Isso impede que clientes externos chamem a rota" é informação, porque descreve
um comportamento do sistema. Já "Segurança não se negocia" não acrescenta nada.

O contraste "X, não Y" merece um critério à parte, porque ele às vezes é a construção correta. Ele informa quando Y é
uma suposição errada e plausível que o leitor faria: "Use o token, não a senha da sua conta" e "O `make api-specs`
atualiza o arquivo, não o Postman" são frases do corpus que evitam um erro concreto. Ele é decorativo quando Y é um
espantalho que ninguém suporia, como em "O valor 10 é decisão, não descuido". A pergunta a fazer: um leitor razoável
poderia ter acreditado em Y? Se sim, mantenha o contraste. Se não, apague a frase.

### 5. Sem antropomorfismo: o artefato não tem vontade, casa nem biografia

Código, serviço, rota, tabela, módulo e aplicação são artefatos de software. Verbo de fala, moradia, nascimento, morte,
conhecimento, vontade, percepção ou emoção não se aplica a nenhum deles. Verbo humano ou emocional atribuído a artefato
é **erro de prolixidade**, da mesma família tratada na seção 3: ele ocupa o lugar do verbo de engenharia que carrega o
dado e obriga o leitor a traduzir a metáfora de volta para descobrir o que o sistema faz. Metáfora de parentesco,
moradia ou sentimento tem o mesmo defeito.

| Recusado | Exigido |
| -- | -- |
| "O BFF só sabe falar com o `ai-agents`." | "O BFF encaminha requisições apenas para o `ai-agents`." |
| "O serviço fala com o banco." | "O serviço comunica com a base de dados." |
| "Nenhuma rota tem onde morar." | "Nenhuma rota está registrada no roteador." |
| "Falta o app irmão." | "O módulo `apps/agent-studio/api` ainda não existe." |
| "O parser entende tabelas." | "O parser extrai tabelas." |
| "O job nasce quando o sensor acorda." | "O sensor dispara o job a cada ciclo." |

A troca é mecânica:

| Verbo recusado | Verbo de engenharia |
| -- | -- |
| falar com, conversar com, dialogar com | comunicar com, consultar, chamar, publicar em |
| saber, aprender | implementa, suporta, reconhece, valida |
| morar, viver, habitar | está definido em, está registrado em, reside em |
| nascer, morrer, acordar, dormir | é criado, é encerrado, dispara, expira |
| ver, enxergar, escutar | recebe, lê, tem acesso a |
| entender, perceber | interpreta, extrai, aceita |
| querer, decidir, gostar | exige, seleciona — e, havendo regra, nomeie a regra |
| reclamar, sofrer, desistir | rejeita, falha com, encerra com `5xx` |

Duas exigências acompanham a proibição. A primeira é a voz ativa com o componente como sujeito: "o `Writer` persiste os
vetores", nunca "os vetores acabam persistidos". A segunda é o vocabulário estritamente de engenharia: os verbos vêm do
domínio técnico, como registra, resolve, serializa, encaminha, autentica, expõe e encerra, e não do repertório de
conversa entre pessoas.

Coloquialidade e narrativa informal caem na mesma proibição. Gíria, ironia, pergunta retórica ao leitor, exclamação e
enredo com começo, meio e fim descrevem uma experiência, e não o sistema. O que a narrativa ia explicar cabe em uma
frase declarativa, em uma tabela ou em um diagrama.

Termo consagrado importado do inglês técnico não é metáfora e permanece: nó pai e nó filho, processo órfão, *daemon*,
*handshake*.

### 6. Pontuação: use a norma do português

O travessão em texto corrido fragmenta a leitura e, no português, quase sempre ocupa o lugar de um sinal mais preciso.
Dos 75 documentos do corpus, 65 não têm nenhum travessão em texto corrido, incluindo os maiores e mais consultados:
`architecture.md` dos dois projetos, `guidelines.md`, `jobs.md`, `contributing.md`, os cinco ADRs, `streaming.md` e
`pagination.md`. As ocorrências se concentram em dez arquivos, sobretudo em `docs/observability/` e nas RFCs, que por
isso lêem de forma diferente do resto.

Reserve o travessão para dois empregos:

1. **Separador de rótulo e glosa** em item de lista, entrada de índice ou subtítulo de cabeçalho. É o uso majoritário no
   corpus (79 das 134 ocorrências): `- **CopilotAgent** — conversação generalista e suporte ao usuário.`
2. **Aposto intercalado**, sempre com os dois travessões, quando vírgulas já estiverem ocupadas na mesma frase.

Em prosa, prefira o sinal que a gramática recomenda para cada função:

| Função | Sinal | Exemplo |
| -- | -- | -- |
| Aposto explicativo | vírgula | "O `AgentRegistry`, responsável por resolver o código do agente, é consultado em tempo de execução." |
| Explicação ou enumeração que segue | dois-pontos | "O fluxo tem três etapas: validação, resolução e execução." |
| Informação incidental | parênteses | "A rota exige autenticação (via `Depends(get_current_user)`)." |
| Orações coordenadas com vírgula interna | ponto e vírgula | "O sensor consulta o GitLab a cada ciclo; o job, quando acionado, persiste o estado." |
| Contraste entre alternativas | conjunção | "O Docling extrai tabelas, mas exige um serviço separado." |

Quando nenhum sinal parecer natural, o problema é a frase: divida em duas.

Distinga os três traços. Hífen (`-`) compõe palavra: `pré-requisito`. Meia-risca (`–`) marca intervalo numérico:
`200–299`. O travessão (`—`) fica restrito aos dois usos acima.

### 7. Coesão explícita

Frases coordenadas em sequência viram lista de fatos soltos. Conectivos usados no corpus, e o que cada um sinaliza:
*Diferente de* (contraste com alternativa), *Em vez de* (substituição), *Por isso* / *Dessa forma* (consequência),
*No entanto* (ressalva), *Caso contrário* (condição negativa), *Ou seja* (reformulação), *Além disso* (adição).

Retome o sujeito por nome, não por pronome, quando houver mais de um candidato na frase anterior. Em texto técnico
"ele" quase sempre é ambíguo.

### 8. Tempo verbal

Use o presente do indicativo para o comportamento atual do sistema: "a API retorna", "o sensor consulta". O futuro fica
reservado ao que ainda não existe: "os SDKs serão gerados pelo CI". Evite gerundismo: "vai estar processando" →
"processa".

A gramática do português, incluindo crase, concordância, regência, hífen, pontuação, plural de estrangeirismos, números
e datas, está detalhada em [references/gramatica.md](references/gramatica.md). Consulte ao revisar texto pronto.

## Formatação inline

| Marcador | Uso | Exemplo |
| -- | -- | -- |
| `**negrito**` | Nome de produto ou componente na primeira menção; rótulo que abre item de lista de definição; campo de metadado; destaque normativo | `**Synchro Atlas**`, `- **DRY**: evite duplicar código.`, `**Status:** Aceito`, `**Nunca** faça commits diretos aqui.` |
| `` `código` `` | Identificador, caminho, tabela, coluna, endpoint, variável de ambiente, comando, código de status, valor de enum | `` `syn_ai_kb_chunks` ``, `` `403 Forbidden` ``, `` `POST /agents/chat` `` |
| `*itálico*` | Termo estrangeiro ou jargão introduzido pela primeira vez | `*Discriminated Unions*`, `*chunks*`, `*Squash*` |

Use `*termo*` para itálico em vez de `_termo_`, porque o sublinhado colide visualmente com os identificadores
`snake_case`, muito frequentes nestes projetos.

**Citações em bloco** marcam avisos e digressões, sempre abrindo com um rótulo em negrito:

```markdown
> **Atenção:** em `GET /threads/{id}/messages/` os dois modos respondem em ordens opostas.
```

Rótulos usados no corpus: `**Atenção:**`, `**Nota de implementação:**`, `**Regra de Ouro:**`, `**Por que fazemos
isso?**`. Não use a sintaxe `> [!NOTE]` do GitHub, porque o GitLab não a renderiza.

## Listas, tabelas e blocos de código

**Listas** usam `-` (o mdformat converte `*` e `+`). O formato de definição — `- **Termo**: descrição.` — é o mais
frequente do corpus e deve ser o padrão para enumerar conceitos. Listas ordenadas ficam reservadas a sequências onde a
ordem importa; o mdformat renumera sozinho. Item que é frase completa termina em ponto; fragmento curto não precisa,
desde que a lista inteira siga o mesmo critério.

**Tabelas** substituem qualquer enumeração de três ou mais atributos por item. Cabeçalhos canônicos, reutilize-os:

| Contexto | Cabeçalho |
| -- | -- |
| Colunas de tabela do banco | `\| Coluna \| Tipo de Dado \| Restrições \| Descrição \|` |
| Parâmetros de payload | `\| Campo \| Tipo \| Obrigatório \| Descrição \|` |
| Índice de ADRs | `\| ID \| Título \| Status \| Data \|` |

Tipos e restrições vão em `` ` ``, como `` `BIGINT` `` e `` `NOT NULL` ``. Não alinhe colunas à mão: com
`compact_tables = true` o formatador reescreve os separadores como `| -- | -- |`.

**Blocos de código** sempre declaram a linguagem. Use `bash` para shell, que é a forma dominante no corpus, sem
misturar com `sh` e `shell`. Além dele:
`json`, `python`, `text`, `http`, `dotenv`, `yaml`, `sql`, `toml`, `mermaid`. Antes de cada bloco, uma frase ou um
rótulo em negrito dizendo o que ele faz:

````markdown
**Verificar formatação sem modificar:**

```bash
uvx --from mdformat --with mdformat-gfm mdformat --check --wrap 120 --number docs/
```
````

## Exemplos e nível de detalhe

O corpus é generoso com exemplos e econômico com abstração. Três padrões que se repetem:

**Payload seguido de tabela de parâmetros.** É o par mais recorrente da documentação de API e de jobs: um bloco `json`
completo sob `### Exemplo de Payload`, depois `### Parâmetros Principais` com campo, tipo, obrigatoriedade e descrição.
O exemplo mostra a forma; a tabela responde às dúvidas.

**Valores realistas em vez de `foo` e `bar`.** O corpus usa `"get_funcionario_detalhado"`, `"base-rh"`,
`"synchro/documentacao-produto"`, `"Como resetar minha senha?"`, UUIDs completos e timestamps ISO com `Z`. Segredos
aparecem mascarados: `glpat-xxxxxxxxxxxxxxxxxxxx`. Campos de API em JSON são camelCase, porque é assim que a API
serializa.

**Bom / Ruim para norma; Antes / Depois para transformação.** Regra de estilo se demonstra com o par contrastante:

```markdown
- **Bom**: `GET /users`, `POST /users`
- **Ruim**: `GET /getAllUsers`, `POST /createNewUser`
```

O detalhe é entregue em camadas: visão geral, diagrama, passo a passo em prosa, tabela de parâmetros, troubleshooting
e referências. Evite concentrar tudo em um bloco denso e evite repetir informação; quando ela já existe em outro
documento, referencie-a com link relativo.

> Para detalhes completos sobre esta decisão arquitetural, consulte o
> **ADR 0001: Estratégia de Tabela Única** em `../../adr/0001-estrategia-tabela-kb.md`.

No documento real, escreva o alvo como link relativo. Aqui ele aparece como caminho em `` ` `` para não deixar um link
quebrado dentro da própria skill.

## Diagramas

Todo diagrama é Mermaid em bloco ```` ```mermaid ````, **precedido de um parágrafo** que diz o que ele mostra e
normalmente **seguido de uma seção em prosa** que percorre as etapas numeradas. Sem essas duas âncoras textuais, o
leitor precisa interpretar a figura sem apoio.

A escolha do tipo é determinada pela pergunta que o diagrama responde:

| Pergunta | Tipo |
| -- | -- |
| Quem chama quem, em que ordem? | `sequenceDiagram` |
| Por onde o dado passa e onde o fluxo se ramifica? | `flowchart TD` |
| Que estados uma entidade assume e como transita? | `stateDiagram-v2` |
| Como as tabelas se relacionam? | `erDiagram` |

Templates prontos extraídos do corpus, convenções de rótulo e as armadilhas de sintaxe que quebram a renderização no
GitLab estão em [references/diagramas.md](references/diagramas.md). Leia antes de escrever qualquer diagrama.

## Antes de entregar

A formatação mecânica segue `wrap = 120`, `number = true`, `compact_tables = true` e indentação de dois espaços.
**Nunca quebre linhas à mão.** Escreva o parágrafo corrido e deixe o formatador quebrar.

Rode nesta ordem. Formatar antes de gerar a Tabela de Conteúdos evita que a requebra de linhas altere um cabeçalho
depois de as âncoras já estarem escritas.

```bash
# 1. Formatação mecânica, sem depender de configuração no projeto
uvx --from mdformat --with mdformat-gfm mdformat --wrap 120 --number docs/

# 2. Tabela de Conteúdos, se o documento tiver quatro ou mais seções H2
python3 "$SKILL_DIR/scripts/docfmt.py" toc docs/arquivo.md --write

# 3. Convenções da casa: estrutura, âncoras, blocos, diagramas, travessão, frase de efeito, antropomorfismo
python3 "$SKILL_DIR/scripts/docfmt.py" check docs/
```

Se o projeto já tiver `.mdformat.toml` e um alvo de Makefile, use os dele (`make format-md`, `uv run mdformat .`), que
é o caminho integrado ao *pre-commit*. Se não tiver e for adotar a ferramenta, copie
[assets/.mdformat.toml](assets/.mdformat.toml) para a raiz do projeto: ele já traz `compact_tables`, que só é
configurável por arquivo.

Faça uma releitura final procurando seis coisas: frase que possa ser cortada pela metade sem perda de informação;
"isso" ou "ele" sem referente evidente; travessão em texto corrido que caiba melhor como vírgula, dois-pontos ou
parênteses; sentença conclusiva que não acrescente dado; verbo humano ou emocional atribuído a um artefato de
software; e afirmação que você não confirmou no código.

## Instalação em outro projeto

Esta skill não depende de nenhum arquivo fora do próprio diretório. Para levá-la a outro repositório, copie a pasta
inteira:

```bash
cp -r escrita-tecnica-ptbr /caminho/do/projeto/.claude/skills/
```

Ou instale para todos os seus projetos de uma vez:

```bash
cp -r escrita-tecnica-ptbr ~/.claude/skills/
```

O que compõe a skill:

| Caminho | Papel | Requisito |
| -- | -- | -- |
| `SKILL.md` | idioma, voz, estrutura, frase, pontuação, formatação, exemplos | nenhum |
| `references/gramatica.md` | crase, concordância, regência, pontuação, glossário | nenhum |
| `references/diagramas.md` | templates Mermaid e armadilhas de sintaxe | nenhum |
| `references/modelos.md` | esqueletos por tipo de documento | nenhum |
| `scripts/docfmt.py` | valida convenções e gera a Tabela de Conteúdos | Python 3.10 ou superior, só biblioteca padrão |
| `assets/.mdformat.toml` | configuração do formatador, para copiar no projeto | opcional |

**Ferramenta externa opcional.** O `mdformat` faz a quebra em 120 colunas e o alinhamento de tabelas. Ele não é
necessário para escrever seguindo a skill, apenas para automatizar a formatação. Sem instalação no projeto:

```bash
uvx --from mdformat --with mdformat-gfm mdformat --wrap 120 --number docs/
```

**Adaptação ao projeto de destino.** Três pontos merecem revisão quando o repositório não for um dos de origem:

- **Política de idioma.** A skill assume português na documentação. Se o projeto documentar em outra língua, ela não se
  aplica.
- **Layout de diretórios.** A tabela "Onde cada arquivo fica", em `references/modelos.md`, propõe `docs/adr/`,
  `docs/database/tables/` e afins. Ajuste para o layout do projeto se ele já tiver outro.
- **Exemplos.** Nomes como `syn_ai_kb_chunks`, `SYN_COPILOT`, `AgentRegistry`, `jobs.md` e `architecture.md` são
  ilustrações da origem. Eles demonstram a forma, e não precisam existir no destino.

O nome `escrita-tecnica-ptbr` é apenas o identificador da skill. Para renomeá-la, altere o nome do diretório e o campo `name`
do frontmatter juntos.

## Referências

- [references/gramatica.md](references/gramatica.md) — crase, concordância, regência, pontuação, hífen, gerundismo,
  anglicismos, glossário de tradução, números e datas. Consulte ao revisar.
- [references/diagramas.md](references/diagramas.md) — templates Mermaid por tipo, convenções de rótulo e armadilhas de
  sintaxe. Consulte antes de desenhar.
- [references/modelos.md](references/modelos.md) — esqueletos completos por tipo de documento: ADR, doc de tabela, guia
  de funcionalidade, README de diretório e doc de ferramenta. Consulte ao criar arquivo novo.
- [scripts/docfmt.py](scripts/docfmt.py) — `check` valida as convenções e `toc` gera a Tabela de Conteúdos com âncoras
  corretas. Usa apenas a biblioteca padrão do Python 3.
- [assets/.mdformat.toml](assets/.mdformat.toml) — configuração do formatador, para copiar em projetos que ainda não
  tenham uma.
