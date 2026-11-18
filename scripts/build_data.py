#!/usr/bin/env python3
"""Gera data/catalog.js a partir do site-catalog.json (fatos do Synapse) e de content/ (texto editorial).

A landing não tem build: ela lê `window.SYNAPSE`, que este script escreve. Rode de novo
sempre que o site-catalog.json, o content/ptbr.json ou o content/instalar.json mudar.

Uso:
    python3 scripts/build_data.py                      # lê ../site-catalog.json
    python3 scripts/build_data.py --catalog <arquivo>  # ou SYNAPSE_SITE_CATALOG=<arquivo>
    python3 scripts/build_data.py --check              # sai com 2 se o arquivo estiver defasado
"""

import argparse
import json
import os
import sys
from pathlib import Path

FRONT = Path(__file__).resolve().parent.parent
DEFAULT_CATALOG = FRONT / "site-catalog.json"
OUT = FRONT / "data" / "catalog.js"
SUPPORTED_SCHEMA = 1
SCOPE_LABELS = {"general": "geral"}


def read_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def skill_view(skill, editorial, avisos):
    texto = editorial["skills"].get(skill["id"])
    if texto is None:
        avisos.append(f"skill sem texto editorial em content/ptbr.json: {skill['id']}")
        texto = {"resumo": skill["description"][:160], "oQueE": skill["description"], "quando": [], "entrega": ""}
    return {
        "id": skill["id"],
        "versao": skill["version"],
        "tipo": skill["kind"],
        "rastreador": skill["tracker"],
        "escopo": SCOPE_LABELS.get(skill["scope"], skill["scope"]),
        "interna": skill["internal"],
        "caminho": skill["path"],
        "origemRepo": skill["origin"]["repo"],
        "licenca": skill["origin"]["license"],
        "requer": skill["requires"],
        "plugins": skill["plugins"],
        "resumo": texto["resumo"],
        "oQueE": texto["oQueE"],
        "quando": texto.get("quando", []),
        "entrega": texto.get("entrega", ""),
        "nota": texto.get("nota", ""),
    }


def plugin_view(plugin, editorial, avisos):
    texto = editorial["plugins"].get(plugin["id"])
    if texto is None:
        avisos.append(f"plugin sem texto editorial em content/ptbr.json: {plugin['id']}")
        texto = {"resumo": plugin["description"], "quando": "", "limite": ""}
    return {
        "id": plugin["id"],
        "versao": plugin["version"],
        "skills": plugin["skills"],
        "resumo": texto["resumo"],
        "quando": texto.get("quando", ""),
        "limite": texto.get("limite", ""),
    }


def montar(catalog_path):
    facts = read_json(catalog_path)
    if facts.get("schemaVersion") != SUPPORTED_SCHEMA:
        sys.exit(f"{catalog_path}: schemaVersion {facts.get('schemaVersion')} nao suportado (esperado {SUPPORTED_SCHEMA})")
    editorial = read_json(FRONT / "content" / "ptbr.json")
    instalar = read_json(FRONT / "content" / "instalar.json")
    avisos = []
    return {
        "repositorio": facts["repository"],
        "plugins": [plugin_view(plugin, editorial, avisos) for plugin in facts["plugins"]],
        "skills": [skill_view(skill, editorial, avisos) for skill in facts["skills"]],
        "ajuda": editorial["ajuda"],
        "instalar": {"comum": instalar["comum"], "plugins": instalar["plugins"]},
    }, avisos


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--catalog", default=os.environ.get("SYNAPSE_SITE_CATALOG", str(DEFAULT_CATALOG)))
    args = parser.parse_args()
    dados, avisos = montar(args.catalog)
    for a in avisos:
        print("aviso:", a, file=sys.stderr)
    saida = (
        "/* Gerado por scripts/build_data.py a partir de site-catalog.json. Não edite. */\n"
        "window.SYNAPSE = " + json.dumps(dados, ensure_ascii=False, indent=2) + ";\n"
    )
    if args.check:
        if not OUT.exists() or OUT.read_text(encoding="utf-8") != saida:
            print("data/catalog.js defasado: rode scripts/build_data.py", file=sys.stderr)
            sys.exit(2)
        print("data/catalog.js em dia")
        return
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(saida, encoding="utf-8")
    print(f"{OUT.relative_to(FRONT)}: {len(dados['plugins'])} plugins, {len(dados['skills'])} skills")


if __name__ == "__main__":
    main()
