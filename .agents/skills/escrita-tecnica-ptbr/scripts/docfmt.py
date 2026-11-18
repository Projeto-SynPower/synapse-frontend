#!/usr/bin/env python3
"""Verifica e gera estruturas da documentacao tecnica Synchro.

Subcomandos:
    check <caminhos...>   Valida as convencoes da casa em arquivos ou diretorios .md
    toc <arquivo> [-w]    Gera a "Tabela de Conteudos" com ancoras corretas

O script cobre apenas o que e mecanicamente verificavel. Voz, clareza e correcao
gramatical continuam sendo julgamento humano (ou do modelo que usa a skill).

Sem dependencias externas: roda com o Python 3 do sistema.
"""

from __future__ import annotations

import argparse
import re
import sys
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import quote

MAX_WIDTH = 120
TOC_MIN_SECTIONS = 4
TOC_MIN_LINES = 120
TOKEN_INQUEBRAVEL = 60
TOC_TITLES = ("Tabela de Conteúdos", "Índice", "Tabela de Conteudos", "Indice")
PREFERRED_FENCE_LANGS = {"sh": "bash", "shell": "bash", "console": "bash", "js": "javascript"}
FORMAS_COMPOSTAS = re.compile(r"\(\[[^\]]*\]\)|\[\[[^\]]*\]\]|\[\([^)]*\)\]|\[/[^\]]*[/\\]\]")
IGNORAR_DIRS = {".venv", "node_modules", ".pytest_cache", "build", "dist", ".generated"}


@dataclass
class Issue:
    line: int
    code: str
    message: str


@dataclass
class Heading:
    level: int
    text: str
    line: int


@dataclass
class Doc:
    """Documento ja decomposto nas estruturas que os verificadores consomem."""

    path: Path
    lines: list[str]
    in_fence: list[bool]
    headings: list[Heading]
    body_start: int  # primeira linha apos o frontmatter YAML

    @classmethod
    def load(cls, path: Path) -> Doc:
        lines = path.read_text(encoding="utf-8").splitlines()
        start = strip_frontmatter(lines)
        in_fence = [True] * start + split_fences(lines[start:])
        return cls(path, lines, in_fence, parse_headings(lines, in_fence), start)

    @property
    def h1s(self) -> list[Heading]:
        return [h for h in self.headings if h.level == 1]

    @property
    def h2s(self) -> list[Heading]:
        return [h for h in self.headings if h.level == 2 and h.text.strip() not in TOC_TITLES]


def slugify(text: str) -> str:
    """Reproduz a ancora que o GitLab gera e o mdformat escreve percent-encoded.

    Passos: remove formatacao inline, minusculiza, descarta pontuacao, troca
    espaco por hifen e percent-encoda os bytes UTF-8 nao ASCII.
    """
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)  # links -> texto do link
    text = re.sub(r"[`*~]", "", text)  # o '_' e preservado: faz parte de identificadores snake_case
    text = text.strip().lower()
    kept = [
        ch
        for ch in text
        if ch.isalnum() or ch in {" ", "-", "_"} or unicodedata.category(ch) == "Mn" or ord(ch) == 0xFE0F
    ]
    slug = "".join(kept).strip().replace(" ", "-")
    return quote(re.sub(r"-{2,}", "-", slug), safe="-_")


def strip_frontmatter(lines: list[str]) -> int:
    """Devolve o indice da primeira linha apos o frontmatter YAML, ou 0 se nao houver."""
    if not lines or lines[0].strip() != "---":
        return 0
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            return i + 1
    return 0


def split_fences(lines: list[str]) -> list[bool]:
    """Marca cada linha como dentro (True) ou fora (False) de bloco de codigo.

    Segue o CommonMark: um fence so fecha com o mesmo caractere, comprimento maior ou
    igual ao de abertura e sem info string. Sem isso, um exemplo de documentacao escrito
    com ```` envolvendo blocos ``` seria lido ao contrario.
    """
    inside: list[bool] = []
    char: str | None = None
    length = 0
    for raw in lines:
        marker = re.match(r"^(`{3,}|~{3,})(.*)$", raw.lstrip())
        if marker is None:
            inside.append(char is not None)
            continue
        run, info = marker.group(1), marker.group(2).strip()
        if char is None:
            char, length = run[0], len(run)
        elif run[0] == char and len(run) >= length and not info:
            char, length = None, 0
        inside.append(True)
    return inside


