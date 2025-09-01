# [Formatador de textos](https://henriqf.github.io/formatador/):

Uma extensão simples que permite formatar pequenos trechos de texto rapidamente.<br>

Modos de uso:

    inverter            -> inverte o texto...
    binário             -> traduz o texto para binário.
    texto pequeno       -> transforma o texto em superscript.
    morse               -> traduz o texto para morse.
    ponta cabeça        -> faz o texto ficar de ponta cabeça.
    demoniado           -> inefável.
    chave entre letras  -> insere uma chave entre os caracteres.


## Colocar no Chrome:

1. Baixe o arquivo `release.zip` e remova de dentro a pasta `formatador`. Idealmente, armazene essa pasta em um diretório "seguro", como Documentos.
2. Na aba de pesquisas do chrome, digite: `chrome://extentions/`<br>
3. No canto superior direito da página aberta, ative o `Modo do desenvolvedor`<br>
4. No canto superior esquerdo, clique em `Carregar sem compactação` e selecione a pasta "formatador".
5. A extensão será ativada.

## Como usar:

São 3 elementos principais:

    Caixa de input 
    Caixa de chave
    Botão de modo

Ao apertar a tecla ENTER com a `Caixa de input` selecionada, o modo de formatação é aplicado ao texto digitado. (o botão no canto superior direito desta caixa é usado para facilitar copiar o resultado). <br>

Para alterar o modo de formatação, basta clicar no `Botão de modo`.

Quando necessário, o texto placeholder "chave aqui" na `Caixa de chave` será substituído para indicar a chave exigida.

Textos são automaticamente salvos.

## Funcionamento:

    formatador/
    ├── icons/
    │   └── icones.png 
    ├── src/
    │   ├── imagens/
    │   │   └── imagens.png 
    │   ├── mapas/
    │   │   └── mapas.json
    │   ├── formatador.js
    │   ├── popup.html
    │   ├── service-worker.js
    │   └──  styles.css
    └──  manifest.json

`icons` armazena os ícones (`icones.png`) da extensão.<br>
`src` guarda tudo necessário para o funcionamento da extensão. <br>
`imagens` guarda as imagens(`imagens.png`) usadas.<br>
`mapas` armazena arquivos .json com hashes usadas para formatações de substituição.<br>
`formatador.js` é o código que faz a extensão rodar.<br>
`popup.html` é a parte visual da extensão.<br>
`service-worker.js` é usado para salvar o conteúdo da caixa de input.<br>
`styles.css` é utilizado para embelezar a extensão.<br>
`manifest.json` define as configurações da extensão.

