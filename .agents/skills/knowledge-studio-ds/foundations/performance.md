## 26. PERFORMANCE

### 26.1 Por que isto é uma restrição de qualidade, não um extra

O Cockpit mostra dados "em tempo real" de muitas fontes. Se uma fonte lenta
trava a tela inteira, o produto falha na promessa de mostrar o estado do
sistema.

### 26.2 Listas e tabelas longas

Listas de documentos e chunks chegam a milhares de itens ("5.670 chunks").
Pagine ou virtualize, e nunca renderize a lista inteira.

### 26.3 Imagens e uploads

Upload grande mostra progresso e pode continuar em segundo plano. O resultado
aparece em "Últimos processamentos".

### 26.4 Entradas de alta frequência (busca, filtro, redimensionamento)

Busca `⌘K` com debounce. O filtro segmentado atualiza a URL sem recarregar a
página.

### 26.5 Percepção de carregamento

Cada bloco do Cockpit carrega de forma independente, com skeleton no formato
final (§10.5).

### 26.6 Rede instável e modo degradado

Se um bloco falha ao carregar, só ele mostra o erro, com "Tentar de novo". O
resto do Cockpit continua utilizável.