def parse_headings(lines: list[str], in_fence: list[bool]) -> list[Heading]:
    headings = []
    for idx, raw in enumerate(lines):
        m = None if in_fence[idx] else re.match(r"^(#{1,6})\s+(.*\S)\s*$", raw)
        if m:
            headings.append(Heading(len(m.group(1)), m.group(2).strip(), idx + 1))
    return headings


def build_toc(headings: list[Heading], depth: int = 3) -> list[str]:
    """Monta a Tabela de Conteudos: H2 na raiz, H3 indentados, sem H1 nem a propria TdC.

    depth=2 lista apenas as secoes H2 -- escolha valida para documentos longos como
    `jobs.md`, onde indexar cada subsecao tornaria a TdC maior que a leitura.
    """
    entries = []
    for h in headings:
        if h.level < 2 or h.level > depth or (h.level == 2 and h.text.strip() in TOC_TITLES):
            continue
        indent = "  " * (h.level - 2)
        label = re.sub(r"\s+", " ", h.text).strip()
        entries.append(f"{indent}- [{label}](#{slugify(h.text)})")
    return entries


def toc_bounds(doc: Doc) -> tuple[int, int] | None:
    """Devolve o intervalo de linhas (0-based, fim exclusivo) ocupado pela TdC atual.

    Uma secao so conta como Tabela de Conteudos se suas entradas forem ancoras internas.
    Isso distingue a TdC do indice comentado de `docs/README.md`, que aponta para outros
    arquivos e nao deve ser reescrito.
    """
    for i, h in enumerate(doc.headings):
        if h.level != 2 or h.text.strip() not in TOC_TITLES:
            continue
        start = h.line - 1
        end = next((n.line - 1 for n in doc.headings[i + 1 :] if n.level <= 2), len(doc.lines))
        if any("](#" in ln for ln in doc.lines[start + 1 : end]):
            return start, end
    return None


# --------------------------------------------------------------------------- verificadores


def check_titulo(doc: Doc) -> list[Issue]:
    """H1 unico, na abertura, seguido de paragrafo de apresentacao."""
    issues = []
    h1s = doc.h1s
    if not h1s:
        return [Issue(1, "h1-ausente", "Falta o H1. Todo documento abre com um titulo nominal em '# '.")]

    for extra in h1s[1:]:
        issues.append(Issue(extra.line, "h1-duplicado", "Segundo H1 no arquivo; use '##' para secoes."))

    if any(ln.strip() for ln in doc.lines[doc.body_start : h1s[0].line - 1]):
        issues.append(Issue(h1s[0].line, "h1-tardio", "O H1 deve ser a primeira linha com conteudo do arquivo."))

    # ADR e a excecao legitima: seu modelo abre com a lista de metadados (Status, Data, Autor).
    if re.match(r"^ADR\s+\d+\s*:", h1s[0].text):
        return issues

    fim = next((h.line - 1 for h in doc.headings if h.level >= 2 and h.line > h1s[0].line), len(doc.lines))
    prosa = [
        i
        for i in range(h1s[0].line, fim)
        if doc.lines[i].strip() and not doc.in_fence[i] and not re.match(r"^\s*([-*+]\s|\d+[.)]\s|#|\||>)", doc.lines[i])
    ]
    if not prosa:
        issues.append(
            Issue(
                h1s[0].line,
                "lead-ausente",
                "Falta o paragrafo de abertura. Escreva 1-3 frases entre o H1 e a primeira secao.",
            )
        )
    return issues


