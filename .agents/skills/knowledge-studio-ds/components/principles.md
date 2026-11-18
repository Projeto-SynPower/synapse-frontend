## 6. PRINCÍPIOS DE COMPONENTES E REUTILIZAÇÃO

O app é construído sobre **shadcn/ui + Tailwind v4** (a sidebar é o
componente `Sidebar` do shadcn, e os tokens seguem os papéis do shadcn). A
ordem de decisão ao montar uma tela:

1. **Existe no app?** Use o padrão dos catálogos §7–§13 como está: cabeçalho
   de página, card de KPI, lista de alertas, card de base, badge de status.
2. **Existe no shadcn/ui?** Use o componente do shadcn com os tokens desta
   skill. Dialog, Dropdown, Tooltip e Table estão nesse caso: não foram
   observados no app, mas o app herda o visual deles.
3. **Nenhum dos dois.** Componha a partir dos existentes. Um componente novo
   precisa de justificativa escrita, porque cada variante nova é uma decisão
   que as próximas telas vão ter que repetir.

Cada componente é descrito com o que foi **observado** e o que foi
**inferido**. O que está marcado como inferido é ponto de partida, não
contrato.
