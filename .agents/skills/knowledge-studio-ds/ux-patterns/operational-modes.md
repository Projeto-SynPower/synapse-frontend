## 16. UX OPERACIONAL — MODOS SIMPLES E AVANÇADO

O topo da sidebar tem o seletor **Simples | Avançado** (§7.6). Os dois modos
foram observados no Cockpit: o Simples no HTML, o Avançado no print. A
diferença está na **navegação**; os blocos do Cockpit (KPIs, alertas,
processamentos, bases, conectores) são os mesmos nos dois.

### 16.1 Modo Simples

Para quem opera e resolve pendências. A sidebar tem 5 itens em dois grupos:

```
TRABALHAR   Início · Bases de Conhecimento · Adicionar Dados · Chat com os Dados
PUBLICAR    Publicação
```

"Adicionar Dados" reúne numa tarefa só o que o Avançado separa em fontes,
perfis de ingestão e pipelines.

### 16.2 Somente leitura e permissões

Não observado. Papel sem permissão de publicar vê o botão de publicação
desabilitado, com o motivo em texto ("Só administradores publicam"), e nunca
o botão escondido.

### 16.3 Modo Avançado

Para quem configura. A sidebar abre 14 itens em cinco grupos, que seguem o
fluxo do conhecimento:

```
TRABALHAR    Início · Bases de Conhecimento · Chat com os Dados
PREPARAR     Fontes & Conectores · Perfis de Ingestão · Pipelines · Chunk Studio
CONSUMIR     Perfis de Recuperação · Retrieval Lab
GOVERNANÇA   Governança · Auditoria & Lineage · Publicação
CONFIGURAR   Integração · Configurações
```

Regras entre os dois modos:

- **Mesma tela, mais camadas.** O Avançado acrescenta módulos e controle, e
  não reorganiza o que o Simples mostra. Quem troca de modo não se perde:
  Início, Bases, Chat e Publicação existem nos dois.
- **Tela nova declara o modo.** Uma tela que só existe no Avançado (Chunk
  Studio, Retrieval Lab) precisa de um caminho a partir do Simples, ou de um
  aviso quando um link do Cockpit leva até ela ("Abrir Chunk Studio" no
  alerta).
- O modo é uma escolha global do usuário. Por isso o segmento ativo é o único
  controle segmentado pintado de `--primary` (§7.6).
