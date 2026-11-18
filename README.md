# Nossa História

Site de aniversário de namoro feito com React e Vite. A abertura e a galeria anual estão preparadas, com espaços para fotos de 2021 a 2026.

## Executar

1. Instale o Node.js (versão 20.19+ ou 22.12+).
2. No terminal, dentro desta pasta, rode `npm install`.
3. Rode `npm run dev` e abra o endereço mostrado pelo Vite.

Para gerar a versão de publicação, use `npm run build`. O resultado fica na pasta `dist`.

## Publicar na Vercel

1. Importe o repositório GitHub como um novo projeto na Vercel.
2. Use `npm run build` como comando de build e `dist` como diretório de saída.
3. Em **Settings → Environment Variables**, cadastre `SITE_USERNAME` e `SITE_PASSWORD` para Production e Preview.
4. Faça um novo deploy depois de salvar as variáveis. O navegador mostrará o pedido de login antes de abrir o site.

Os valores de login são lidos pelo middleware da Vercel e não ficam embutidos no JavaScript do site. O arquivo `.env.example` mostra os nomes das variáveis sem incluir credenciais.

## Personalizar a tela inicial

Edite `src/data/relacionamento.js` para trocar o nome/apelido, a frase, as cartas e as músicas de cada foto. Os arquivos de música ficam em `public/musica`.

## O que React está fazendo aqui

- Cada função de página ou componente retorna uma parte da interface. `Inicio` é a tela desta etapa.
- O `useState` guarda se o botão já foi clicado e se houve falha ao abrir a música; mudar esse estado atualiza a tela.
- O `onClick` chama `iniciarHistoria` quando a visitante interage com o botão.
- O `BrowserRouter` já envolve o app e o `Routes` configura a rota inicial. As outras páginas serão adicionadas nas próximas etapas.
- O Motion anima a entrada e as interações. A preferência do sistema por movimento reduzido é respeitada.

## Estrutura

- `src/pages/Inicio.jsx`: tela de abertura e interação inicial.
- `src/pages/Historia.jsx`: galeria anual com espaços reservados para fotos.
- `src/data/relacionamento.js`: dados pessoais editáveis, ainda identificados como exemplos.
- `src/App.jsx`: configuração das rotas.
- `src/App.css`: identidade visual e responsividade.
- `src/main.jsx`: ponto de entrada React.
- `public/fotos` e `public/musica`: mídias locais do projeto.
