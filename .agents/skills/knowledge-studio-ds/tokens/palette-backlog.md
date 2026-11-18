## 29. BACKLOG DE PALETA E ESCALAS

### 29.1 Por que este arquivo existe

A skill foi extraída de duas telas (Cockpit e Bases), do CSS computado e de um
print do Cockpit no modo Avançado, tema claro. Este arquivo guarda duas
coisas: o que o app faz hoje e reprova (a skill já corrige nas telas que gera,
e o app precisa corrigir na fonte) e o que ainda não foi observado.

**Achados no app, a corrigir na fonte:**

1. **Anel de foco `--ring`** a 50% de alpha: 2.44:1 no claro e 2.84:1 no
   escuro, abaixo de 3:1. Proposta: anel sólido em `--primary` (§20.5).
2. **Destrutivo no escuro**: `--destructive-foreground` sobre `--destructive`
   dá 3.90:1 (4.00:1 até com branco puro). Proposta: escurecer o
   `--destructive` do escuro ou usar texto escuro sobre ele.
3. **`--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-ring`,
   `--gradient-brand` e `--shadow-glow` não são redefinidos no escuro**, e
   herdam o índigo escuro do claro. Um indicador em `--sidebar-primary` some
   na sidebar escura (2.56:1).
4. **Texto de badge no próprio token**: "Ativa"/"Concluído" com 3.98:1 e
   "Revisar" com 3.33:1. Proposta: `--emerald-700` e `--amber-800` (§10.1).
5. **Cinzas da sidebar fora dos tokens**: rótulo de grupo `#777C86` (3.36:1)
   e papel do usuário `#6D717C` (3.91:1). Proposta: `--muted-foreground`
   (4.78:1).
6. **Ponto de severidade e ponto de notificação só por cor** (§20.2).
7. **Formatos**: "há 5mês", "1 publicadas", "US$ 42.18", datas ISO
   ("2026-05-06 22:11"), "1 fonte· 1 erro", "..." no lugar de "…" (§19.3).
8. **Rótulo em inglês**: "Toggle Sidebar" (§19.2).
9. **Confiança em duas escalas**: "81%" num KPI e "0.41" num alerta.

### 29.2 Aberto: confirmação visual

**Confirmado pelo print do Cockpit** (e retirado desta lista): tom de cada
badge de base, processamento e conector; anatomia do badge; tamanhos e pesos
de título, KPI e meta; estado ativo da sidebar e do seletor de modo;
sidebar do modo Avançado; topbar completa; anatomia de alerta, lista em card
e progresso; ícones Lucide; largura do conteúdo e grid.

**Ainda aberto**, pede print:

- **o tema escuro** de qualquer tela — os badges do escuro (§27.2) são
  derivados, e os achados 2 e 3 de §29.1 precisam ser vistos renderizados;
- o estado ativo do filtro segmentado da tela de Bases (§7.6) e os badges
  Publicada, Em revisão, Processando, Rascunho, Avisos e Erro;
- se a cor do ícone do KPI muda com o valor (§9.2);
- as telas não capturadas: Fontes & Conectores, Perfis de Ingestão,
  Pipelines, Chunk Studio, Perfis de Recuperação, Retrieval Lab, Governança,
  Auditoria & Lineage, Publicação, Integração, Configurações, Chat com os
  Dados e Criar base (§12.5, §15);
- a paleta `⌘K` aberta, o menu de workspace aberto e um estado vazio.

### 29.3 Como ratificar um valor

1. Capture o valor no CSS computado ou no print. Num print, amostre o pixel
   e compare com o `tokens.json`: Δ0 é o token; um valor intermediário
   costuma ser token com transparência.
2. Atualize `scripts/tokens.json` (nunca o `tokens.css`).
3. Rode `python3 scripts/gen_tokens_css.py` e `scripts/check_contrast.py` nos
   pares novos.
4. Tire a marca "inferido" ou "não observado" da seção correspondente.
5. Suba a versão e registre no CHANGELOG.

O tema de marketing (§1.2) entra do mesmo jeito, num grupo próprio, quando
houver pedido de tela de marketing.

### 29.4 Aberto: valores não capturados

| Item | Ponto de partida |
|---|---|
| Tamanhos de 13 e 15px | valor arbitrário ou `text-sm`/`text-base`; confirmar no código |
| Scrim de modal e opacidade de desabilitado | padrão do shadcn/ui |
| Camadas de z-index nominais | escala do Tailwind |
| Arquivo vetorial do símbolo | círculo com `--gradient-brand` + `Sparkles` |
| Densidade de tabela | padrão da Table do shadcn |
