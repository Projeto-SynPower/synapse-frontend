#!/usr/bin/env python3
"""
Acusa divergência entre os tokens da skill e a cópia colada num projeto.

Por quê: "cole, não redigite" (SKILL.md, passo 1) mata o drift na origem, mas cria duas
cópias — a da skill e a do `globals.css` (ou equivalente) do projeto que
consome. `gen_tokens_css.py --check` cobre a primeira e não sabe da segunda.
Sem isto, a paleta do produto e a paleta da skill divergem em silêncio, que é
o mesmo modo de falha que o `--check` existe para impedir, um nível acima.

Uso:
    python check_consumer.py caminho/para/globals.css
    python check_consumer.py app/globals.css --quiet   # só o resumo

Exit 0 = nenhuma divergência. Exit 2 = divergência encontrada.

O que ele NÃO faz: reclamar de token que o projeto inventou. `--primary`,
`--sidebar`, `--table-head` são do consumidor. Só entra no relatório o que tem
nome de token da skill e valor diferente — ou nome quase igual, que costuma
ser erro de digitação.
"""

import argparse
import difflib
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
TOKENS_PATH = os.path.join(HERE, "tokens.json")

# Grupos que guardam valores/exceções, não nomes de token (mesma lista do lint).
NAO_SAO_TOKENS = {
    "gradient_literals", "translucent_literals", "named_colors_allowed",
    "text_color_banlist", "spacing_exceptions", "wcag_minimum",
    "touch_target_min_px", "_comment",
}

# Grupos de configuração ou de medição: as chaves não são tokens do CSS base.
NAO_SAO_VALORES = {
    "dark", "body", "groups", "prose_sources", "focus_ring",
    "dominance_families", "alias_families", "manual_checklist",
}

# Cor escrita de formas diferentes (hex, rgb(), oklch()) é a MESMA cor se o
# sRGB bate. O app declara oklch; a skill guarda hex porque é o que os
# medidores de contraste leem. Comparar texto acusaria divergência em toda
# linha. Tolerância de 1 por canal: é o arredondamento da conversão.
def _como_rgb(valor):
    v = valor.strip().lower()
    m = re.fullmatch(r"#([0-9a-f]{6})([0-9a-f]{2})?", v)
    if m:
        h = m.group(1)
        alfa = int(m.group(2), 16) / 255 if m.group(2) else 1.0
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)) + (round(alfa, 2),)
    m = re.fullmatch(r"oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*(?:/\s*([\d.]+))?\s*\)", v)
    if m:
        import math
        L = float(m.group(1)) / (100 if m.group(2) else 1)
        C, H = float(m.group(3)), float(m.group(4))
        alfa = float(m.group(5)) if m.group(5) else 1.0
        a, b = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
        l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
        m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
        s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
        lin = (4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
               -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
               -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_)
        def enc(x):
            x = max(0.0, min(1.0, x))
            return 12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055
        return tuple(round(enc(x) * 255) for x in lin) + (round(alfa, 2),)
    return None


def mesma_cor(a, b):
    ra, rb = _como_rgb(a), _como_rgb(b)
    if ra is None or rb is None:
        return None
    return all(abs(x - y) <= 1 for x, y in zip(ra[:3], rb[:3])) and abs(ra[3] - rb[3]) <= 0.01

DECL = re.compile(r"(?<![\w-])--([\w-]+)\s*:\s*([^;{}]+)(?=[;}])")
ALIAS = re.compile(r"^var\(\s*--([\w-]+)\s*\)$")

# Escopos que legitimamente redefinem token e NÃO são divergência:
#   @theme      — ponte de namespace do Tailwind v4 (§28.2)
#   .dark etc.  — sobrescrita de modo escuro (§27)
ESCOPO_LEGITIMO = re.compile(
    r"(^|\s)(@theme\b|\.dark\b|\[data-theme|@media[^{]*prefers-color-scheme)"
)


def tokens_da_skill():
    with open(TOKENS_PATH, encoding="utf-8") as f:
        dados = json.load(f)
    plano = {}

    def colhe(no):
        for chave, valor in no.items():
            if isinstance(valor, dict):
                colhe(valor)
            elif isinstance(chave, str) and not chave.startswith("_"):
                plano[chave] = str(valor)

    for grupo, conteudo in dados.items():
        if (grupo in NAO_SAO_TOKENS or grupo.startswith("_")
                or grupo in NAO_SAO_VALORES or not isinstance(conteudo, dict)):
            continue
        colhe(conteudo)
    return plano


def seletor_base():
    """Seletor onde o projeto consumidor declara o tema claro, se não for
    `:root`. No app de origem é `[data-app-shell]`: o `:root` dele carrega
    outro tema (o de marketing) com os mesmos nomes, e compará-lo com a skill
    acusaria divergência em tudo."""
    with open(TOKENS_PATH, encoding="utf-8") as f:
        return json.load(f).get("consumer_base_selector")


def normaliza(valor):
    """Compara significado, não formatação: caixa, espaço e aspas não contam."""
    valor = " ".join(valor.split()).strip().strip("\'\"")
    return valor.lower().replace(", ", ",")


