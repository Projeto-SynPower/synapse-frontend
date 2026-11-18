# Perguntas

Sumário: [Independentes](#independentes) · [Pela interface do harness](#pela-interface-do-harness) ·
[Resposta aberta](#resposta-aberta) · [Encerrar](#encerrar)

## Independentes

Cada chamada reúne só perguntas que **não dependem umas das outras**: a resposta de uma não muda o enunciado, as opções
nem a existência de outra. Teste, para cada par (A, B): se o usuário respondesse A de duas formas opostas, B seguiria a
mesma pergunta, com as mesmas opções? Se não, B espera a chamada seguinte.

| Exemplo | Veredito |
| -- | -- |
| "Quem usa?" e "Qual o risco?" | Independentes: mesma chamada |
| "Precisa de integração?" e "Com qual sistema?" | Dependentes: a segunda só existe se a primeira for "sim" |

Pergunta já respondida não se repete. Depois de cada resposta, recalcule o que está liberado. Se só uma decisão trava,
faça só uma.

## Pela interface do harness

Use a ferramenta de perguntas do harness (`AskUserQuestion` no Claude Code, `request_user_input` no Codex, ou o
equivalente), não uma lista longa no chat.

- **No máximo 3 perguntas por chamada.** Fronteira maior vira chamadas em sequência.
- **Pergunta de uma frase.** O contexto vai na descrição de cada opção.
- **2 ou 3 opções excludentes**, a recomendada primeiro, com o rótulo terminando em "(Recomendado)". Sem opção
  "Outro": a interface já aceita resposta livre, e o usuário pode debater as opções.
- **Cabeçalho de até 12 caracteres.**
- **Referências externas** (ver [fontes.md](fontes.md#ideia-vaga)) não cabem em opções. Mostre em texto, com link, e
  depois pergunte pela ferramenta qual serve, com "nenhuma" entre as opções.
- **Sem a ferramenta, ou se falhar** (no Codex ela só existe em modo Plan): texto, no máximo 3 perguntas por mensagem,
  cada uma com a resposta recomendada. Avise o usuário.

## Resposta aberta

Exemplo real, log, história, lista de pessoas: pergunte em prosa, uma por vez. Não force em opções.

## Encerrar

Resuma o entendimento em **lista de definição** de uma linha por item (`- **Motivação**: ...`) e peça confirmação
explícita. Só depois siga ao próximo passo do chamador. Em mensagem ao usuário, prefira lista e negrito nos rótulos a
parágrafo longo.