def check_hierarquia(doc: Doc) -> list[Issue]:
    """Cabecalhos nao pulam niveis."""
    issues = []
    anterior = 0
    for h in doc.headings:
        if anterior and h.level > anterior + 1:
            issues.append(
                Issue(h.line, "salto-de-nivel", f"H{anterior} seguido de H{h.level}; nao pule niveis de cabecalho.")
            )
        anterior = h.level
    return issues


def check_toc(doc: Doc) -> list[Issue]:
    """TdC presente em documento longo e sincronizada com os cabecalhos."""
    bounds = toc_bounds(doc)
    if bounds is None:
        # Limiar calibrado no corpus: todo documento longo com TdC passa de 120 linhas,
        # enquanto docs curtas de referencia (tabelas de banco, comandos de CLI) nao usam TdC.
        if len(doc.h2s) >= TOC_MIN_SECTIONS and len(doc.lines) >= TOC_MIN_LINES:
            return [
                Issue(
                    doc.h2s[0].line,
                    "toc-ausente",
                    f"{len(doc.h2s)} secoes em {len(doc.lines)} linhas; considere uma Tabela de Conteudos: "
                    "docfmt.py toc <arquivo> --write",
                )
            ]
        return []

    start, end = bounds
    atual = [ln.rstrip() for ln in doc.lines[start + 1 : end] if ln.strip().startswith("- [")]
    # o documento escolhe a profundidade: se nao ha entrada indentada, ele indexa so H2
    profundidade = 3 if any(ln.startswith(" ") for ln in atual) else 2
    if atual != build_toc(doc.headings, depth=profundidade):
        return [
            Issue(
                start + 1,
                "toc-dessincronizada",
                "A Tabela de Conteudos nao corresponde aos cabecalhos. Regenere: docfmt.py toc <arquivo> --write",
            )
        ]
    return []


def _paragrafo_anterior(doc: Doc, idx: int) -> str:
    for j in range(idx - 1, -1, -1):
        if doc.lines[j].strip():
            return doc.lines[j].strip()
    return ""


def check_blocos(doc: Doc) -> list[Issue]:
    """Todo bloco de codigo declara linguagem; todo diagrama tem paragrafo de apresentacao."""
    issues = []
    aberto = False
    marcador = ""
    for idx, raw in enumerate(doc.lines[doc.body_start :], start=doc.body_start):
        m = re.match(r"^(`{3,}|~{3,})(.*)$", raw.lstrip())
        if not m:
            continue
        if aberto:
            if m.group(1)[0] == marcador[0] and len(m.group(1)) >= len(marcador) and not m.group(2).strip():
                aberto = False
            continue

        aberto, marcador = True, m.group(1)
        info = m.group(2).strip()
        lang = info.split()[0] if info else ""
        if not lang:
            issues.append(Issue(idx + 1, "fence-sem-linguagem", "Bloco de codigo sem linguagem declarada."))
        elif lang in PREFERRED_FENCE_LANGS:
            issues.append(
                Issue(
                    idx + 1,
                    "fence-linguagem-nao-padrao",
                    f"Use '{PREFERRED_FENCE_LANGS[lang]}' em vez de '{lang}' para manter o corpus uniforme.",
                )
            )
        elif lang == "mermaid" and _paragrafo_anterior(doc, idx).lstrip().startswith("#"):
            issues.append(
                Issue(
                    idx + 1,
                    "diagrama-sem-apresentacao",
                    "Diagrama logo apos um cabecalho. Escreva antes um paragrafo dizendo o que ele mostra.",
                )
            )
    return issues


