/* Gerado por scripts/build_data.py a partir de site-catalog.json. Não edite. */
window.SYNAPSE = {
  "repositorio": "Projeto-SynPower/synapse",
  "plugins": [
    {
      "id": "guardrails",
      "versao": "0.1.2",
      "skills": [
        "tracker-readonly"
      ],
      "resumo": "Bloqueia a leitura de segredos e qualquer escrita em rastreador (GitHub, GitLab, MCP), por hook, sem depender do modelo.",
      "quando": "Instale junto de qualquer plugin que toque um rastreador.",
      "limite": "O hook lê o texto do comando e não resolve indireção por variável. A garantia real de não publicar vem de um token somente leitura."
    },
    {
      "id": "issue-planning",
      "versao": "0.9.0",
      "skills": [
        "issue-planning",
        "issue-writer",
        "grilling",
        "domain-modeling",
        "wayfinder",
        "research",
        "diagnosing-bugs",
        "escrita-tecnica-ptbr",
        "stop-slop",
        "brainstorm"
      ],
      "resumo": "Leva uma ideia até o rascunho de issue: brainstorm, mapa local de decisões para demanda grande e redação com evidência do board e do código.",
      "quando": "Você tem uma demanda para um projeto GitHub ou GitLab e quer issues prontas para revisar.",
      "limite": "Não publica nada. Quem publica é você, e o guardrails bloqueia a escrita mesmo com pedido explícito."
    },
    {
      "id": "tracker-gitlab",
      "versao": "0.1.0",
      "skills": [
        "gitlab-readonly"
      ],
      "resumo": "Servidor MCP do GitLab em modo somente leitura, para consultar issues, MRs, diffs e arquivos sem poder alterar nada.",
      "quando": "O agente precisa ler um GitLab, self-hosted ou gitlab.com. Precisa de Node 18 ou mais no PATH.",
      "limite": "Um token com escopo api ainda permite escrita por outro caminho. Por isso o plugin pede read_api."
    },
    {
      "id": "project-scoping",
      "versao": "0.4.0",
      "skills": [
        "project-brief-writer",
        "grilling",
        "domain-modeling",
        "wayfinder",
        "research",
        "project-scoping",
        "brainstorm"
      ],
      "resumo": "Ajuda um gerente a preencher a projetização de um produto no template acordado, em linguagem não técnica e de escopo macro.",
      "quando": "Um gerente ou cliente traz uma ideia de produto e precisa do documento de projetização.",
      "limite": "Só grava arquivos locais. Não envia e-mail nem publica em rastreador."
    },
    {
      "id": "implement-issue",
      "versao": "0.1.0",
      "skills": [
        "implement-issue",
        "diff-review",
        "issue-apply",
        "issue-document",
        "issue-explore",
        "issue-propose",
        "stop-slop-delivery",
        "tdd"
      ],
      "resumo": "Leva uma issue escrita até código em branch local: plano aprovado por você, implementação com testes, revisão contra os critérios de aceite e relatório final.",
      "quando": "Você tem uma issue pronta (em arquivo .md, .txt ou na conversa) e quer o código implementado numa branch local para revisar.",
      "limite": "Não faz push, não abre MR nem comenta no rastreador. Em desenvolvimento (0.1.0): nenhuma skill foi testada numa sessão real, e o suporte a agentes no Codex está pendente."
    }
  ],
  "skills": [
    {
      "id": "issue-writer",
      "versao": "0.11.0",
      "tipo": "own",
      "rastreador": "read",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/issue-writer",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "issue-planning"
      ],
      "resumo": "Redige rascunhos de issue (Feature, Fix ou Bug) com evidência do board e do código, sem publicar.",
      "oQueE": "Segue seis passos: briefing, board, código, classificação, redação e uma rodada de avaliação. Cada afirmação sobre o código leva arquivo:linha, e um Bug leva uma prova reproduzível. É autocontida: tudo o que usa está nas próprias referências.",
      "quando": [
        "Você tem uma demanda e quer issues revisáveis para GitHub ou GitLab",
        "A demanda ainda é só uma ideia e precisa de entrevista"
      ],
      "entrega": "Rascunhos locais em drafts/<demanda>/, com plano.md e uma issue por arquivo. Quem publica é você.",
      "nota": ""
    },
    {
      "id": "tracker-readonly",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "read",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/tracker-readonly",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "guardrails"
      ],
      "resumo": "Consulta GitHub ou GitLab (issues, MRs, PRs, boards) só em leitura; rascunhos vão para arquivo local.",
      "oQueE": "Acompanha o plugin guardrails e define como consultar um rastreador sem publicar nada.",
      "quando": [
        "Você consulta ou planeja contra um rastreador"
      ],
      "entrega": "Consulta sem escrita; rascunhos em arquivos locais.",
      "nota": ""
    },
    {
      "id": "grilling",
      "versao": "0.1.0",
      "tipo": "external",
      "rastreador": "none",
      "escopo": "geral",
      "interna": true,
      "caminho": "skills/grilling",
      "origemRepo": "https://github.com/mattpocock/skills",
      "licenca": "mattpocock-skills",
      "requer": [],
      "plugins": [
        "issue-planning",
        "project-scoping"
      ],
      "resumo": "Entrevista o usuário sem pausa sobre um plano, para chegar a um entendimento comum, ramo a ramo.",
      "oQueE": "Organiza o plano como uma árvore de decisões: cada decisão abre as que dependem dela, e a skill pergunta até fechar todos os ramos. É o motor das rodadas de perguntas dos plugins de planejamento.",
      "quando": [
        "Você quer pôr o próprio raciocínio sob pressão",
        "Você usa um gatilho do tipo \"grill me\""
      ],
      "entrega": "Um plano sem ramo aberto.",
      "nota": "Cópia do mattpocock/skills, mantida com lock e licença."
    },
    {
      "id": "domain-modeling",
      "versao": "0.1.0",
      "tipo": "external",
      "rastreador": "none",
      "escopo": "geral",
      "interna": true,
      "caminho": "skills/domain-modeling",
      "origemRepo": "https://github.com/mattpocock/skills",
      "licenca": "mattpocock-skills",
      "requer": [],
      "plugins": [
        "issue-planning",
        "project-scoping"
      ],
      "resumo": "Afia o modelo de domínio do projeto: vocabulário em GLOSSARY.md e decisões em ADR.",
      "oQueE": "Ajuda a fixar a terminologia do código e a registrar decisões de arquitetura, mantendo um glossário e os ADRs do projeto.",
      "quando": [
        "Um termo do domínio está ambíguo",
        "Você vai escrever ou editar um GLOSSARY.md",
        "Uma decisão pede um ADR"
      ],
      "entrega": "Glossário e ADRs atualizados.",
      "nota": ""
    },
    {
      "id": "wayfinder",
      "versao": "0.1.0",
      "tipo": "external",
      "rastreador": "write",
      "escopo": "geral",
      "interna": true,
      "caminho": "skills/wayfinder",
      "origemRepo": "https://github.com/mattpocock/skills",
      "licenca": "mattpocock-skills",
      "requer": [
        "grilling",
        "domain-modeling"
      ],
      "plugins": [
        "issue-planning",
        "project-scoping"
      ],
      "resumo": "Divide uma demanda grande demais para uma sessão em um mapa de tickets de decisão, resolvidos um a um.",
      "oQueE": "Para trabalho que um agente não cabe numa sessão, monta um mapa compartilhado de tickets de decisão e os resolve em ordem até o caminho ficar claro. Nos plugins do Synapse ela roda sempre em modo local, em arquivos do projeto.",
      "quando": [
        "A demanda tem várias issues e decisões em aberto",
        "Uma conversa só não resolve a ideia"
      ],
      "entrega": "Um mapa de decisões, com tickets de pesquisa feitos pela skill research.",
      "nota": "Escreve no rastreador no modo original. Os plugins forçam o modo local."
    },
    {
      "id": "research",
      "versao": "0.1.0",
      "tipo": "external",
      "rastreador": "none",
      "escopo": "geral",
      "interna": true,
      "caminho": "skills/research",
      "origemRepo": "https://github.com/mattpocock/skills",
      "licenca": "mattpocock-skills",
      "requer": [],
      "plugins": [
        "issue-planning",
        "project-scoping"
      ],
      "resumo": "Investiga uma pergunta em fontes primárias e grava o resultado em um Markdown no repositório.",
      "oQueE": "Delega a leitura e a busca de fatos a um agente, contra fontes de alta confiança (documentação, APIs), e registra o que achou em arquivo.",
      "quando": [
        "Você quer um tema pesquisado",
        "Faltam fatos de documentação ou de API",
        "Um ticket do wayfinder é de pesquisa"
      ],
      "entrega": "Um arquivo Markdown com os achados e as fontes.",
      "nota": ""
    },
    {
      "id": "diagnosing-bugs",
      "versao": "0.1.0",
      "tipo": "external",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/issue-planning/skills/diagnosing-bugs",
      "origemRepo": "https://github.com/mattpocock/skills",
      "licenca": "mattpocock-skills",
      "requer": [],
      "plugins": [
        "issue-planning"
      ],
      "resumo": "Laço de diagnóstico para bug difícil e regressão de desempenho.",
      "oQueE": "No plugin issue-planning, as fases 1 e 2 apoiam a prova de um bug difícil de reproduzir. Para antes de corrigir.",
      "quando": [
        "Você diz \"diagnostique\" ou \"debuga isso\"",
        "Algo quebra, lança erro, falha ou fica lento"
      ],
      "entrega": "Um defeito reproduzível, pronto para virar issue.",
      "nota": ""
    },
    {
      "id": "implement-issue-gitlab",
      "versao": "0.1.0",
      "tipo": "copy",
      "rastreador": "write",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/implement-issue-gitlab",
      "origemRepo": "https://labgit.synchro.com.br/ia_produtos/sibipiruna.git",
      "licenca": null,
      "requer": [
        "gitlab-mcp-skill",
        "cavecrew",
        "caveman",
        "lca",
        "feature-sliced-design"
      ],
      "plugins": [],
      "resumo": "Conduz uma issue do grupo ia_produtos até o Merge Request, com portões de qualidade.",
      "oQueE": "Orquestrador autônomo: recebe o link ou o número da issue, reúne contexto, planeja, dirige subagentes que pesquisam e constroem (cavecrew: investigator, builder, reviewer), aplica os portões (testes, Sonar, arquitetura) e abre o MR. Usa a lca em serviços Python e a feature-sliced-design em frontends React.",
      "quando": [
        "Você tem uma issue do GitLab da Synchro e quer a implementação até o MR"
      ],
      "entrega": "Um Merge Request aberto.",
      "nota": "Escreve no GitLab. Exige o MCP do GitLab, gitlab-mcp-skill e cavecrew, que são de terceiros e ficam como recomendação."
    },
    {
      "id": "lca",
      "versao": "0.1.0",
      "tipo": "copy",
      "rastreador": "none",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/lca",
      "origemRepo": "https://labgit.synchro.com.br/ia_produtos/sibipiruna.git",
      "licenca": null,
      "requer": [],
      "plugins": [],
      "resumo": "Arquitetura em camadas (Layered Capability Architecture) para backends Python, com dependências só para baixo.",
      "oQueE": "Pilha de sete níveis (L5 Entrypoint até L0 Contracts) com dependências verificadas pelo import-linter e fatias de capacidade escolhidas em tempo de execução. Decide onde cada código Python vive: router, service, repository, connector, schema.",
      "quando": [
        "Você decide onde um código Python pertence",
        "Você cria um domínio ou endpoint de ponta a ponta",
        "Você adiciona um repositório, serviço ou implementação de capacidade"
      ],
      "entrega": "Código dentro dos limites de camada.",
      "nota": ""
    },
    {
      "id": "review-issue-gitlab",
      "versao": "0.1.0",
      "tipo": "copy",
      "rastreador": "read",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/review-issue-gitlab",
      "origemRepo": "https://labgit.synchro.com.br/ia_produtos/sibipiruna.git",
      "licenca": null,
      "requer": [
        "gitlab-mcp-skill",
        "cavecrew"
      ],
      "plugins": [],
      "resumo": "Revisa uma branch contra os requisitos de uma issue do GitLab e aponta bugs e vulnerabilidades, no chat.",
      "oQueE": "Compara as alterações da branch com a issue e lista bugs, vulnerabilidades e pontos de atenção em um relatório na conversa. Não comenta no GitLab nem altera nada.",
      "quando": [
        "Você quer uma revisão de código ligada a uma issue, sem publicar comentário"
      ],
      "entrega": "Um relatório na conversa.",
      "nota": ""
    },
    {
      "id": "stop-slop",
      "versao": "0.1.0",
      "tipo": "copy",
      "rastreador": "none",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/stop-slop",
      "origemRepo": "https://labgit.synchro.com.br/ia_produtos/sibipiruna.git",
      "licenca": null,
      "requer": [],
      "plugins": [
        "issue-planning"
      ],
      "resumo": "Corta padrões de texto de IA sem perder contexto técnico, motivo de negócio nem precisão.",
      "oQueE": "Lista de padrões a eliminar em specs, issues, PRs e RFCs, com a exigência de nomes exatos de tabela, campo e estado.",
      "quando": [
        "Você escreve ou edita spec, issue, PR ou prosa técnica"
      ],
      "entrega": "Texto direto e preciso.",
      "nota": ""
    },
    {
      "id": "gitlab-readonly",
      "versao": "0.1.0",
      "tipo": "own",
      "rastreador": "read",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/gitlab-readonly",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "tracker-gitlab"
      ],
      "resumo": "Orienta o uso do MCP do GitLab em leitura: issues, MRs, diffs, commits e arquivos.",
      "oQueE": "Acompanha o plugin tracker-gitlab. Só usa as ferramentas de leitura do servidor MCP e nunca publica.",
      "quando": [
        "Você lê um projeto GitLab pelo servidor MCP"
      ],
      "entrega": "Respostas com o que está no GitLab, sem alterar nada.",
      "nota": ""
    },
    {
      "id": "issue-planning",
      "versao": "0.1.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/issue-planning/skills/issue-planning",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "issue-planning"
      ],
      "resumo": "Cola do plugin issue-planning: liga brainstorm, wayfinder e issue-writer em um caminho só.",
      "oQueE": "Não redige issue. Roda o brainstorm, chama o wayfinder em modo local quando a demanda é grande, escreve o briefing e entrega à issue-writer, pedindo prosa nas regras do escrita-tecnica-ptbr e do stop-slop.",
      "quando": [
        "Você traz uma ideia ou demanda de um projeto GitHub ou GitLab e quer issues"
      ],
      "entrega": "Um briefing confirmado e, a partir dele, os rascunhos da issue-writer.",
      "nota": "Só existe dentro do plugin issue-planning."
    },
    {
      "id": "escrita-tecnica-ptbr",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/escrita-tecnica-ptbr",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "issue-planning"
      ],
      "resumo": "Padrão de escrita de documentação técnica em português do Brasil: voz, estrutura, pontuação e diagramas Mermaid.",
      "oQueE": "Extraída de projetos da Synchro. Cobre voz, estrutura, gramática e pontuação, frase objetiva sem frase de efeito, uso do travessão e diagramas Mermaid nos documentos.",
      "quando": [
        "Você cria, edita, revisa ou traduz Markdown de documentação (docs/, README, ADR, guias de API)"
      ],
      "entrega": "Documentação no padrão da equipe.",
      "nota": ""
    },
    {
      "id": "verificador-agentes-api",
      "versao": "0.1.0",
      "tipo": "own",
      "rastreador": "read",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/verificador-agentes-api",
      "origemRepo": null,
      "licenca": null,
      "requer": [
        "description"
      ],
      "plugins": [],
      "resumo": "Investiga, sem modificar, um módulo, repositório ou API REST e lista o que impede agentes de IA e MCP de consumi-lo.",
      "oQueE": "Lê o alvo (com ou sem OpenAPI) e gera um relatório dos problemas que atrapalham um agente. Só lê.",
      "quando": [
        "Você quer saber se uma API está pronta para ser consumida por agentes"
      ],
      "entrega": "Um relatório de problemas.",
      "nota": ""
    },
    {
      "id": "project-brief-writer",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/project-scoping/skills/project-brief-writer",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "project-scoping"
      ],
      "resumo": "Redige a projetização de um produto no template acordado, em português simples e de escopo macro.",
      "oQueE": "Entrevista uma pergunta por vez, desafia afirmações com evidência, pesquisa fontes confiáveis (material primário de grandes empresas, bases acadêmicas) e escreve um rascunho não técnico que segue o template. Roda uma rodada de avaliação só da escrita.",
      "quando": [
        "Um gerente ou cliente precisa preencher o documento de projetização"
      ],
      "entrega": "Um rascunho local do documento. Nada é enviado.",
      "nota": "Só existe dentro do plugin project-scoping."
    },
    {
      "id": "project-scoping",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/project-scoping/skills/project-scoping",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "project-scoping"
      ],
      "resumo": "Cola do plugin project-scoping: liga brainstorm, wayfinder e project-brief-writer.",
      "oQueE": "Roda o brainstorm com o gerente, usa o wayfinder em modo local para ideia grande, escreve o briefing e entrega à project-brief-writer. Não redige o documento.",
      "quando": [
        "Um gerente ou cliente traz uma ideia de produto e quer a projetização"
      ],
      "entrega": "Um briefing confirmado e, a partir dele, o rascunho do documento.",
      "nota": "Só existe dentro do plugin project-scoping."
    },
    {
      "id": "brainstorm",
      "versao": "0.1.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/brainstorm",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "issue-planning",
        "project-scoping"
      ],
      "resumo": "Debate uma ideia antes de decidir: perguntas independentes, checagem em fontes e correção do usuário com evidência.",
      "oQueE": "Uma skill de conversa. Ela entrevista por perguntas independentes pela interface do harness, confere afirmações em fontes primárias (documentação oficial, ACM, IEEE, blogs de engenharia de grandes empresas) e discorda do usuário quando a fonte desmente. Fecha com um resumo confirmado.",
      "quando": [
        "Você quer debater opções ou testar uma ideia antes de construir",
        "Você pergunta \"não seria melhor...?\"",
        "Falta decidir o que construir antes de escrever código ou documento"
      ],
      "entrega": "Um entendimento confirmado por você. Ela não escreve o documento final nem código.",
      "nota": ""
    },
    {
      "id": "knowledge-studio-ds",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "geral",
      "interna": false,
      "caminho": "skills/knowledge-studio-ds",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [],
      "resumo": "Design system do AI Knowledge Studio: tokens, padrões de tela e verificadores de contraste, lint e dominância de cor.",
      "oQueE": "Tokens medidos no CSS do app (claro e escuro), vocabulário de status, padrões de tela e scripts que verificam o resultado. Esta própria landing segue essa skill.",
      "quando": [
        "Você cria, altera ou revisa uma tela, componente ou texto de interface"
      ],
      "entrega": "Interface no padrão do app, com a lista do que foi derivado e do que foi observado.",
      "nota": "Skill de autoria interna, fora dos plugins."
    },
    {
      "id": "implement-issue",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/implement-issue/skills/implement-issue",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "implement-issue"
      ],
      "resumo": "Coordena a implementação de uma issue em branch local, do plano à revisão, com duas aprovações humanas.",
      "oQueE": "A orquestradora do plugin. Não escreve código, não planeja e não revisa: lê a issue, chama os agentes planner, software-engineer e code-reviewer na ordem, pergunta a você quando preciso e guarda as decisões em .scratch/<issue>/. Se o repositório já tem skills de desenvolvimento locais, elas vencem as do plugin, e o conflito vira pergunta para você.",
      "quando": [
        "Você tem uma issue com problema, objetivo ou critérios de aceite e quer implementá-la",
        "Uma sessão foi interrompida e precisa retomar de onde parou"
      ],
      "entrega": "Código em branch local, resultado dos portões de qualidade e um relatório que liga cada critério de aceite à sua evidência. O git push fica como comando para você rodar.",
      "nota": "Escrita, mas não testada numa sessão real."
    },
    {
      "id": "issue-document",
      "versao": "0.1.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/implement-issue/skills/issue-document",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "implement-issue"
      ],
      "resumo": "Depois da aprovação final, documenta o que a implementação decidiu.",
      "oQueE": "Gera ADR, decisão arquitetural, diagrama ou atualização de documentos a partir dos artefatos da issue. Tem quatro modos: listar candidatos, escrever os aprovados, commitar e descartar. Registra a decisão que foi tomada, não inventa outra.",
      "quando": [
        "Depois da aprovação final e antes de apagar .scratch/<issue>/"
      ],
      "entrega": "Documentos do repositório que você aprovou, em um único commit só com o header. \"Nenhum documento necessário\" é um resultado válido.",
      "nota": ""
    },
    {
      "id": "issue-explore",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/implement-issue/skills/issue-explore",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "implement-issue"
      ],
      "resumo": "Investiga o repositório a partir da issue e grava o que muda, sem alterar código.",
      "oQueE": "Mapeia arquivos e símbolos a mudar, documentação e testes afetados, comandos de teste e lint, convenções, skills locais de desenvolvimento, riscos e dúvidas. Deriva da openspec-explore (OpenSpec, MIT), sem o CLI e com começo e fim definidos.",
      "quando": [
        "Antes de planejar a implementação de uma issue"
      ],
      "entrega": "O arquivo .scratch/<issue>/exploration.md.",
      "nota": ""
    },
    {
      "id": "issue-propose",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/implement-issue/skills/issue-propose",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "implement-issue"
      ],
      "resumo": "Transforma a exploração em um plano que você aprova antes de qualquer código.",
      "oQueE": "Lê a exploração e escreve proposal.md, design.md e tasks.md, com cada tarefa ligada a um critério de aceite. Não implementa nada. Deriva da openspec-propose (OpenSpec, MIT), sem o CLI.",
      "quando": [
        "Depois da issue-explore, para produzir o plano de aprovação"
      ],
      "entrega": "Os arquivos proposal.md, design.md e tasks.md em .scratch/<issue>/.",
      "nota": ""
    },
    {
      "id": "issue-apply",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/implement-issue/skills/issue-apply",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "implement-issue"
      ],
      "resumo": "Implementa o plano aprovado, tarefa por tarefa, com TDD e evidência registrada.",
      "oQueE": "Executa as tarefas de tasks.md em branch local, uma por vez, com a skill tdd. Marca cada tarefa, registra a evidência e roda os portões de qualidade no fim. Não reescreve o design: se o plano não serve, devolve ao planner. Nunca faz push. Deriva da openspec-apply-change (OpenSpec, MIT).",
      "quando": [
        "Só depois de você aprovar o plano"
      ],
      "entrega": "Código implementado, tarefas marcadas e evidência por tarefa.",
      "nota": ""
    },
    {
      "id": "diff-review",
      "versao": "0.1.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/implement-issue/skills/diff-review",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "implement-issue"
      ],
      "resumo": "Mostra o diff entre duas branches locais num HTML de MR, onde você anota e devolve as notas ao agente.",
      "oQueE": "Gera um HTML no estilo de MR do GitHub ou GitLab com o git diff base...head. Você anota linhas e arquivos no navegador e, em Finalizar review, copia um Markdown com as observações numeradas para o agente aplicar.",
      "quando": [
        "Você quer ver ou revisar a implementação de uma branch contra outra"
      ],
      "entrega": "Um HTML de review e, depois, o Markdown com as suas notas.",
      "nota": "Precisa de Python 3 e git. O realce de sintaxe usa o CDN do highlight.js: sem internet, o diff aparece sem cores."
    },
    {
      "id": "tdd",
      "versao": "0.1.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/implement-issue/skills/tdd",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "implement-issue"
      ],
      "resumo": "Desenvolvimento guiado por testes: escreva o teste que falha, faça passar, refatore.",
      "oQueE": "Referência do ciclo red → green: o que é um bom teste, onde os testes ficam, os erros comuns e as regras do ciclo, com guias de testes e de mocks. Aqui é autocontida, sem referências a outras skills.",
      "quando": [
        "Você constrói uma funcionalidade ou corrige um bug começando pelo teste",
        "Você quer testes de integração"
      ],
      "entrega": "Testes que valem ser mantidos e código que os faz passar.",
      "nota": ""
    },
    {
      "id": "stop-slop-delivery",
      "versao": "0.2.0",
      "tipo": "own",
      "rastreador": "none",
      "escopo": "plugin",
      "interna": true,
      "caminho": "plugins/implement-issue/skills/stop-slop-delivery",
      "origemRepo": null,
      "licenca": null,
      "requer": [],
      "plugins": [
        "implement-issue"
      ],
      "resumo": "Tira as marcas de texto de IA de commit, relatório e rascunho de MR.",
      "oQueE": "Adaptada da stop-slop (Sibipiruna) ao que a implementação entrega: mensagem de commit, relatório de critérios de aceite, rascunho de descrição de MR e documentos de decisão. Pede precisão técnica sem cortar contexto. Não vale para issues nem para comentários em código.",
      "quando": [
        "Você redige ou revisa commit, relatório ou rascunho de MR"
      ],
      "entrega": "Texto de entrega direto e sem enfeite.",
      "nota": ""
    }
  ],
  "ajuda": {
    "rastreador": {
      "none": "Não toca no rastreador",
      "read": "Só lê o rastreador",
      "write": "Escreve no rastreador"
    },
    "origem": {
      "own": "Escrita pela equipe",
      "copy": "Cópia fiel de outro repositório",
      "external": "Terceiros, com origem e lock"
    }
  },
  "instalar": {
    "comum": {
      "aviso": "O repositório é privado: o git da máquina precisa ter acesso a Projeto-SynPower/synapse.",
      "npx": "Precisa de Node 18 ou mais. Rode na raiz do projeto.",
      "npx_padrao": "Para instalar no usuário em vez do projeto, acrescente `-g`. Para só ver o que seria feito, `--dry-run`.",
      "claude_padrao": "Confira com `claude plugin list`.",
      "codex_padrao": "Reinicie o Codex e confira com `codex plugin list`."
    },
    "plugins": {
      "guardrails": {
        "npx": {
          "notas": [
            "Instala nos dois agentes. Para só um deles, acrescente `--agent claude-code` ou `--agent codex`."
          ]
        },
        "claude": {
          "notas": [
            "A sessão começa com a linha `[guardrails ATIVO]`. Se ela não aparecer, o plugin está desligado."
          ]
        },
        "codex": {
          "notas": [
            "Depois de instalar, rode `/hooks` e confie nos hooks. Sem isso o guardrails não roda."
          ]
        }
      },
      "issue-planning": {
        "npx": {
          "notas": [
            "Instale também o `guardrails` e, para consultar um GitLab, o `tracker-gitlab`.",
            "Precisa do `gh auth login` (ou `glab auth login`) feito por você no terminal."
          ]
        },
        "claude": {
          "notas": [
            "Instale também o `guardrails` e, para consultar um GitLab, o `tracker-gitlab`.",
            "Precisa do `gh auth login` (ou `glab auth login`) feito por você no terminal."
          ]
        },
        "codex": {
          "notas": [
            "Instale também o `guardrails` e, para consultar um GitLab, o `tracker-gitlab`.",
            "A rede é bloqueada no sandbox padrão (`workspace-write`). Aprove o comando fora do sandbox quando o Codex pedir, ou habilite `network_access = true` em `[sandbox_workspace_write]` no seu `config.toml`."
          ]
        }
      },
      "tracker-gitlab": {
        "npx": {
          "notas": [
            "O servidor MCP roda via `npx -y`: precisa de Node 18 ou mais e de acesso ao registro npm na primeira execução.",
            "No Claude Code, configure host e token depois: `claude plugin configure tracker-gitlab@skills-dir`."
          ]
        },
        "claude": {
          "notas": [
            "Na ativação o Claude Code pede a URL da API, com o sufixo `/api/v4`, e um token com escopo `read_api` (não `api`). Host interno exige VPN.",
            "Instale também o `guardrails`: ele bloqueia a escrita por qualquer outro caminho."
          ]
        },
        "codex": {
          "notas": [
            "O plugin traz a skill, mas não configura o servidor. Configure à mão em `~/.codex/config.toml`:"
          ],
          "codigo": "[mcp_servers.gitlab]\ncommand = \"npx\"\nargs = [\"-y\", \"@zereight/mcp-gitlab@2.3.23\", \"--permission-mode\", \"readonly\"]\nenv_vars = [\"GITLAB_PERSONAL_ACCESS_TOKEN\"]\n\n[mcp_servers.gitlab.env]\nGITLAB_API_URL = \"https://labgit.synchro.com.br/api/v4\"",
          "depois": [
            "Exporte `GITLAB_PERSONAL_ACCESS_TOKEN` no processo que inicia o Codex, sem imprimir o valor. O README do plugin diz que esse caminho não foi testado."
          ]
        }
      },
      "project-scoping": {
        "npx": {
          "notas": [
            "Só grava arquivos locais. Não envia e-mail nem publica em rastreador."
          ]
        },
        "claude": {
          "notas": [
            "Só grava arquivos locais. Não envia e-mail nem publica em rastreador."
          ]
        },
        "codex": {
          "notas": [
            "Só grava arquivos locais. Não envia e-mail nem publica em rastreador."
          ]
        }
      },
      "implement-issue": {
        "npx": {
          "notas": [
            "Instale também o `guardrails`.",
            "Não publica nada: o `git push` e o MR ficam com você."
          ]
        },
        "claude": {
          "notas": [
            "Instale também o `guardrails`.",
            "Os três agentes (planner, software-engineer e code-reviewer) são do Claude Code. O plugin passa na validação, mas ainda não foi rodado numa sessão real."
          ]
        },
        "codex": {
          "notas": [
            "Instale também o `guardrails`.",
            "Pendente: o Codex talvez não carregue os agentes do plugin, só as skills. Isso ainda não foi verificado."
          ]
        }
      }
    }
  }
};
