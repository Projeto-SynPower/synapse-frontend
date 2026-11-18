/* Diagramas do fluxo interno de cada plugin, em SVG gerado por código.
 * Cada fluxo vem do que está nos SKILL.md, README e scripts do repositório. O estilo está em styles.css
 * (classes .no, .aresta...), que só usa tokens do design system. Estado é forma e palavra, nunca só cor:
 *   skill = traço cheio · subagente = tracejado + rótulo "subagente" · hook = traço grosso · regra = traço fino
 *   servidor MCP = pontilhado · pessoa e saída = pílula.
 * Padrões da literatura: decisão = gateway exclusivo do BPMN 2.0 (losango com ×, rótulos sim/não nas saídas);
 * pausa para humano = HITL (human-in-the-loop), pílula com selo de pessoa e a palavra HITL;
 * revisor = juiz, com a palavra LLM-as-a-Judge (um modelo, uma rubrica) ou Agent-as-a-Judge (um agente com
 * ferramentas que confere por conta própria). */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var TIPOS = {
    pessoa:    { classe: "no no--pessoa",    tag: "" },
    skill:     { classe: "no no--skill",     tag: "skill" },
    subagente: { classe: "no no--subagente", tag: "subagente" },
    hook:      { classe: "no no--hook",      tag: "hook" },
    servidor:  { classe: "no no--servidor",  tag: "servidor MCP" },
    saida:     { classe: "no no--saida",     tag: "" },
    hitl:      { classe: "no no--pessoa no--hitl", tag: "HITL" },
    gateway:   { classe: "no no--gateway",   tag: "decisão" },
    regra:     { classe: "no",               tag: "regra" },
    plugin:    { classe: "no no--plugin",    tag: "plugin" }
  };

  /* Coordenadas em viewBox 600 de largura. n(id, tipo, x, y, w, h, titulo, sub[], opcional) */
  function n(id, tipo, x, y, w, h, titulo, sub, opcional, extra) {
    extra = extra || {};
    return { id: id, tipo: tipo, x: x, y: y, w: w, h: h, titulo: titulo, sub: sub || [], opcional: !!opcional, tag: extra.tag || "", hitl: !!extra.hitl, juiz: !!extra.juiz };
  }
  /* e(de, ladoDe, para, ladoPara, rotulo, filho, via) — lados: t b l r; via = x do desvio quando os dois lados são l ou r */
  function e(de, ld, para, lp, rotulo, filho, via) {
    return { de: de, ld: ld, para: para, lp: lp, rotulo: rotulo || "", filho: !!filho, via: via };
  }

  function planejamento(quemTraz, quemCola, textoCola, idBrief, nomeBrief, subBrief, grande, avaliador, subAval, saidaNome, saidaSub, comProsa) {
    var nos = [
      n("voce", "pessoa", 210, 4, 180, 44, quemTraz[0], [quemTraz[1]]),
      n("cola", "skill", 210, 82, 180, 56, quemCola, [textoCola]),
      n("brain", "skill", 210, 172, 180, 56, "brainstorm", [idBrief], false, { hitl: true }),
      n("gw", "gateway", 278, 244, 44, 40, "Escopo grande?", []),
      n("way", "skill", 210, 322, 180, 66, "wayfinder", ["mapa local de decisões", grande], true),
      n("res", "subagente", 420, 322, 170, 66, "research", ["pesquisa em fontes", "primárias e grava .md"]),
      n("writer", "skill", 210, 432, 180, 56, nomeBrief, subBrief),
      n("aval", "subagente", 190, 522, 220, 56, avaliador, subAval, false, { tag: "subagente \u00b7 LLM-as-a-Judge", juiz: true }),
      n("saida", "saida", 190, 608, 220, 52, saidaNome, [saidaSub], false, { hitl: true, tag: "HITL \u00b7 revisão" })
    ];
    if (comProsa) nos.push(n("prosa", "skill", 420, 432, 170, 56, "escrita-tecnica-ptbr", ["e stop-slop: prosa"]));
    var arestas = [
      e("voce", "b", "cola", "t"),
      e("cola", "b", "brain", "t"),
      e("brain", "b", "gw", "t"),
      e("gw", "b", "way", "t", "sim"),
      e("way", "r", "res", "l", "", true),
      e("way", "b", "writer", "t", "briefing"),
      e("gw", "l", "writer", "l", "não", false, 90),
      e("writer", "b", "aval", "t"),
      e("aval", "b", "saida", "t")
    ];
    if (comProsa) arestas.push(e("prosa", "l", "writer", "r"));
    return { nos: nos, arestas: arestas };
  }

  var ip = planejamento(["Você", "traz a ideia ou demanda"], "issue-planning", "cola do plugin", "entrevista e confere fontes",
    "issue-writer", ["board, código, redação"], "só se a demanda for grande", "avaliadores", ["um por issue, contexto novo"],
    "drafts/<demanda>/", "você revisa e publica", true);
  var ps = planejamento(["Gerente", "traz a ideia de produto"], "project-scoping", "cola do plugin", "uma pergunta por vez",
    "project-brief-writer", ["segue o template acordado"], "só se a ideia for grande", "avaliador", ["uma rodada, só da escrita"],
    "rascunho local", "nada é enviado", false);

  var FLUXOS = {
    "macro": {
      titulo: "Visão macro: como os plugins se encaixam",
      altura: 470,
      nos: [
        n("voce", "pessoa", 210, 4, 180, 44, "Você", ["traz a ideia"]),
        n("trk", "servidor", 15, 100, 150, 64, "tracker-gitlab", ["lê o board"]),
        n("ip", "plugin", 185, 100, 195, 64, "issue-planning", ["ideia → issues"]),
        n("ps", "plugin", 400, 100, 185, 64, "project-scoping", ["ideia → projeto"]),
        n("rasc", "saida", 235, 232, 130, 44, "Rascunhos locais", ["arquivos locais"]),
        n("impl", "plugin", 400, 222, 185, 64, "implement-issue", ["issue → código", "em branch local"]),
        n("pub", "hitl", 190, 320, 220, 52, "Você revisa e publica", ["fora do agente"]),
        n("gr", "hook", 15, 400, 570, 60, "guardrails", ["bloqueia a escrita em GitHub, GitLab e MCP,", "qualquer que seja o plugin"])
      ],
      arestas: [
        e("voce", "b", "ip", "t"),
        e("voce", "b", "ps", "t"),
        e("trk", "r", "ip", "l"),
        e("ip", "b", "rasc", "t"),
        e("ps", "b", "rasc", "t"),
        e("rasc", "b", "pub", "t"),
        e("rasc", "r", "impl", "l", "", true),
        e("impl", "b", "pub", "r")
      ]
    },

    "issue-planning": { titulo: "Da ideia ao rascunho de issue", altura: 674, nos: ip.nos, arestas: ip.arestas },
    "project-scoping": { titulo: "Da ideia de produto ao documento de projetização", altura: 674, nos: ps.nos, arestas: ps.arestas },

    "implement-issue": {
      titulo: "Da issue ao código em branch local, com duas aprovações suas",
      altura: 992,
      nos: [
        n("voce", "pessoa", 190, 4, 220, 44, "Você", ["traz a issue (.md, .txt ou conversa)"]),
        n("orq", "skill", 190, 84, 220, 56, "implement-issue", ["orquestra; não escreve código"]),
        n("plan", "subagente", 190, 180, 220, 66, "planner", ["issue-explore e issue-propose", "grava em .scratch/<issue>/"]),
        n("apr1", "hitl", 190, 286, 220, 52, "Você aprova o plano", [], false, { tag: "HITL \u00b7 aprovação" }),
        n("eng", "subagente", 190, 378, 220, 76, "software-engineer", ["issue-apply, em branch local", "um commit por grupo de tarefas", "corrige até 2 rodadas"]),
        n("tdd", "skill", 440, 338, 150, 66, "tdd", ["red → green", "um teste por tarefa"]),
        n("slop", "skill", 440, 428, 150, 66, "stop-slop-delivery", ["commit, relatório", "e rascunho de MR"]),
        n("rev", "subagente", 190, 494, 220, 66, "code-reviewer", ["só leitura; roda testes, lint", "e tipos por conta própria"], false, { tag: "subagente \u00b7 Agent-as-a-Judge", juiz: true }),
        n("gw", "gateway", 278, 582, 44, 40, "Achado bloqueante?", []),
        n("dr", "skill", 190, 650, 220, 56, "diff-review", ["você anota o diff no HTML"], false, { hitl: true }),
        n("apr2", "hitl", 190, 750, 220, 52, "Você aprova o resultado", [], false, { tag: "HITL \u00b7 aprovação" }),
        n("doc", "skill", 190, 842, 220, 66, "issue-document", ["ADR, diagrama, docs", "você aprova antes do commit"], false, { hitl: true }),
        n("saida", "saida", 170, 940, 260, 44, "Branch local e relatório", ["o push é com você"])
      ],
      arestas: [
        e("voce", "b", "orq", "t"),
        e("orq", "b", "plan", "t"),
        e("plan", "b", "apr1", "t", "plano"),
        e("apr1", "b", "eng", "t", "aprovado"),
        e("tdd", "l", "eng", "r", "", true),
        e("slop", "l", "eng", "r", "", true),
        e("eng", "b", "rev", "t"),
        e("rev", "b", "gw", "t"),
        e("gw", "l", "eng", "l", "sim", false, 150),
        e("gw", "b", "dr", "t", "não"),
        e("dr", "b", "apr2", "t"),
        e("apr2", "b", "doc", "t"),
        e("doc", "b", "saida", "t")
      ]
    },

    "guardrails": {
      titulo: "O que acontece antes de cada chamada de ferramenta",
      altura: 470,
      nos: [
        n("sessao", "hook", 20, 4, 230, 56, "SessionStart", ["avisa que o guard está ativo"]),
        n("orienta", "skill", 350, 4, 230, 56, "tracker-readonly", ["rascunho vai para arquivo"]),
        n("agente", "pessoa", 210, 100, 180, 44, "Agente", ["chama uma ferramenta"]),
        n("hook", "hook", 190, 184, 220, 56, "PreToolUse", ["run-guard.sh → guard.py"]),
        n("seg", "regra", 20, 296, 220, 76, "Segredos", ["nega .env, chaves e", "credenciais; nega o ambiente"]),
        n("trk", "regra", 360, 296, 220, 76, "Escrita em rastreador", ["nega gh, glab, curl, wget", "e MCP de escrita"]),
        n("ok", "saida", 190, 420, 220, 44, "Chamada liberada", ["saída vazia = sem opinião"])
      ],
      arestas: [
        e("sessao", "b", "agente", "l", "", true),
        e("orienta", "b", "agente", "r", "", true),
        e("agente", "b", "hook", "t"),
        e("hook", "b", "seg", "t", "viola"),
        e("hook", "b", "trk", "t", "viola"),
        e("hook", "b", "ok", "t", "sem violação")
      ]
    },

    "tracker-gitlab": {
      titulo: "Como o agente lê o GitLab sem poder alterá-lo",
      altura: 370,
      nos: [
        n("agente", "pessoa", 210, 4, 180, 44, "Agente", ["precisa ler o GitLab"]),
        n("skill", "skill", 210, 92, 180, 56, "gitlab-readonly", ["só ferramentas de leitura"]),
        n("mcp", "servidor", 210, 192, 180, 66, "Servidor MCP", ["Node 18 ou mais", "modo somente leitura"]),
        n("gl", "saida", 210, 302, 180, 52, "GitLab", ["issues, MRs, diffs, arquivos"]),
        n("tok", "regra", 430, 197, 160, 56, "token read_api", ["sem escopo de escrita"]),
        n("guard", "hook", 20, 197, 150, 56, "guardrails", ["recomendado junto"])
      ],
      arestas: [
        e("agente", "b", "skill", "t"),
        e("skill", "b", "mcp", "t"),
        e("mcp", "b", "gl", "t", "consulta"),
        e("tok", "l", "mcp", "r", "", true),
        e("guard", "r", "mcp", "l", "", true)
      ]
    }
  };

  function el(nome, attrs, filhos) {
    var x = document.createElementNS(NS, nome);
    Object.keys(attrs || {}).forEach(function (k) { x.setAttribute(k, attrs[k]); });
    (filhos || []).forEach(function (f) { x.appendChild(f); });
    return x;
  }
  function texto(classe, x, y, conteudo, ancora) {
    var t = el("text", { "class": classe, x: x, y: y, "text-anchor": ancora || "middle" });
    t.textContent = conteudo;
    return t;
  }
  function ponto(no, lado) {
    if (lado === "t") return [no.x + no.w / 2, no.y];
    if (lado === "b") return [no.x + no.w / 2, no.y + no.h];
    if (lado === "l") return [no.x, no.y + no.h / 2];
    return [no.x + no.w, no.y + no.h / 2];
  }
  function caminho(a, la, b, lb, via) {
    var p = ponto(a, la), q = ponto(b, lb);
    var vertA = la === "t" || la === "b", vertB = lb === "t" || lb === "b";
    if (via != null) {
      return { d: "M" + p[0] + " " + p[1] + " H" + via + " V" + q[1] + " H" + q[0], meio: [via, (p[1] + q[1]) / 2], fim: q, dir: lb === "l" ? "direita" : "esquerda" };
    }
    if (vertA && vertB) {
      if (Math.abs(p[0] - q[0]) < 1) return { d: "M" + p[0] + " " + p[1] + " V" + q[1], meio: [p[0], (p[1] + q[1]) / 2], fim: q, dir: la === "b" ? "baixo" : "cima" };
      var m = (p[1] + q[1]) / 2;
      return { d: "M" + p[0] + " " + p[1] + " V" + m + " H" + q[0] + " V" + q[1], meio: [(p[0] + q[0]) / 2, m], fim: q, dir: "baixo" };
    }
    if (!vertA && !vertB) {
      if (Math.abs(p[1] - q[1]) < 1) return { d: "M" + p[0] + " " + p[1] + " H" + q[0], meio: [(p[0] + q[0]) / 2, p[1]], fim: q, dir: p[0] < q[0] ? "direita" : "esquerda" };
      var mx = (p[0] + q[0]) / 2;
      return { d: "M" + p[0] + " " + p[1] + " H" + mx + " V" + q[1] + " H" + q[0], meio: [mx, (p[1] + q[1]) / 2], fim: q, dir: p[0] < q[0] ? "direita" : "esquerda" };
    }
    if (vertA && !vertB) return { d: "M" + p[0] + " " + p[1] + " V" + q[1] + " H" + q[0], meio: [(p[0] + q[0]) / 2, q[1]], fim: q, dir: p[0] < q[0] ? "direita" : "esquerda" };
    return { d: "M" + p[0] + " " + p[1] + " H" + q[0] + " V" + q[1], meio: [q[0], (p[1] + q[1]) / 2], fim: q, dir: q[1] > p[1] ? "baixo" : "cima" };
  }
  function seta(fim, dir) {
    var x = fim[0], y = fim[1], s = 5;
    var pts = {
      baixo:    [x - s, y - s * 1.6, x + s, y - s * 1.6, x, y],
      cima:     [x - s, y + s * 1.6, x + s, y + s * 1.6, x, y],
      direita:  [x - s * 1.6, y - s, x - s * 1.6, y + s, x, y],
      esquerda: [x + s * 1.6, y - s, x + s * 1.6, y + s, x, y]
    }[dir];
    return el("polygon", { "class": "seta", points: pts.join(" ") });
  }

  /* Selo de pessoa (tarefa humana do BPMN): marca o ponto em que o fluxo espera por uma pessoa. */
  function selo(x, y) {
    return el("g", { "class": "selo-hitl" }, [
      el("circle", { "class": "selo-hitl__fundo", cx: x, cy: y, r: 11 }),
      el("circle", { "class": "selo-hitl__icone", cx: x, cy: y - 3.5, r: 3 }),
      el("path", { "class": "selo-hitl__icone", d: "M" + (x - 6) + " " + (y + 6.5) + " a6 5 0 0 1 12 0 Z" })
    ]);
  }

  function desenhar(id) {
    var f = FLUXOS[id];
    if (!f) return null;
    var mapa = {};
    f.nos.forEach(function (no) { mapa[no.id] = no; });

    var svg = el("svg", { viewBox: "0 0 600 " + f.altura, role: "img", "aria-labelledby": "fluxo-t-" + id + " fluxo-d-" + id });
    svg.appendChild(el("title", { id: "fluxo-t-" + id })).textContent = f.titulo;
    svg.appendChild(el("desc", { id: "fluxo-d-" + id })).textContent = descricao(f, mapa);

    var caminhos = [];
    f.arestas.forEach(function (a, i) {
      var c = caminho(mapa[a.de], a.ld, mapa[a.para], a.lp, a.via);
      caminhos.push({ d: c.d, filho: a.filho });
      var ga = el("g", { "class": "anim anim-aresta", style: "--i:" + (i + f.nos.length * 0.6) });
      ga.appendChild(el("path", { "class": "aresta" + (a.filho ? " aresta--filho" : ""), d: c.d }));
      ga.appendChild(seta(c.fim, c.dir));
      if (a.rotulo) {
        var largura = a.rotulo.length * 5.4 + 8;
        ga.appendChild(el("rect", { x: c.meio[0] - largura / 2, y: c.meio[1] - 8, width: largura, height: 14, rx: 3, fill: "var(--surface-2)" }));
        ga.appendChild(texto("aresta-rotulo", c.meio[0], c.meio[1] + 3, a.rotulo));
      }
      svg.appendChild(ga);
    });

    f.nos.forEach(function (no, idx) {
      var t = TIPOS[no.tipo];
      var g = el("g", { "class": "anim anim-no", style: "--i:" + idx });
      var cx = no.x + no.w / 2, cy = no.y + no.h / 2;
      if (no.tipo === "gateway") {
        g.appendChild(el("polygon", { "class": t.classe, points: [cx, no.y, no.x + no.w, cy, cx, no.y + no.h, no.x, cy].join(" ") }));
        g.appendChild(el("path", { "class": "gateway-x", d: "M" + (cx - 6) + " " + (cy - 6) + " L" + (cx + 6) + " " + (cy + 6) + " M" + (cx + 6) + " " + (cy - 6) + " L" + (cx - 6) + " " + (cy + 6) }));
        g.appendChild(texto("no-tag", no.x + no.w + 10, cy - 2, t.tag, "start"));
        g.appendChild(texto("no-titulo", no.x + no.w + 10, cy + 13, no.titulo, "start"));
        svg.appendChild(g);
        return;
      }
      var humano = no.tipo === "hitl" || no.hitl;
      var pilula = no.tipo === "pessoa" || no.tipo === "saida" || no.tipo === "hitl";
      g.appendChild(el("rect", { "class": t.classe + (no.opcional ? " no--opcional" : ""), x: no.x, y: no.y, width: no.w, height: no.h, rx: pilula ? no.h / 2 : 10 }));
      var base = no.tag || t.tag;
      if (humano && base.indexOf("HITL") < 0) base = base ? base + " \u00b7 HITL" : "HITL";
      var tag = base + (no.opcional ? (base ? " \u00b7 opcional" : "opcional") : "");
      var linhas = (tag ? 1 : 0) + 1 + no.sub.length;
      var altura = linhas * 14;
      var y = no.y + (no.h - altura) / 2 + 11;
      if (tag) { g.appendChild(texto("no-tag", cx, y, tag)); y += 14; }
      g.appendChild(texto("no-titulo", cx, y, no.titulo)); y += 14;
      no.sub.forEach(function (s) { g.appendChild(texto("no-sub", cx, y, s)); y += 14; });
      if (humano) g.appendChild(selo(no.x + 24, no.y));
      svg.appendChild(g);
    });
    animar(svg, caminhos);
    return svg;
  }

  /* Entrada em sequência quando o diagrama aparece na tela, e um pacote que percorre cada seta (pulso do fluxo).
   * Só opacity e transform. Com prefers-reduced-motion o diagrama aparece pronto e sem pacotes. */
  var REDUZ = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)");
  function animar(svg, caminhos) {
    if (REDUZ && REDUZ.matches) { svg.classList.add("tocar", "pronto"); return; }
    var ciclo = Math.max(4, caminhos.length * 0.9 + 1.5);
    caminhos.forEach(function (c, i) {
      var ini = i * 0.9 / ciclo, fim = Math.min(ini + 0.8 / ciclo, 0.98);
      var bolha = el("circle", { "class": "pacote", r: 3.5, cx: 0, cy: 0, opacity: 0 });
      var mov = el("animateMotion", { path: c.d, dur: ciclo + "s", repeatCount: "indefinite", calcMode: "linear", keyPoints: "0;0;1;1", keyTimes: "0;" + ini + ";" + fim + ";1", begin: "1.6s" });
      var op = el("animate", { attributeName: "opacity", dur: ciclo + "s", repeatCount: "indefinite", values: "0;0;1;1;0;0", keyTimes: "0;" + ini + ";" + (ini + 0.01) + ";" + (fim - 0.01) + ";" + fim + ";1", begin: "1.6s" });
      bolha.appendChild(mov); bolha.appendChild(op);
      svg.appendChild(bolha);
    });
    if (!("IntersectionObserver" in window)) { svg.classList.add("tocar"); return; }
    var io = new IntersectionObserver(function (itens) {
      if (itens[0].isIntersecting) { svg.classList.add("tocar"); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(svg);
  }

  function nome(no) {
    if (no.tipo === "gateway") return "decisão: " + no.titulo;
    if (no.tipo === "hitl" || no.hitl) return no.titulo + " (HITL, passo humano)";
    if (no.juiz) return no.titulo + " (" + (no.tag.indexOf("Agent") >= 0 ? "Agent-as-a-Judge" : "LLM-as-a-Judge") + ")";
    return no.titulo;
  }
  function recursos(id) {
    var r = { gateway: false, hitl: false, llm: false, agente: false };
    ((FLUXOS[id] || { nos: [] }).nos).forEach(function (no) {
      if (no.tipo === "gateway") r.gateway = true;
      if (no.tipo === "hitl" || no.hitl) r.hitl = true;
      if (no.juiz) { if (no.tag.indexOf("Agent") >= 0) r.agente = true; else r.llm = true; }
    });
    return r;
  }

  function descricao(f, mapa) {
    return f.titulo + ". Etapas: " + f.arestas.map(function (a) {
      return nome(mapa[a.de]) + " → " + nome(mapa[a.para]) + (a.rotulo ? " (" + a.rotulo + ")" : "");
    }).join("; ") + ".";
  }

  window.SynapseFlows = {
    desenhar: desenhar,
    titulo: function (id) { return FLUXOS[id] ? FLUXOS[id].titulo : ""; },
    existe: function (id) { return !!FLUXOS[id]; },
    recursos: recursos
  };
})();