def check_mermaid(doc: Doc) -> list[Issue]:
    """Armadilhas de sintaxe que fazem o GitLab renderizar o bloco como texto puro."""
    issues = []
    dentro = False
    for idx, raw in enumerate(doc.lines):
        stripped = raw.strip()
        if not dentro:
            dentro = stripped.startswith("```mermaid")
            continue
        if stripped.startswith("```"):
            dentro = False
            continue
        if "\\n" in raw:
            issues.append(Issue(idx + 1, "mermaid-quebra-invalida", "Use '<br>' em vez de '\\n' em rotulo Mermaid."))
        if raw.rstrip() != raw:
            issues.append(Issue(idx + 1, "mermaid-espaco-final", "Espaco em branco no fim da linha dentro do Mermaid."))
        # Parenteses sao o unico caractere que realmente quebra o parser dentro de [].
        # As formas compostas -- ([]), [[]], [()] -- sao removidas antes para nao gerar ruido.
        if re.search(r"\[(?!\")[^\]\"]*[()][^\]\"]*\]", FORMAS_COMPOSTAS.sub("", raw)):
            issues.append(
                Issue(
                    idx + 1,
                    "mermaid-rotulo-sem-aspas",
                    'Parenteses em rotulo de no precisam de aspas: A["texto (x)"].',
                )
            )
    return issues


def check_higiene(doc: Doc) -> list[Issue]:
    """Largura de linha, espaco final e marcador de lista."""
    issues = []
    for idx, raw in enumerate(doc.lines[doc.body_start :], start=doc.body_start):
        if doc.in_fence[idx]:
            continue
        if raw.rstrip() != raw:
            issues.append(Issue(idx + 1, "espaco-final", "Espaco em branco no fim da linha."))
        if re.match(r"^\s*[*+]\s+\S", raw):
            issues.append(Issue(idx + 1, "marcador-de-lista", "Use '-' como marcador de lista."))

        s = raw.strip()
        if len(raw) <= MAX_WIDTH or s.startswith(("|", "<")) or re.match(r"^\[[^\]]*\]:", s):
            continue
        if max((len(tok) for tok in s.split()), default=0) > TOKEN_INQUEBRAVEL:
            continue  # URL ou token longo que o mdformat nao consegue quebrar
        issues.append(
            Issue(idx + 1, "linha-larga", f"{len(raw)} colunas (limite {MAX_WIDTH}). Deixe o formatador quebrar: "
            f"uvx --from mdformat --with mdformat-gfm mdformat --wrap {MAX_WIDTH} --number <arquivo>")
        )
    return issues


def _prosa_relevante(doc: Doc, idx: int, raw: str) -> bool:
    """Linha de texto corrido: fora de fence, fora de tabela, fora de citacao e de rotulo de lista."""
    if doc.in_fence[idx]:
        return False
    s = raw.strip()
    if not s or s.startswith(("|", ">", "#", "<")):
        return False
    # Um item como "- **Termo** — glosa" usa o travessao para separar rotulo de glosa, que e
    # uso legitimo. Ja em "- **Termo:** ..." os dois-pontos ficam com essa funcao, e qualquer
    # travessao seguinte e prosa comum, entao a linha volta a ser verificada.
    rotulo = re.match(r"^[-*+]\s+(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\])", s)
    if not rotulo:
        return True
    return rotulo.group(1).rstrip("*`]").endswith(":")


def _texto_autoral(raw: str) -> str:
    """Remove code spans e trechos entre aspas antes de avaliar estilo.

    O que esta em `` ` `` e literal, nao pontuacao. O que esta entre aspas e exemplo citado:
    documentacao sobre escrita precisa poder mostrar o contraexemplo sem ser marcada por ele.
    """
    raw = re.sub(r"`[^`]*`", "", raw)
    return re.sub(r"[\"“][^\"”]*[\"”]", "", raw)


