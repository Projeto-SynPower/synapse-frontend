# Modelos de Documento

Esqueletos extraídos dos documentos dos projetos de origem. Copie o modelo do tipo correspondente e preencha. A ordem
das seções faz parte do padrão, porque permite ao leitor procurar cada informação sempre no mesmo lugar.

Os nomes de arquivo citados como "modelo de" indicam de onde cada esqueleto foi extraído. Eles não precisam existir no
repositório em que você está: use os esqueletos diretamente.

## Tabela de Conteúdos

- [Como escolher o tipo](#como-escolher-o-tipo)
- [Guia de funcionalidade](#guia-de-funcionalidade)
- [ADR](#adr)
- [Documentação de tabela](#documenta%C3%A7%C3%A3o-de-tabela)
- [README de diretório](#readme-de-diret%C3%B3rio)
- [Documentação de ferramenta](#documenta%C3%A7%C3%A3o-de-ferramenta)
- [Documento de arquitetura](#documento-de-arquitetura)
- [Onde cada arquivo fica](#onde-cada-arquivo-fica)

## Como escolher o tipo

| O documento responde a... | Tipo | Voz dominante |
| -- | -- | -- |
| "como uso esta funcionalidade?" | Guia de funcionalidade | 3ª pessoa + imperativo nos passos |
| "por que decidimos assim?" | ADR | 1ª pessoa do plural |
| "o que esta tabela guarda?" | Documentação de tabela | 3ª pessoa |
| "o que existe nesta pasta?" | README de diretório | 3ª pessoa |
| "como instalo e rodo esta ferramenta?" | Documentação de ferramenta | imperativo |
| "como o sistema é organizado?" | Documento de arquitetura | 3ª pessoa + 1ª plural nas decisões |

## Guia de funcionalidade

Modelo de `jobs.md`, `streaming.md`, `pagination.md`, `gitlab-crawler.md`. É o tipo mais frequente.

````markdown
# Título Nominal da Funcionalidade

Uma a três frases: o que a funcionalidade faz e em que contexto ela entra.

## Tabela de Conteúdos          <- se houver 4+ seções H2

## Visão Geral                  <- opcional; use quando o comportamento tiver mais de uma peça

Descrição do comportamento em prosa. O diagrama, quando houver, entra aqui, precedido do parágrafo de apresentação.

## Como Usar

**Endpoint:** `POST /api/v1/tenant/{tenant}/env/{env}/recurso`

### Exemplo de Payload

```json
{ "campoRealista": "valor-realista" }
```

### Parâmetros Principais

| Campo | Tipo | Obrigatório | Descrição |
| -- | -- | -- | -- |

## Fluxo de Funcionamento

1. **Etapa**: o que acontece e por quê.

## Regras e Restrições         <- comportamentos não óbvios, limites, casos de borda

| Regra | Comportamento |
| -- | -- |

## Configuração                <- variáveis de ambiente, quando houver

## Troubleshooting             <- só se houver erro recorrente conhecido

### Erro: "mensagem exata do erro"

Causa e comando de correção.

## Referências                 <- links externos e documentos relacionados
````

## ADR

Modelo fixo dos cinco ADRs existentes. Numeração sequencial de quatro dígitos, nome do arquivo em kebab-case
descritivo: `0006-nome-da-decisao.md`.

````markdown
# ADR 0006: Título da Decisão em Forma Nominal

- **Status:** Proposto | Aceito | Depreciado | Rejeitado
- **Data:** dd/mm/aaaa
- **Autor(es):** Nome Completo
- **Contexto Técnico:** Termos-chave separados por vírgula

## Contexto e Declaração do Problema

O que motivou a decisão. Descreva a limitação concreta e o impacto observado, não a solução.

As alternativas avaliadas, numeradas:

1. **Alternativa A:** o que é e o que custa.
2. **Alternativa B:** idem.

Feche declarando o critério de escolha: "Precisávamos decidir qual abordagem oferece o melhor equilíbrio entre X e Y."

## Decisão

"Decidimos adotar..." — primeira pessoa do plural, direto.

A implementação consiste em:

- item;
- item.

Se alguma alternativa forte foi descartada, explique por quê: "Optamos por não adotar RRF porque..."

## Consequências

### Resultados Positivos (Por que escolhemos isso)

- **Rótulo do ganho:** explicação com número quando existir.

### Resultados Negativos / Riscos

- **Rótulo do custo:** explicação objetiva do que a decisão passa a custar. Registre também os riscos aceitos: são a
  parte da avaliação que o leitor futuro não consegue reconstruir a partir do código.

### Estratégias de Mitigação

- **Nome da estratégia:** como o risco é contido.
````

Após criar o arquivo, adicione a linha ao índice em `docs/adr/README.md`:

````markdown
| [0006](./0006-nome-da-decisao.md) | Título da Decisão | Aceito | dd/mm/aaaa |
````

## Documentação de tabela

Modelo dos 25 arquivos em `docs/database/tables/`. Um arquivo por tabela, nomeado exatamente como ela.

````markdown
# Tabela: `syn_ai_nome_da_tabela`

**Propósito:** Uma ou duas frases dizendo o que a tabela guarda e qual papel ela cumpre no sistema.

## Definição das Colunas

| Coluna | Tipo de Dado | Restrições | Descrição |
| -- | -- | -- | -- |
| `id` | `BIGINT` | **Chave Primária**, `Autoincrement` | Identificador único do registro. |
| `resource_id` | `UUID` | `NOT NULL`, **Único** | Identificador externo para uso em APIs. |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT NOW()` | Data e hora de criação. |

## Relacionamentos

- `coluna_id` → `syn_ai_outra_tabela.id`: descrição da relação.

## Justificativa do Design      <- apenas quando a modelagem não for óbvia

Explicação curta, com link para o ADR quando existir.
````

Depois de criar, inclua a tabela no diagrama `erDiagram` e no índice de `docs/database/README.md`.

## README de diretório

Modelo de `docs/README.md`. Funciona como índice comentado: cada entrada aponta para um documento e resume em uma
frase o que ele cobre.

````markdown
# Documentação do Projeto

Este diretório contém a documentação técnica, operacional e as diretrizes de desenvolvimento do Synchro Atlas.

## Índice

### Arquitetura e Decisões

- [Análise da Arquitetura](./architecture.md) - Visão geral dos componentes, fluxo de dados e filosofia do sistema.
- [Architecture Decision Records (ADRs)](./adr/README.md) - Histórico de decisões arquiteturais importantes.

### Banco de Dados

- [Visão Geral e Esquema](./database/README.md) - Esquema relacional, relacionamentos e índice das tabelas.
````

Cada entrada segue o formato ``[Título](./caminho.md) - frase única dizendo o que o leitor encontra ali``. Agrupe por H3
temático quando passar de seis itens.

Quando o projeto já tiver um `docs/README.md`, registre nele todo documento novo criado em `docs/`, porque o índice é o
ponto de entrada usado para localizá-los. Quando não tiver, não crie um só para abrigar um documento: a partir de três
ou quatro arquivos em `docs/`, proponha o índice ao autor e use este modelo.

## Documentação de ferramenta

Modelo de `sonar.md`, `markdown-linter.md`, `secscan.md`, `renovate.md`.

````markdown
# Nome da Ferramenta

O que a ferramenta faz neste projeto e qual problema ela resolve. Uma a três frases.

## Visão Geral                  <- opcional

## Pré-requisitos

- [Ferramenta](https://link) — versão mínima, se relevante.

## Configuração

Onde fica o arquivo de configuração e o que cada opção significa.

## Uso

**Descrição do que o comando faz:**

```bash
comando --flag
```

## Integração com CI/CD         <- quando a ferramenta roda no pipeline ou no pre-commit

## Troubleshooting

### Erro: "mensagem exata"

## Referências

- [Documentação oficial](https://link)
````

## Documento de arquitetura

Modelo de `architecture.md`. Um por projeto, atualizado ao longo do tempo em vez de substituído.

````markdown
# Arquitetura e Regras de Negócio

O **Nome do Produto** atua como... Este documento detalha as escolhas arquiteturais, padrões de design e lógicas de
negócio do sistema.

## Tabela de Conteúdos

## Filosofia Central | Padrões de Projeto

As decisões estruturantes, em lista de definição, com o caminho do módulo entre parênteses em cada item.

## Estrutura de Componentes

Um H3 por componente maior, descrevendo responsabilidade e fronteira.

## Fluxo de Dados: <Nome do Fluxo>

Prosa numerada + diagrama + seção de leitura do diagrama.

## Segurança e Autenticação

## Observabilidade e Monitoramento
````

## Onde cada arquivo fica

| Conteúdo | Caminho |
| -- | -- |
| Guia de funcionalidade | `docs/<nome-em-kebab-case>.md` |
| ADR | `docs/adr/000N-nome-da-decisao.md` |
| Documentação de tabela | `docs/database/tables/syn_ai_nome.md` |
| Documentação de API | `docs/api/` |
| Documentação de CLI | `docs/cli/<comando>.md` |
| Documentação de observabilidade | `docs/observability/<ferramenta>.md` |
| RFC | `docs/rfc/<tema>/<nome>.md` |
| Imagem ou SVG de diagrama | `docs/diagrams/` |

Nome de arquivo em `kebab-case`, sem acento, descrevendo o conteúdo e não a data de criação. Escreva `README.md` em
maiúsculas e todos os outros nomes em minúsculas.
