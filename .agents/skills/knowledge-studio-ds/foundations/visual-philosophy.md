## 2. FILOSOFIA VISUAL

### 2.1 Princípios

1. **Superfície neutra, ação em índigo.** O usuário passa o dia lendo status
   de dezenas de bases. Fundo calmo mantém o foco no dado; o índigo só aparece
   onde há algo a fazer.
2. **Estado sempre com texto.** Toda cor de status vem com a palavra
   ("Bloqueada", "Erro"). Cor sozinha não conta.
3. **Problema com a ação que o resolve.** Cada alerta traz o botão que
   resolve ("Reautenticar conector"), sem mandar o usuário procurar.
4. **Densidade legível.** Muitos números por tela, organizados em cards
   curtos, com rótulo, valor e contexto, nesta ordem.
5. **Evidência visível.** Números de qualidade, confiança e cobertura aparecem
   ao lado do que medem, porque a proposta do produto é resposta confiável.

### 2.2 Superfícies e camadas (modelo mental)

```
--background   #FFFFFF   a página
 └ --surface-1 / --card   #FFFFFF   card; separado por borda e --shadow-sm
    └ --surface-2         #F5F7F9   faixa interna, hover de linha, cabeçalho de lista
       └ --surface-3      #EDF0F4   trilho de progresso, área afundada
--sidebar      #E1E6F3   chrome de navegação, fora da pilha de conteúdo
```

Card é branco sobre página branca: o que separa é a borda (`--border`) e a
sombra baixa, não uma diferença de fundo. Por isso borda e sombra não são
opcionais em card.

### 2.3 Iluminação e gradiente

A luz é fria e baixa: sombras curtas com tinta grafite (§3.4). O índigo ganha
profundidade só no CTA principal, com o gradiente de 135°. Não existe brilho
colorido, gradiente de fundo ou malha no app shell. Isso é do tema de
marketing (§1.2).