def check_travessao(doc: Doc) -> list[Issue]:
    """Travessao em texto corrido.

    A norma do portugues reserva o travessao para o aposto intercalado (sempre em par) e,
    no corpus destes projetos, para separar rotulo de glosa em listas, indices e subtitulos.
    No texto corrido ele fragmenta a leitura e substitui virgula, dois-pontos ou parenteses.
    O corpus usa 3,6 travessoes por 100 linhas de prosa, quase todos como separador de rotulo.
    """
    issues = []
    # O mdformat quebra prosa em 120 colunas, entao um aposto intercalado (par de travessoes)
    # pode acabar dividido em duas linhas. Contar por linha marcaria as duas como isoladas,
    # por isso a paridade e avaliada no paragrafo inteiro.
    par_de = {}
    ini = None
    total = 0
    for idx, raw in enumerate(doc.lines[doc.body_start :], start=doc.body_start):
        vazia = not raw.strip()
        if ini is None and not vazia:
            ini, total = idx, 0
        if ini is not None:
            total += _texto_autoral(raw).count("—") if _prosa_relevante(doc, idx, raw) else 0
        if (vazia or idx == len(doc.lines) - 1) and ini is not None:
            for j in range(ini, idx + 1):
                par_de[j] = total
            ini = None

    for idx, raw in enumerate(doc.lines[doc.body_start :], start=doc.body_start):
        if "—" not in raw or not _prosa_relevante(doc, idx, raw):
            continue
        limpa = _texto_autoral(raw)
        if not limpa.count("—"):
            continue
        # aposto intercalado (numero par de travessoes no paragrafo) e uso legitimo
        if par_de.get(idx, 0) % 2 == 0:
            continue
        issues.append(
            Issue(
                idx + 1,
                "travessao-em-prosa",
                "Travessao em texto corrido. Prefira virgula (aposto), dois-pontos (explicacao), "
                "parenteses (incidental) ou divida a frase. Ver references/gramatica.md, secao Travessao.",
            )
        )
    return issues


# Formatos de frase de efeito: sentenca conclusiva que reafirma o obvio sem acrescentar dado.
#
# Calibracao: o padrao generico "X, nao Y" foi DESCARTADO de proposito. Rodado no corpus, ele
# marcou 11 ocorrencias das quais a maioria carrega informacao ("Use o token, nao a senha da sua
# conta", "O make api-specs atualiza o arquivo, nao o Postman"). O contraste e legitimo quando Y e
# uma suposicao errada e plausivel do leitor, e decorativo quando Y e espantalho; regex nao separa
# os dois casos. Esse julgamento fica na secao 4 da SKILL.md, onde ha contexto para decidir.
# Aqui ficam somente os formatos sem ambiguidade.
FRASE_EFEITO = (
    (
        re.compile(
            r"\b(?:ele|ela|isso|o parágrafo|o documento|o texto)\s+"
            r"(?:virou|vence|mora|nasce|morre|não percebeu|se resolve|pede socorro)\b[^.!?\n]{0,50}\."
        ),
        "personificacao do artefato",
    ),
    (
        re.compile(
            r"\b(?:não se negocia|é onde mora|de verdade\.|no fim do dia|fim da história"
            r"|nada mais(?: do)? que isso|simples assim|ponto final\.)\b",
            re.I,
        ),
        "aforismo conclusivo",
    ),
    (
        # contraste entre dois substantivos abstratos sem artigo: forma tipicamente decorativa
        # o verbo pode abrir a frase ("E decisao, nao descuido."), por isso as duas caixas
        re.compile(r"\b[éÉ]\s+[a-zà-ú]{4,14},\s+n[ãa]o\s+[a-zà-ú]{4,14}\s*\."),
        "contraste abstrato 'e X, nao Y'",
    ),
)


def check_frase_de_efeito(doc: Doc) -> list[Issue]:
    """Sinaliza construcoes tipicas de frase de efeito, para revisao humana.

    Frase de efeito e a sentenca curta e conclusiva que reafirma com enfase algo ja dito ou
    evidente. Ela nao acrescenta informacao verificavel e desloca a enfase do dado para a forma.
    Estes padroes sao heuristicos: confirme cada ocorrencia antes de reescrever, porque a
    construcao pode ser legitima quando carrega informacao nova.
    """
    issues = []
    for idx, raw in enumerate(doc.lines[doc.body_start :], start=doc.body_start):
        if not _prosa_relevante(doc, idx, raw):
            continue
        limpa = _texto_autoral(raw)
        for rx, nome in FRASE_EFEITO:
            m = rx.search(limpa)
            if m:
                issues.append(
                    Issue(
                        idx + 1,
                        "frase-de-efeito",
                        f"Possivel {nome}: \"{m.group(0).strip()[:60]}\". Se apagar a frase nao remove "
                        "informacao, reescreva enunciando o fato. Ver SKILL.md secao 4.",
                    )
                )
                break
    return issues


