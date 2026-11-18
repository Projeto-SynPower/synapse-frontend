#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
target="${1:-$root/_site}"

rm -rf "$target"
mkdir -p "$target"
cp "$root/index.html" "$target/"
cp -r "$root/assets" "$root/data" "$target/"
touch "$target/.nojekyll"
