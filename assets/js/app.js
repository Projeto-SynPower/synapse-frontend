/* Landing do Synapse. Lê window.SYNAPSE (data/catalog.js) e monta números, plugins, catálogo de skills e modal. */
(function () {
  "use strict";

  var D = window.SYNAPSE;
  var raiz = document.documentElement;
  if (!D) {
    document.getElementById("conteudo").insertAdjacentHTML("afterbegin",
      '<p class="wrap nota">Não achei data/catalog.js. Rode <code>python3 scripts/build_data.py</code>.</p>');
    return;
  }

  var estado = { plugin: "todos", busca: "" };
  var ROTULO_ACESSO = { none: "Não toca no rastreador.", read: "Só lê o rastreador.", write: "Escreve no rastreador." };
  var REPO = D.repositorio;
  var I = D.instalar || { comum: {}, plugins: {} };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  /* Texto com `trechos` em código */
  function md(t) { return esc(t).replace(/`([^`]+)`/g, "<code>$1</code>"); }
  function semAcento(t) { return String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
  function selo(classe, texto) { return '<span class="selo ' + classe + '">' + esc(texto) + "</span>"; }
  function porId(lista, id) { return lista.filter(function (x) { return x.id === id; })[0]; }

  function copiarTexto(botao, txt, rotulo) {
    var feito = function () { botao.textContent = "Copiado"; setTimeout(function () { botao.textContent = rotulo; }, 2000); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(feito, function () { botao.textContent = "Não consegui copiar"; });
    } else {
      var alvo = botao.closest("[data-copiavel]");
      var code = alvo && alvo.querySelector("code");
      if (code) { var r = document.createRange(); r.selectNodeContents(code); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }
      botao.textContent = "Texto selecionado: use Ctrl+C";
    }
  }

  /* Tema */
  var botaoTema = $("#tema");
  function sincronizarTema() {
    var escuro = raiz.classList.contains("dark");
    botaoTema.setAttribute("aria-pressed", String(escuro));
    botaoTema.setAttribute("aria-label", escuro ? "Usar tema claro" : "Usar tema escuro");
  }
  botaoTema.addEventListener("click", function () {
    var escuro = raiz.classList.toggle("dark");
    try { localStorage.setItem("synapse-tema", escuro ? "escuro" : "claro"); } catch (e) {}
    sincronizarTema();
  });
  sincronizarTema();

  /* Números do hero: contados do catálogo, nunca escritos à mão */
  (function numeros() {
    var itens = [
      ["Plugins", D.plugins.length, "pacotes de skills, hooks e servidor MCP"],
      ["Skills", D.skills.length, "procedimentos que o agente consulta"],
      ["Agentes", 2, "Claude Code e Codex"]
    ];
    $("#numeros").innerHTML = itens.map(function (i) {
      return '<div class="numero"><dt>' + esc(i[0]) + "</dt><dd>" + i[1] + "</dd><small>" + esc(i[2]) + "</small></div>";
    }).join("");
  })();

  /* Plugins: abas com painel */
  var abas = $("#plugins-abas");
  var painel = $("#plugin-painel");
  abas.innerHTML = D.plugins.map(function (p, i) {
    return '<button class="segmento" role="tab" type="button" id="aba-' + p.id + '" data-plugin="' + p.id +
      '" aria-selected="' + (i === 0) + '" aria-controls="plugin-painel" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(p.id) + "</button>";
  }).join("");

  /* Como adicionar o plugin: três vias, com os comandos do README e as notas de cada plugin */
  var VIAS = [["npx", "npx"], ["claude", "Claude Code"], ["codex", "Codex"]];
  function comandosPlugin(id, via) {
    if (via === "claude") return ["claude plugin marketplace add " + REPO + " --scope project", "claude plugin install " + id + "@synapse --scope project"];
    if (via === "codex") return ["codex plugin marketplace add " + REPO, "codex plugin add " + id + "@synapse"];
    return ["npx github:" + REPO + " add " + id];
  }
  /* Legenda dos padrões da literatura, só dos que o diagrama do plugin usa. */
  function legendaPadroes(id) {
    var r = window.SynapseFlows.recursos(id), s = "";
    if (r.hitl) s += '<span><svg viewBox="0 0 24 16"><rect class="no no--pessoa no--hitl" x="1" y="2" width="22" height="12" rx="6"/><circle class="selo-hitl__fundo" cx="4" cy="3" r="3.2"/><circle class="selo-hitl__icone" cx="4" cy="2.2" r="0.9"/><path class="selo-hitl__icone" d="M2.3 4.8 a1.8 1.5 0 0 1 3.4 0 Z"/></svg>HITL: passo que espera por uma pessoa</span>';
    if (r.gateway) s += '<span><svg viewBox="0 0 24 16"><polygon class="no no--gateway" points="12,1 22,8 12,15 2,8"/><path class="gateway-x" d="M9.5 5.5 L14.5 10.5 M14.5 5.5 L9.5 10.5"/></svg>decisão (gateway exclusivo, BPMN)</span>';
    if (r.llm) s += "<span>LLM-as-a-Judge: um modelo avalia com uma rubrica</span>";
    if (r.agente) s += "<span>Agent-as-a-Judge: um agente confere com ferramentas</span>";
    return s;
  }

  function lista(itens) {
    return itens.length ? '<ul class="adicionar__notas">' + itens.map(function (n) { return "<li>" + md(n) + "</li>"; }).join("") + "</ul>" : "";
  }
  function blocoCodigo(txt, rotulo) {
    return '<div class="comando" data-copiavel><pre class="codigo"><code>' + esc(txt) + '</code></pre>' +
      '<button class="botao botao--contorno" type="button" data-copia="' + esc(rotulo) + '">' + esc(rotulo) + "</button></div>";
  }
  function pintarVia(id, via) {
    var c = I.comum || {};
    var extra = ((I.plugins || {})[id] || {})[via] || {};
    var comuns = via === "npx" ? [c.npx, c.npx_padrao] : via === "claude" ? [c.claude_padrao] : [c.codex_padrao];
    var notas = extra.notas || [];
    $("#vias").innerHTML = VIAS.map(function (v) {
      return '<button class="segmento" type="button" data-via="' + v[0] + '" aria-pressed="' + (v[0] === via) + '">' + esc(v[1]) + "</button>";
    }).join("");
    $("#via-alvo").innerHTML =
      (c.aviso ? '<p class="adicionar__aviso">' + md(c.aviso) + "</p>" : "") +
      blocoCodigo(comandosPlugin(id, via).join("\n"), "Copiar comando") +
      lista(notas) +
      (extra.codigo ? blocoCodigo(extra.codigo, "Copiar configuração") : "") +
      lista(extra.depois || []) +
      lista(comuns.filter(Boolean));
  }

  var viaAtual = "npx";
  function mostrarPlugin(id, foco) {
    var p = porId(D.plugins, id);
    if (!p) return;
    Array.prototype.forEach.call(abas.children, function (b) {
      var ativo = b.dataset.plugin === id;
      b.setAttribute("aria-selected", String(ativo));
      b.tabIndex = ativo ? 0 : -1;
      if (ativo && foco) b.focus();
    });
    painel.setAttribute("aria-labelledby", "aba-" + id);
    painel.dataset.plugin = id;
    var skills = p.skills.map(function (sid) {
      return '<button class="filtro" type="button" data-abrir="' + esc(sid) + '">' + esc(sid) + "</button>";
    }).join("");
    painel.innerHTML =
      '<div><div class="plugin__cabeca"><h3 class="plugin__nome">' + esc(p.id) + '</h3><span class="plugin__versao">versão ' + esc(p.versao) + "</span></div>" +
      '<p class="plugin__resumo">' + esc(p.resumo) + "</p></div>" +
      '<section class="adicionar" aria-labelledby="adicionar-titulo">' +
        '<h4 class="adicionar__titulo" id="adicionar-titulo">Adicionar ao seu projeto</h4>' +
        '<div class="segmentos" role="group" aria-label="Forma de instalar" id="vias"></div>' +
        '<div id="via-alvo"></div></section>' +
      '<div class="fluxo"><h4 class="fluxo__titulo">' + esc(window.SynapseFlows.titulo(p.id)) + '</h4><div class="fluxo__quadro" id="fluxo-alvo"></div>' +
      '<p class="fluxo__dica">Role o diagrama para o lado para ver o fluxo inteiro.</p><div class="legenda" aria-hidden="true">' +
        '<span><svg viewBox="0 0 24 16"><rect class="no no--skill" x="1" y="2" width="22" height="12" rx="4"/></svg>skill</span>' +
        '<span><svg viewBox="0 0 24 16"><rect class="no no--subagente" x="1" y="2" width="22" height="12" rx="4"/></svg>subagente</span>' +
        '<span><svg viewBox="0 0 24 16"><rect class="no no--hook" x="1" y="2" width="22" height="12" rx="4"/></svg>hook</span>' +
        '<span><svg viewBox="0 0 24 16"><rect class="no no--servidor" x="1" y="2" width="22" height="12" rx="4"/></svg>servidor MCP</span>' +
        '<span><svg viewBox="0 0 24 16"><rect class="no" x="1" y="2" width="22" height="12" rx="4"/></svg>regra</span>' +
      legendaPadroes(p.id) +
      "</div></div>" +
      '<dl class="plugin__fatos"><div class="fato"><dt>Quando usar</dt><dd>' + esc(p.quando) + '</dd></div>' +
      '<div class="fato"><dt>Limite</dt><dd>' + esc(p.limite) + "</dd></div></dl>" +
      '<div><p class="campo__rotulo">Skills do plugin</p><div class="chips" style="margin-top:var(--sp-2)">' + skills + "</div></div>";
    pintarVia(id, viaAtual);
    var svg = window.SynapseFlows.desenhar(id);
    if (svg) $("#fluxo-alvo").appendChild(svg);
  }
  abas.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-plugin]");
    if (b) mostrarPlugin(b.dataset.plugin);
  });
  abas.addEventListener("keydown", function (ev) {
    var ids = D.plugins.map(function (p) { return p.id; });
    var i = ids.indexOf(document.activeElement.dataset.plugin);
    if (i < 0) return;
    if (ev.key === "ArrowRight") i = (i + 1) % ids.length;
    else if (ev.key === "ArrowLeft") i = (i - 1 + ids.length) % ids.length;
    else if (ev.key === "Home") i = 0;
    else if (ev.key === "End") i = ids.length - 1;
    else return;
    ev.preventDefault();
    mostrarPlugin(ids[i], true);
  });
  painel.addEventListener("click", function (ev) {
    var v = ev.target.closest("[data-via]");
    if (v) { viaAtual = v.dataset.via; pintarVia(painel.dataset.plugin, viaAtual); return; }
    var c = ev.target.closest("[data-copia]");
    if (c) { copiarTexto(c, c.closest("[data-copiavel]").querySelector("code").textContent, c.dataset.copia); return; }
    var b = ev.target.closest("[data-abrir]");
    if (b) abrirModal(b.dataset.abrir, b);
  });
  mostrarPlugin(D.plugins[0].id);

  /* Visão macro, na seção "O que é" */
  (function macro() {
    var alvo = $("#macro-alvo");
    var svg = alvo && window.SynapseFlows.desenhar("macro");
    if (svg) alvo.appendChild(svg);
  })();

  /* Catálogo de skills: busca e filtro pelo nome do plugin */
  var opcoesPlugin = [["todos", "Todas"]].concat(D.plugins.map(function (p) { return [p.id, p.id]; }));
  function pintarFiltros() {
    $("#filtros").innerHTML = opcoesPlugin.map(function (f) {
      return '<button class="filtro" type="button" data-plugin-filtro="' + esc(f[0]) + '" aria-pressed="' + (f[0] === estado.plugin) + '">' + esc(f[1]) + "</button>";
    }).join("");
  }

  function passa(s) {
    if (estado.plugin !== "todos" && s.plugins.indexOf(estado.plugin) < 0) return false;
    if (estado.busca) {
      var alvo = semAcento([s.id, s.resumo, s.oQueE, s.quando.join(" ")].join(" "));
      return estado.busca.split(/\s+/).every(function (t) { return alvo.indexOf(t) >= 0; });
    }
    return true;
  }

  function pintarSkills() {
    var itens = D.skills.filter(passa).sort(function (a, b) { return a.id.localeCompare(b.id); });
    $("#skills-lista").innerHTML = itens.map(function (s) {
      return "<li>" +
        '<button class="skill" type="button" data-skill="' + esc(s.id) + '" aria-haspopup="dialog">' +
        '<span class="skill__topo"><span class="skill__nome">' + esc(s.id) + '</span><span class="skill__versao">v' + esc(s.versao) + "</span></span>" +
        '<span class="skill__resumo">' + esc(s.resumo) + "</span>" +
        '<span class="skill__mais">Ver detalhes e instalar</span></button></li>';
    }).join("");
    $("#skills-vazio").hidden = itens.length > 0;
    $("#contagem").textContent = itens.length === D.skills.length
      ? D.skills.length + " skills"
      : itens.length + " de " + D.skills.length + " skills";
  }

  $("#filtros").addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-plugin-filtro]");
    if (!b) return;
    estado.plugin = b.dataset.pluginFiltro; pintarFiltros(); pintarSkills();
  });
  $("#busca").addEventListener("input", function (ev) { estado.busca = semAcento(ev.target.value.trim()); pintarSkills(); });
  $("#limpar").addEventListener("click", function () {
    estado = { plugin: "todos", busca: "" };
    $("#busca").value = ""; pintarFiltros(); pintarSkills(); $("#busca").focus();
  });
  $("#skills-lista").addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-skill]");
    if (b) abrirModal(b.dataset.skill, b);
  });
  pintarFiltros();
  pintarSkills();
  /* Depois da primeira revelação, filtrar não repete a animação */
  setTimeout(function () { $("#skills-lista").classList.add("estavel"); }, 4000);

  /* Modal sobre <dialog>: foco preso, Esc e clique fora fecham, foco volta ao gatilho */
  var modal = $("#modal");
  var corpo = $("#modal-corpo");
  var gatilho = null;

  function comandoInstalar(s) {
    return "npx skills add " + REPO + " --skill " + s.id + " -a claude-code -a codex";
  }
  function codePlugins(s) {
    return s.plugins.map(function (p) { return "<code>" + esc(p) + "</code>"; }).join(" ou ");
  }

  function abrirModal(id, origem) {
    var s = porId(D.skills, id);
    if (!s) return;
    gatilho = origem || null;
    var origemTxt = s.origemRepo ? "Cópia de " + s.origemRepo + (s.licenca ? ", licença " + s.licenca : "") : "Escrita pela equipe";
    var instalar = s.interna
      ? "<p>Esta skill vem dentro de um plugin. Adicione o plugin " + codePlugins(s) + " (veja a seção Plugins).</p>"
      : '<div class="comando" data-copiavel><pre class="codigo"><code id="cmd">' + esc(comandoInstalar(s)) + "</code></pre></div>" +
        (s.plugins.length ? '<p class="modal__nota">Ela também vem junto com o plugin ' + codePlugins(s) + ".</p>" : "");
    corpo.innerHTML =
      '<div class="modal__cabeca"><div>' +
        '<h2 class="modal__nome" id="modal-titulo">' + esc(s.id) + "</h2>" +
        '<p class="modal__resumo">' + esc(s.resumo) + "</p>" +
        '<div class="chips" style="margin-top:var(--sp-3)">' + selo("selo--neutro", "v" + s.versao) + "</div>" +
      '</div><button class="botao botao--icone" type="button" data-fechar aria-label="Fechar"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="modal__rolagem">' +
        '<div class="modal__bloco"><h3>O que é</h3><p>' + esc(s.oQueE) + "</p></div>" +
        (s.quando.length ? '<div class="modal__bloco"><h3>Quando usar</h3><ul>' + s.quando.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul></div>" : "") +
        (s.entrega ? '<div class="modal__bloco"><h3>O que entrega</h3><p>' + esc(s.entrega) + "</p></div>" : "") +
        (s.nota ? '<div class="modal__aviso"><strong>Atenção.</strong> ' + esc(s.nota) + "</div>" : "") +
        '<div class="modal__bloco"><h3>Rastreador</h3><p>' + esc(ROTULO_ACESSO[s.rastreador] || "") + "</p></div>" +
        (s.requer && s.requer.length ? '<div class="modal__bloco"><h3>Depende de</h3><ul>' + s.requer.map(function (r) { return "<li>" + esc(typeof r === "string" ? r : JSON.stringify(r)) + "</li>"; }).join("") + "</ul></div>" : "") +
        '<div class="modal__bloco"><h3>Origem</h3><p>' + esc(origemTxt) + ". Caminho no repositório: <code>" + esc(s.caminho) + "</code></p></div>" +
        '<div class="modal__bloco"><h3>Instalar</h3>' + instalar + "</div>" +
      "</div>" +
      '<div class="modal__rodape">' +
        (s.interna ? "" : '<button class="botao botao--contorno" type="button" data-copiar>Copiar comando</button>') +
        '<button class="botao botao--primario" type="button" data-fechar>Fechar</button></div>';
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    history.replaceState(null, "", "#skill-" + s.id);
    $(".modal__rolagem", modal).scrollTop = 0;
  }

  function fecharModal() {
    if (modal.open) modal.close();
  }
  modal.addEventListener("close", function () {
    history.replaceState(null, "", location.pathname + location.search);
    if (gatilho && document.contains(gatilho)) gatilho.focus();
  });
  modal.addEventListener("click", function (ev) {
    if (ev.target === modal) return fecharModal();
    if (ev.target.closest("[data-fechar]")) return fecharModal();
    var c = ev.target.closest("[data-copiar]");
    if (c) copiarTexto(c, $("#cmd") ? $("#cmd").textContent : "", "Copiar comando");
  });

  /* Link direto: #skill-<id> abre o modal */
  function abrirDoHash() {
    var m = location.hash.match(/^#skill-(.+)$/);
    if (m && porId(D.skills, decodeURIComponent(m[1])) && !modal.open) abrirModal(decodeURIComponent(m[1]));
  }
  window.addEventListener("hashchange", abrirDoHash);
  abrirDoHash();
})();