# Antropomorfismo: verbo humano ou emocional aplicado a artefato de software. Proibido pela
# secao 5 da SKILL.md, que o classifica como erro de prolixidade. Os padroes sao presos ao verbo,
# e nao ao sujeito, porque o sujeito varia demais (servico, rota, job, modulo, app).
#
# Calibracao: "entende" e "ve" sozinhos ficaram DE FORA quando o objeto e humano ("o leitor
# entende", "voce ve"), por isso os padroes exigem verbo na 3a pessoa colado a objeto tecnico ou
# a construcao inteira ("sabe falar", "tem onde morar"). Termo consagrado do ingles tecnico
# (no pai, no filho, processo orfao, daemon, handshake) nao e metafora e nao aparece aqui.
ANTROPOMORFISMO = (
    (
        re.compile(r"\b(?:fala|falam|falar|conversa|conversam|conversar|dialoga|dialogam)\s+com\b", re.I),
        "artefato que 'fala com'",
        "comunicar com, consultar, chamar ou publicar em",
    ),
    (
        re.compile(r"\b(?:sabe|sabem|saber|souber)\s+(?:como\s+)?[a-zà-ú]+(?:ar|er|ir)\b", re.I),
        "artefato que 'sabe' fazer algo",
        "implementa, suporta, reconhece ou valida",
    ),
    (
        re.compile(r"\b(?:mora|moram|morar|vive|vivem|viver|habita|habitam)\s+(?:em|no|na|nos|nas|dentro)\b", re.I),
        "artefato que 'mora' em algum lugar",
        "esta definido em, esta registrado em ou reside em",
    ),
    (
        re.compile(r"\b(?:tem|têm|ter)\s+onde\s+(?:morar|viver|ficar)\b", re.I),
        "artefato sem 'onde morar'",
        "esta registrado em, esta montado em",
    ),
    (
        re.compile(
            r"\b(?:nasce|nascem|nascer|morre|morrem|morrer|acorda|acordam|dorme|dormem|respira"
            r"|envelhece|adoece|sofre|sofrem|reclama|reclamam|se queixa|desiste|desistem"
            r"|aprende|aprendem|esquece|esquecem|percebe|percebem|enxerga|enxergam)\b",
            re.I,
        ),
        "verbo de comportamento humano em artefato",
        "e criado, e encerrado, dispara, rejeita, recebe ou le",
    ),
    (
        re.compile(
            r"\b(?:o|a|um|uma|esse|essa|este|esta)\s+(?:app|serviço|servico|módulo|modulo|projeto|repo"
            r"|repositório|repositorio|componente)\s+(?:irmão|irmao|irmã|irma|primo|pai|gêmeo|gemeo)\b",
            re.I,
        ),
        "metafora de parentesco",
        "nomeie o modulo ou o caminho real",
    ),
)


def check_antropomorfismo(doc: Doc) -> list[Issue]:
    """Sinaliza personificacao de codigo, servico, rota ou aplicacao.

    Artefato de software nao fala, nao mora, nao nasce, nao sabe e nao sente. O verbo humano
    ocupa o lugar do verbo de engenharia que carrega o dado, entao a ocorrencia e tratada como
    erro de prolixidade. Ver SKILL.md secao 5 e references/gramatica.md, secao Antropomorfismo.
    """
    issues = []
    for idx, raw in enumerate(doc.lines[doc.body_start :], start=doc.body_start):
        if not _prosa_relevante(doc, idx, raw):
            continue
        limpa = _texto_autoral(raw)
        for rx, nome, troca in ANTROPOMORFISMO:
            m = rx.search(limpa)
            if m:
                issues.append(
                    Issue(
                        idx + 1,
                        "antropomorfismo",
                        f'Possivel {nome}: "{m.group(0).strip()[:60]}". Troque por verbo de engenharia '
                        f"({troca}). Ver SKILL.md secao 5.",
                    )
                )
                break
    return issues