def blocos_base(css, alvo=None):
    """Devolve só os trechos de escopo base — tipicamente `:root`.

    Sem isto o checker acusa a ponte `--radius-md: var(--tw-radius-md)` do
    `@theme` e toda sobrescrita do `.dark` como divergência, que é ruído: as
    duas são o uso previsto (§27, §28.2). Um checker com 20 falsos positivos
    é pior que checker nenhum — ninguém lê o vigésimo primeiro.
    """
    trechos, i = [], 0
    while True:
        abre = css.find("{", i)
        if abre == -1:
            break
        seletor = css[css.rfind("}", 0, abre) + 1: abre]
        profundidade, fim = 1, abre + 1
        while profundidade and fim < len(css):
            if css[fim] == "{":
                profundidade += 1
            elif css[fim] == "}":
                profundidade -= 1
            fim += 1
        if not ESCOPO_LEGITIMO.search(seletor) and (alvo is None or alvo in seletor):
            trechos.append((abre + 1, css[abre + 1:fim - 1]))
        i = fim
    return trechos


def resolve(nome, valor, skill):
    """`--contact-700: var(--accent-700)` não é divergência: é o alias que o
    próprio tokens.css da skill emite. Segue o ponteiro antes de comparar."""
    m = ALIAS.match(valor.strip())
    if m and m.group(1) in skill:
        return skill[m.group(1)]
    return valor


def analisa(caminho, skill):
    with open(caminho, encoding="utf-8") as f:
        css = f.read()

    alvo = seletor_base()
    if alvo and alvo not in css:
        alvo = None  # projeto declara o tema no :root, como o padrão shadcn
    vistos = {}
    for deslocamento, trecho in blocos_base(css, alvo):
        for m in DECL.finditer(trecho):
            nome, valor = m.group(1), m.group(2)
            linha = css.count("\n", 0, deslocamento + m.start()) + 1
            vistos.setdefault(nome, (valor, linha))

    divergentes, ausentes, parecidos = [], [], []

    for nome, valor_skill in skill.items():
        if nome not in vistos:
            ausentes.append(nome)
            continue
        valor_projeto, linha = vistos[nome]
        # Resolve os DOIS lados: o tokens.json guarda `--surface-base` como
        # "var(--ink-50)" e o projeto pode ter o hex, ou vice-versa. Comparar
        # ponteiro com valor acusaria divergência onde não há.
        efetivo = resolve(nome, valor_projeto, skill)
        esperado = resolve(nome, valor_skill, skill)
        cor = mesma_cor(efetivo, esperado)
        if cor is True:
            continue
        if cor is None and normaliza(efetivo) == normaliza(esperado):
            continue
        if cor is False or normaliza(efetivo) != normaliza(esperado):
            divergentes.append((nome, valor_skill, normaliza(valor_projeto), linha))

    nomes_skill = set(skill)
    for nome, (_, linha) in vistos.items():
        if nome in nomes_skill or nome.startswith("tw-") or len(nome) < 6:
            continue
        perto = difflib.get_close_matches(nome, sorted(nomes_skill), n=1, cutoff=0.92)
        # Sufixo de escala próprio do Tailwind (2xl, 3xl…) não é typo da skill.
        #
        # A isenção já foi `-\d?xl$|-\d+$`, e o segundo ramo engolia a regra
        # inteira: toda família de escala da skill termina em número
        # (`violet-700`, `sky-100`, `sp-4`), então o detector de typo ficava
        # cego para o grosso da paleta — `--ocan-900` passava calado enquanto
        # `--surfce-base` era pego. Só o sufixo `xl` precisa da isenção.
        if perto and not re.search(r"-\d?xl$", nome):
            parecidos.append((nome, perto[0], linha))

    return divergentes, ausentes, parecidos


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    parser.add_argument("arquivo", help="CSS do projeto consumidor (ex.: globals.css)")
    parser.add_argument("--quiet", action="store_true", help="só o resumo")
    args = parser.parse_args()

    if not os.path.isfile(args.arquivo):
        sys.exit(f"arquivo não encontrado: {args.arquivo}")

    skill = tokens_da_skill()
    divergentes, ausentes, parecidos = analisa(args.arquivo, skill)

    if not args.quiet:
        for nome, esperado, achado, linha in divergentes:
            print(f"[DIVERGE] linha {linha}: --{nome} vale '{achado}' no projeto, "
                  f"'{esperado}' na skill. Um dos dois está desatualizado — "
                  f"a skill é a fonte (§3).")
        for nome, sugestao, linha in parecidos:
            print(f"[AVISO] linha {linha}: --{nome} não existe na skill, mas é "
                  f"quase --{sugestao}. Erro de digitação vira token morto: o "
                  f"browser descarta a declaração em silêncio.")
        if ausentes and not divergentes:
            print(f"[INFO] {len(ausentes)} token(s) da skill não aparecem neste "
                  f"arquivo — normal se o projeto usa só parte do sistema.")

    print(f"\n{len(divergentes)} divergência(s), {len(parecidos)} aviso(s), "
          f"{len(skill) - len(ausentes)}/{len(skill)} tokens da skill presentes.")
    return 2 if divergentes else 0


if __name__ == "__main__":
    sys.exit(main())