CHECKS = (
    check_titulo,
    check_hierarquia,
    check_toc,
    check_blocos,
    check_mermaid,
    check_higiene,
    check_travessao,
    check_frase_de_efeito,
    check_antropomorfismo,
)


def check_file(path: Path) -> list[Issue]:
    doc = Doc.load(path)
    if not doc.lines:
        return [Issue(1, "vazio", "Arquivo vazio.")]
    issues = [issue for check in CHECKS for issue in check(doc)]
    return sorted(issues, key=lambda i: (i.line, i.code))


# --------------------------------------------------------------------------- comandos


def collect(paths: list[str]) -> list[Path]:
    arquivos: list[Path] = []
    for raw in paths:
        p = Path(raw)
        if p.is_dir():
            arquivos.extend(sorted(f for f in p.rglob("*.md") if not IGNORAR_DIRS & set(f.parts)))
        elif p.suffix == ".md":
            arquivos.append(p)
    return arquivos


def cmd_check(args: argparse.Namespace) -> int:
    arquivos = collect(args.paths)
    if not arquivos:
        print("Nenhum arquivo .md encontrado.", file=sys.stderr)
        return 2

    total = 0
    for arquivo in arquivos:
        issues = check_file(arquivo)
        if not issues:
            continue
        total += len(issues)
        print(f"\n{arquivo}")
        for issue in issues:
            print(f"  {arquivo}:{issue.line}  [{issue.code}] {issue.message}")

    print(f"\n{len(arquivos)} arquivo(s) verificado(s); {total} ocorrencia(s).")
    return 1 if total else 0


def cmd_toc(args: argparse.Namespace) -> int:
    path = Path(args.file)
    doc = Doc.load(path)
    entries = build_toc(doc.headings, depth=args.depth)
    if not entries:
        print("Nenhum cabecalho H2/H3 para indexar.", file=sys.stderr)
        return 2

    bloco = ["## Tabela de Conteúdos", ""] + entries
    if not args.write:
        print("\n".join(bloco))
        return 0

    bounds = toc_bounds(doc)
    if bounds:
        antes, depois = doc.lines[: bounds[0]], doc.lines[bounds[1] :]
    elif not doc.h1s:
        print("Arquivo sem H1; adicione o titulo antes de gerar a TdC.", file=sys.stderr)
        return 2
    else:
        alvo = next((h.line - 1 for h in doc.headings if h.level == 2), len(doc.lines))
        antes, depois = doc.lines[:alvo], doc.lines[alvo:]

    # exatamente uma linha em branco antes e depois do bloco, para a operacao ser idempotente
    while antes and not antes[-1].strip():
        antes.pop()
    depois = depois[next((i for i, ln in enumerate(depois) if ln.strip()), len(depois)) :]
    novo = antes + [""] + bloco + [""] + depois

    path.write_text("\n".join(novo) + "\n", encoding="utf-8")
    print(f"Tabela de Conteudos atualizada em {path} ({len(entries)} entradas).")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(prog="docfmt.py", description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_check = sub.add_parser("check", help="valida as convencoes da documentacao")
    p_check.add_argument("paths", nargs="+", help="arquivos .md ou diretorios")
    p_check.set_defaults(func=cmd_check)

    p_toc = sub.add_parser("toc", help="gera a Tabela de Conteudos")
    p_toc.add_argument("file", help="arquivo .md")
    p_toc.add_argument("-w", "--write", action="store_true", help="escreve no arquivo em vez de imprimir")
    p_toc.add_argument(
        "-d",
        "--depth",
        type=int,
        choices=(2, 3),
        default=3,
        help="2 indexa so as secoes H2; 3 (padrao) inclui as subsecoes H3",
    )
    p_toc.set_defaults(func=cmd_toc)

    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
